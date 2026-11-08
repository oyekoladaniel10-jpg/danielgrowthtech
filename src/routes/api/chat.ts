import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, type UIMessage } from "ai";

import { SITE_KNOWLEDGE_PROMPT } from "@/lib/ai/site-knowledge";
import { createGeminiCall } from "@/lib/ai/responses";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let messages: UIMessage[];
        try {
          const body = (await request.json()) as { messages?: UIMessage[] };
          if (!Array.isArray(body.messages)) throw new Error("invalid");
          messages = body.messages;
        } catch {
          return Response.json({ error: "Invalid request." }, { status: 400 });
        }

        try {
          const modelMessages = await convertToModelMessages(messages);
          const call = createGeminiCall(request, modelMessages, SITE_KNOWLEDGE_PROMPT);
          return call.response();
        } catch (error) {
          console.error("Rex Gemini request failed", error);
          return Response.json(
            { error: "Rex is temporarily unavailable. Please use the Contact or WhatsApp options instead." },
            { status: 503 },
          );
        }
      },
    },
  },
});
