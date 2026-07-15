import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { BRAND, NAV } from "@/lib/site-content";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
      <div className="container-lg">
        <div className={`glass-strong flex items-center justify-between gap-3 rounded-full px-4 py-2.5 md:px-6 ${scrolled ? "shadow-2xl" : ""}`}>
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-emerald-brand to-gold text-primary-foreground font-display text-lg">
              Σ
            </div>
            <span className="hidden truncate text-sm font-medium tracking-wide sm:inline">
              {BRAND.name}
            </span>
          </Link>
          <nav className="hidden items-center gap-1 xl:flex">
            {NAV.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
                activeProps={{ className: "rounded-full px-3 py-1.5 text-sm text-foreground bg-white/5" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <Link to="/contact" className="btn-primary hidden text-sm md:inline-flex">
              Book a call <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 xl:hidden"
            >
              <div className="flex flex-col gap-1">
                <span className={`h-px w-4 bg-foreground transition ${open ? "translate-y-1 rotate-45" : ""}`} />
                <span className={`h-px w-4 bg-foreground transition ${open ? "-rotate-45" : ""}`} />
              </div>
            </button>
          </div>
        </div>
        {open && (
          <div className="glass-strong mt-2 rounded-3xl p-4 xl:hidden">
            <div className="grid grid-cols-2 gap-1">
              {NAV.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-3 w-full">
              Book a call <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
