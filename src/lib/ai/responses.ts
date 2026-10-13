import { streamText, type ModelMessage } from "ai";

export function createResponsesCall(
  request: Request,
  config: { model: string },
  messages: ModelMessage[],
  system?: string,
) {
  const result = streamText({
    model: config.model,
    ...(system ? { system } : {}),
    messages,
    abortSignal: request.signal,
    providerOptions: {
      openai: { reasoningEffort: "low" },
    },
  });
  return {
    result,
    response: () => result.toUIMessageStreamResponse({ sendReasoning: false }),
  };
}
