import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Headphones, Loader2, Send, X } from "lucide-react";
import ReactMarkdown from "react-markdown";

import { BRAND, WHATSAPP_URL } from "@/lib/site-content";

const SUGGESTIONS = [
  "What services do you offer?",
  "Which package is right for my store?",
  "Show me your latest case studies",
  "Can I get a free website audit?",
];

export function AssistantChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  const submit = (text: string) => {
    const value = text.trim();
    if (!value || busy) return;
    setInput("");
    sendMessage({ text: value });
  };

  return (
    <>
      {open && (
        <div
          className="fixed bottom-24 left-4 z-[60] flex h-[min(560px,70dvh)] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl md:bottom-28 md:left-6"
          role="dialog"
          aria-label="Danielgrowth AI assistant"
        >
          <div className="flex items-center gap-3 border-b border-border bg-surface px-4 py-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
              <Headphones className="h-4 w-4" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">Danielgrowth Assistant</p>
              <p className="text-xs text-muted-foreground">Ask about any part of the website</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
            <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-background px-3.5 py-2.5 text-sm">
              Hi! I'm the Danielgrowth AI assistant. I know the services, pricing, process, case studies, sales proof, audit and contact options on this website. Ask me anything, and I'll point you to the right place when needed.
            </div>

            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => submit(s)}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-gold hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m) => {
              const text = m.parts
                .filter((p) => p.type === "text")
                .map((p) => p.text)
                .join("");
              if (!text) return null;
              return m.role === "user" ? (
                <div key={m.id} className="ml-auto max-w-[90%] rounded-2xl rounded-tr-sm bg-gold px-3.5 py-2.5 text-sm text-background">
                  {text}
                </div>
              ) : (
                <div
                  key={m.id}
                  className="prose prose-sm prose-invert max-w-[90%] rounded-2xl rounded-tl-sm bg-background px-3.5 py-2.5 text-sm [&_a]:text-gold [&_a]:underline [&_p]:my-1 [&_ul]:my-1"
                >
                  <ReactMarkdown>{text}</ReactMarkdown>
                </div>
              );
            })}

            {busy && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden /> Typing…
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-border bg-background p-3 text-xs">
                <p className="text-muted-foreground">The AI assistant is temporarily unavailable.</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <a href="/contact" className="text-gold underline">Contact Daniel</a>
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="text-gold underline">WhatsApp</a>
                  <a href={`mailto:${BRAND.email}`} className="text-gold underline">Email</a>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-border px-3 py-2">
            <div className="mb-2 flex gap-2 text-[11px] text-muted-foreground">
              <a href="/services" className="hover:text-gold">Services</a>
              <span aria-hidden>·</span>
              <a href="/case-studies" className="hover:text-gold">Case studies</a>
              <span aria-hidden>·</span>
              <a href="/audit" className="hover:text-gold">Free audit</a>
              <span aria-hidden>·</span>
              <a href="/contact" className="hover:text-gold">Contact</a>
            </div>
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                submit(input);
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about Danielgrowth…"
                aria-label="Ask anything about Danielgrowth"
                className="min-w-0 flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-gold"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send message"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold text-background transition-opacity disabled:opacity-40"
              >
                <Send className="h-4 w-4" aria-hidden />
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Danielgrowth AI assistant" : "Open Danielgrowth AI assistant"}
        className="fixed bottom-5 left-4 z-[60] grid h-14 w-14 place-items-center rounded-full bg-gold text-background shadow-lg ring-1 ring-white/20 transition-transform hover:scale-105 md:bottom-6 md:left-6 md:h-16 md:w-16"
      >
        {open ? <X className="h-6 w-6" aria-hidden /> : <Headphones className="h-6 w-6 md:h-7 md:w-7" aria-hidden />}
      </button>
    </>
  );
}
