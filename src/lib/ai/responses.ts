import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText, type ModelMessage } from "ai";

const PRIMARY_MODEL = "gemini-3.8-flash";
const FALLBACK_MODEL = "gemini-3.5-flash-lite";

export function createGeminiCall(
  request: Request,
  messages: ModelMessage[],
  system?: string,
) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey?.trim()) {
    throw new Error("GEMINI_API_KEY is not configured in the Vercel environment.");
  }

  const google = createGoogleGenerativeAI({ apiKey });
  const result = streamText({
    model: google(PRIMARY_MODEL),
    ...(system ? { system } : {}),
    messages,
    abortSignal: request.signal,
    maxRetries: 2,
    onError: ({ error }) => {
      console.error("Gemini stream error", error);
    },
  });

  return {
    result,
    response: () => result.toUIMessageStreamResponse({ sendReasoning: false }),
  };
}
