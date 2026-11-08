import { createGoogleGenerativeAI } from "@ai-sdk/google";
import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
  type ModelMessage,
} from "ai";

const MODEL_FALLBACK_CHAIN = [
  "gemini-3.5-flash-lite",
  "gemini-3.8-flash",
  "gemini-2.5-flash",
] as const;

const FIRST_RESPONSE_TIMEOUT_MS = 10_000;

export function generateStreamingResponse(
  messages: ModelMessage[],
  system: string,
  request: Request,
): Response {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey?.trim()) {
    throw new Error("GEMINI_API_KEY is not configured in the Vercel environment.");
  }

  const google = createGoogleGenerativeAI({ apiKey });

  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      const textId = crypto.randomUUID();
      let lastError: unknown;

      for (const modelName of MODEL_FALLBACK_CHAIN) {
        if (request.signal.aborted) {
          throw request.signal.reason ?? new Error("The request was cancelled.");
        }

        const attemptController = new AbortController();
        const abortAttempt = () => attemptController.abort(request.signal.reason);
        request.signal.addEventListener("abort", abortAttempt, { once: true });

        const result = streamText({
          model: google(modelName),
          messages,
          system,
          abortSignal: attemptController.signal,
          // The model chain handles failover; do not spend extra time retrying
          // the same unavailable model before moving to the next one.
          maxRetries: 0,
          onError: ({ error }) => {
            lastError = error;
            console.error(`Rex Gemini stream error (${modelName})`, error);
          },
        });

        const reader = result.textStream.getReader();
        let timeoutId: ReturnType<typeof setTimeout> | undefined;
        let firstChunk: ReadableStreamReadResult<string>;

        try {
          firstChunk = await Promise.race([
            reader.read(),
            new Promise<never>((_, reject) => {
              timeoutId = setTimeout(() => {
                const timeoutError = new Error(
                  `Gemini model ${modelName} did not start responding within ${FIRST_RESPONSE_TIMEOUT_MS}ms.`,
                );
                attemptController.abort(timeoutError);
                reject(timeoutError);
              }, FIRST_RESPONSE_TIMEOUT_MS);
            }),
          ]);
        } catch (error) {
          lastError = error;
          console.warn(`Rex model ${modelName} failed before its first response; trying the next model.`, error);
          await reader.cancel(error).catch(() => undefined);
          if (request.signal.aborted) {
            throw request.signal.reason ?? error;
          }
          continue;
        } finally {
          if (timeoutId) clearTimeout(timeoutId);
          request.signal.removeEventListener("abort", abortAttempt);
        }

        if (firstChunk.done || !firstChunk.value) {
          lastError = new Error(`Gemini model ${modelName} ended without producing a response.`);
          console.warn(lastError);
          await reader.cancel(lastError).catch(() => undefined);
          continue;
        }

        // Do not send any assistant text until a model has produced its first
        // chunk. This makes pre-response failover safe for the chat UI.
        writer.write({ type: "text-start", id: textId });
        writer.write({ type: "text-delta", id: textId, delta: firstChunk.value });

        try {
          while (true) {
            const chunk = await reader.read();
            if (chunk.done) break;
            if (chunk.value) {
              writer.write({ type: "text-delta", id: textId, delta: chunk.value });
            }
          }
        } catch (error) {
          // Once text has reached the visitor, switching models would append
          // a second answer to a partial first answer. Report the interruption
          // instead of silently mixing two model responses.
          console.error(`Rex response stream interrupted (${modelName})`, error);
          writer.write({
            type: "text-delta",
            id: textId,
            delta: "\n\nI’m sorry, the response was interrupted. Please try sending your message again.",
          });
        } finally {
          writer.write({ type: "text-end", id: textId });
          reader.releaseLock();
        }

        return;
      }

      console.error("All Rex Gemini models failed.", lastError);
      writer.write({ type: "text-start", id: textId });
      writer.write({
        type: "text-delta",
        id: textId,
        delta:
          "I’m sorry, I’m having trouble connecting right now. Please try again shortly, or contact Daniel through the Contact or WhatsApp options.",
      });
      writer.write({ type: "text-end", id: textId });
    },
  });

  return createUIMessageStreamResponse({ stream });
}
