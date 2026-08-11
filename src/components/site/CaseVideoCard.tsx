import { Play, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function CaseVideoCard({
  poster,
  website,
  industry,
  slug,
  onPlay,
}: {
  poster: string;
  website: string;
  industry: string;
  slug: string;
  onPlay: () => void;
}) {
  return (
    <article className="group card-lux flex h-full flex-col overflow-hidden p-0 transition duration-500 hover:-translate-y-1">
      <button
        type="button"
        onClick={onPlay}
        aria-label={`Play ${website} case study video`}
        className="relative block aspect-video w-full overflow-hidden bg-surface-2"
      >
        <img
          src={poster}
          alt={`${website} case study video thumbnail`}
          width={640}
          height={360}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:bg-black/5" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-white/95 shadow-2xl transition duration-500 group-hover:scale-110 md:h-20 md:w-20">
            <Play className="ml-1 h-6 w-6 fill-background text-background md:h-8 md:w-8" />
          </div>
        </div>
      </button>

      <div className="flex flex-1 flex-col gap-2 p-6 md:p-7">
        <span className="inline-flex w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] tracking-widest text-gold uppercase">
          {industry}
        </span>
        <h3 className="mt-2 text-xl md:text-2xl">{website}</h3>
        <div className="mt-auto pt-5">
          <Link
            to="/case-studies/$slug"
            params={{ slug }}
            className="btn-ghost w-full justify-center transition group-hover:border-gold/50 group-hover:text-gold"
          >
            View Case Study <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
