import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { WHATSAPP_URL } from "@/lib/site-content";
import { AssistantChat } from "./AssistantChat";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell dark min-h-screen bg-background text-foreground">
      <Nav />
      <main>{children}</main>
      <Footer />
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="whatsapp-link fixed bottom-5 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg ring-1 ring-white/20 transition-colors hover:bg-[#20bd5a] md:bottom-6 md:right-6 md:h-16 md:w-16"
      >
        <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden className="h-7 w-7 md:h-8 md:w-8">
          <path d="M19.11 17.28c-.29-.15-1.7-.84-1.97-.93-.26-.1-.46-.15-.65.15s-.74.93-.91 1.12c-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.77-1.44-1.71-1.6-2-.17-.29-.02-.45.13-.6.14-.14.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.65-1.57-.9-2.15-.24-.57-.48-.49-.65-.5-.17 0-.36-.01-.55-.01-.19 0-.51.07-.77.36-.26.29-1 .98-1 2.39s1.03 2.77 1.17 2.96c.15.19 2.02 3.08 4.89 4.32.68.29 1.21.47 1.63.6.68.22 1.3.19 1.79.12.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34zm-5.16 7.03h-.01a10.63 10.63 0 0 1-5.4-1.48l-.39-.23-4.03 1.06 1.07-3.92-.25-.4a10.55 10.55 0 0 1-1.62-5.65C3.32 8.47 8.08 3.72 13.96 3.72c2.85 0 5.52 1.11 7.53 3.12a10.58 10.58 0 0 1 3.11 7.51c0 5.87-4.76 10.63-10.65 10.63zm9.05-19.68A12.6 12.6 0 0 0 13.96 1c-6.98 0-12.66 5.68-12.67 12.66 0 2.23.58 4.4 1.69 6.32L1.18 27l7.16-1.88a12.65 12.65 0 0 0 6.05 1.54h.01c6.98 0 12.67-5.68 12.67-12.66 0-3.38-1.32-6.56-3.71-8.95z"/>
        </svg>
      </a>
    </div>
  );
}
