import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { BRAND, WHATSAPP_URL } from "@/lib/site-content";

type ContactMethodsProps = {
  includeDetails?: boolean;
};

const methodClass =
  "flex min-h-20 min-w-0 flex-1 basis-full items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-4 text-sm sm:basis-64";

export function ContactMethods({ includeDetails = false }: ContactMethodsProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <a href={`mailto:${BRAND.email}`} className={methodClass}>
        <Mail className="h-5 w-5 shrink-0 text-gold" aria-hidden />
        <span className="min-w-0">
          <span className="block text-[10px] tracking-widest text-muted-foreground uppercase">Email</span>
          <span className="block truncate">{BRAND.email}</span>
        </span>
      </a>

      <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className={methodClass}>
        <Phone className="h-5 w-5 shrink-0 text-gold" aria-hidden />
        <span className="min-w-0">
          <span className="block text-[10px] tracking-widest text-muted-foreground uppercase">Phone</span>
          <span className="block truncate">{BRAND.phone}</span>
        </span>
      </a>

      <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className={methodClass}>
        <MessageCircle className="h-5 w-5 shrink-0 text-gold" aria-hidden />
        <span className="min-w-0">
          <span className="block text-[10px] tracking-widest text-muted-foreground uppercase">WhatsApp</span>
          <span className="block truncate">{BRAND.whatsapp}</span>
        </span>
      </a>

      {includeDetails && (
        <div className={methodClass}>
          <MapPin className="h-5 w-5 shrink-0 text-gold" aria-hidden />
          <span className="min-w-0">
            <span className="block text-[10px] tracking-widest text-muted-foreground uppercase">Based in</span>
            <span className="block truncate">{BRAND.basedIn.flag} {BRAND.basedIn.country}</span>
          </span>
        </div>
      )}
    </div>
  );
}