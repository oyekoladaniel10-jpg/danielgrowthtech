import { Link } from "@tanstack/react-router";
import { BRAND, NAV, SERVICES } from "@/lib/site-content";

export function Footer() {
  return (
    <footer className="border-t border-white/10 pt-16 pb-10">
      <div className="container-lg grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-emerald-brand to-gold text-primary-foreground font-display text-lg">Σ</div>
            <span className="font-medium">{BRAND.name}</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Ecommerce growth partner for ambitious DTC, marketplace and B2B brands.
          </p>
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
            <li>{BRAND.email}</li>
            <li>{BRAND.phone}</li>
            <li>{BRAND.website}</li>
          </ul>
        </div>
      </div>
      <div className="container-lg mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
        <div>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</div>
        <div className="flex gap-5">
          <a href="#" className="hover:text-foreground">Privacy Policy</a>
          <a href="#" className="hover:text-foreground">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}
