import { createOpenAI } from "@ai-sdk/openai";
import { streamText, type ModelMessage } from "ai";

export function createResponsesCall(
  request: Request,
  config: { model: string },
  messages: ModelMessage[],
  system?: string,
) {
  // Vercel provides the OIDC credential to serverless functions in a request
  // header at runtime. It is not reliably exposed as process.env.VERCEL_OIDC_TOKEN
  // during function execution, so read the runtime header as the fallback.
  const gatewayToken =
    process.env.AI_GATEWAY_API_KEY ||
    process.env.VERCEL_OIDC_TOKEN ||
    request.headers.get("x-vercel-oidc-token");

  if (!gatewayToken) {
    throw new Error(
      "AI Gateway authentication is not configured. Expected AI_GATEWAY_API_KEY or Vercel OIDC authentication.",
    );
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
