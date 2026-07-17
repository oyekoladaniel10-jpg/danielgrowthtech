import { Link } from "@tanstack/react-router";
import { BRAND, NAV, SERVICES } from "@/lib/site-content";
import { FiverrIcon, UpworkIcon } from "./social-icons";

export function Footer() {
  return (
    <footer className="border-t border-white/10 pt-16 pb-10">
      <div className="container-lg grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <img
              src={BRAND.logo}
              alt={`${BRAND.name} logo`}
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover ring-1 ring-white/10"
            />
            <span className="font-medium">{BRAND.name}</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            We engineer eCommerce growth through proven strategies and data-driven solutions. Scale your business with our global team of experts.
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href={BRAND.socials.fiverr}
              target="_blank"
              rel="noreferrer"
              aria-label="Fiverr profile"
              className="glass grid h-10 w-10 place-items-center rounded-full transition hover:border-gold/40 hover:text-gold"
            >
              <FiverrIcon className="h-4 w-4" />
            </a>
            <a
              href={BRAND.socials.upwork}
              target="_blank"
              rel="noreferrer"
              aria-label="Upwork profile"
              className="glass grid h-10 w-10 place-items-center rounded-full transition hover:border-gold/40 hover:text-gold"
            >
              <UpworkIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <div className="text-xs tracking-widest text-gold uppercase">Quick links</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {NAV.map((l) => (
              <li key={l.to}><Link to={l.to} className="hover:text-foreground">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs tracking-widest text-gold uppercase">Services</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.title}><Link to="/services" className="hover:text-foreground">{s.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs tracking-widest text-gold uppercase">Contact</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href={`mailto:${BRAND.email}`} className="hover:text-foreground">{BRAND.email}</a></li>
            <li><a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="hover:text-foreground">{BRAND.phone}</a></li>
          </ul>
        </div>
      </div>
      <div className="container-lg mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
        <div>{BRAND.copyright}</div>
        <div className="flex gap-5">
          <a href="#" className="hover:text-foreground">Privacy Policy</a>
          <a href="#" className="hover:text-foreground">Terms &amp; Conditions</a>
        </div>
      </div>
    </footer>
  );
}
