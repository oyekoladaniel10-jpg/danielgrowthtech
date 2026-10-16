import { createOpenAI } from "@ai-sdk/openai";
import { streamText, type ModelMessage } from "ai";

export function createResponsesCall(
  request: Request,
  config: { model: string },
  messages: ModelMessage[],
  system?: string,
) {
  const gatewayToken = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

  if (!gatewayToken) {
    throw new Error("AI Gateway authentication is not configured. Expected AI_GATEWAY_API_KEY or VERCEL_OIDC_TOKEN.");
  }

  const gateway = createOpenAI({
    apiKey: gatewayToken,
    baseURL: "https://ai-gateway.vercel.sh/v1",
  });

  const result = streamText({
    model: gateway(config.model),
    ...(system ? { system } : {}),
    messages,
    abortSignal: request.signal,
    onError: ({ error }) => {
      console.error("AI Gateway stream error", error);
    },
  });

  return {
    result,
    response: () => result.toUIMessageStreamResponse({ sendReasoning: false }),
  };
}
