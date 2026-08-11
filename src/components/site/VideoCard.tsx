import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";

export type VideoRef = {
  src: string;
  name: string;
  country: string;
  flag: string;
  industry: string;
  service: string;
};

export function VideoCard({ data, onOpen }: { data: VideoRef; onOpen: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <article
      ref={containerRef}
      className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.02] shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] transition duration-500 hover:-translate-y-1 hover:border-emerald-brand/40"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Play video from ${data.name}`}
        className="relative block w-full overflow-hidden"
        style={{ aspectRatio: "16 / 9" }}
      >
        {inView ? (
          <video
            src={data.src}
            preload="none"
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-surface-2 to-surface" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:bg-black/5" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-white/95 shadow-2xl transition duration-500 group-hover:scale-110 group-hover:bg-white md:h-20 md:w-20">
            <Play className="ml-1 h-6 w-6 fill-background text-background md:h-8 md:w-8" />
          </div>
        </div>
      </button>

      <div className="flex flex-1 flex-col gap-1.5 p-6 md:p-7">
        <div className="text-xs uppercase tracking-[0.18em] text-emerald-brand">{data.industry}</div>
        <h3 className="text-2xl leading-tight">{data.name}</h3>
        <div className="text-sm text-muted-foreground"><span className="mr-1">{data.flag}</span>{data.country}</div>
        <div className="mt-3 border-t border-white/5 pt-3 text-sm text-foreground/80">
          <span className="text-muted-foreground">Project: </span>{data.service}
        </div>
      </div>
    </article>
  );
}

export function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl"
        style={{ aspectRatio: "16 / 9" }}
        onClick={(e) => e.stopPropagation()}
      >
        <video src={src} controls autoPlay playsInline className="h-full w-full object-contain" />
      </div>
    </div>
  );
}
