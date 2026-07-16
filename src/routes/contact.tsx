import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Shell } from "@/components/site/Shell";
import { PageHero } from "@/components/site/ui";
import { BRAND } from "@/lib/site-content";
import { FiverrIcon, UpworkIcon } from "@/components/site/social-icons";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Jacob Growth" },
      { name: "description", content: "Book a free ecommerce growth consultation with Jacob Growth. Reply within one business day with next steps and pricing." },
      { property: "og:title", content: "Contact — Jacob Growth" },
      { property: "og:description", content: "Book a free ecommerce growth consultation." },
    ],
  }),
  component: ContactPage,
});

function Field({ label, name, type = "text", required, placeholder }: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs tracking-widest text-muted-foreground uppercase">{label}</label>
      <input
        name={name} type={type} required={required} placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition focus:border-gold/50"
      />
    </div>
  );
}

function ContactPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="Contact"
        title={<>Let's build your <span className="gradient-text">next growth chapter.</span></>}
        sub="Share a few details and I'll come back within one business day with next steps, a free audit outline and pricing indication."
      />
      <section className="pb-24">
        <div className="container-lg grid gap-10 lg:grid-cols-2">
          <div className="space-y-4 text-sm">
            <a href={`mailto:${BRAND.email}`} className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
              <Mail className="h-4 w-4 shrink-0 text-gold" /> <span className="truncate">{BRAND.email}</span>
            </a>
            <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
              <Phone className="h-4 w-4 shrink-0 text-gold" /> {BRAND.phone}
            </a>
            <a href={`https://wa.me/${BRAND.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
              <MessageCircle className="h-4 w-4 shrink-0 text-gold" /> WhatsApp {BRAND.whatsapp}
            </a>
            <div className="glass rounded-2xl px-4 py-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 text-gold" /> Global offices
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {BRAND.offices.map((o) => (
                  <span key={o} className="rounded-full border border-white/10 px-3 py-1 text-xs">{o}</span>
                ))}
              </div>
            </div>

            <div className="card-lux">
              <div className="text-xs tracking-widest text-gold uppercase">Work With Me</div>
              <p className="mt-2 text-sm text-muted-foreground">
                Prefer to hire through a marketplace? Find my verified profiles below.
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <a
                  href={BRAND.socials.fiverr}
                  target="_blank"
                  rel="noreferrer"
                  className="glass flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:border-gold/40 hover:text-gold"
                >
                  <FiverrIcon className="h-5 w-5 shrink-0 text-gold" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium">Fiverr</div>
                    <div className="truncate text-xs text-muted-foreground">Hire me on Fiverr</div>
                  </div>
                </a>
                <a
                  href={BRAND.socials.upwork}
                  target="_blank"
                  rel="noreferrer"
                  className="glass flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:border-gold/40 hover:text-gold"
                >
                  <UpworkIcon className="h-5 w-5 shrink-0 text-gold" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium">Upwork</div>
                    <div className="truncate text-xs text-muted-foreground">Hire me on Upwork</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <form
            className="glass-strong h-fit rounded-3xl p-6 md:p-8"
            onSubmit={(e) => { e.preventDefault(); alert("Thanks — I'll be in touch shortly."); }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" name="name" required />
              <Field label="Work email" name="email" type="email" required />
              <Field label="Brand / website" name="brand" />
              <Field label="Monthly revenue" name="rev" placeholder="$50k – $500k" />
            </div>
            <div className="mt-4">
              <label className="mb-1.5 block text-xs tracking-widest text-muted-foreground uppercase">How can I help?</label>
              <textarea name="msg" rows={5}
                className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition focus:border-gold/50"
                placeholder="Tell me about your brand, goals and current challenges…" />
            </div>
            <button type="submit" className="btn-primary mt-6 w-full">
              Send message <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-3 text-center text-[11px] text-muted-foreground">
              Your details stay private. No sales spam, ever.
            </p>
          </form>
        </div>
      </section>
    </Shell>
  );
}
