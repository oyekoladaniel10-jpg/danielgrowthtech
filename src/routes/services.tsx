import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Shell } from "@/components/site/Shell";
import { PageHero, Reveal } from "@/components/site/ui";
import { CtaBanner } from "@/components/site/CtaBanner";
import { SERVICES, WHATSAPP_URL } from "@/lib/site-content";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Jacob Growth" },
      { name: "description", content: "Sixteen specialised ecommerce growth services — CRO, SEO, AI Search, paid media, email, marketplaces and analytics." },
      { property: "og:title", content: "Services — Jacob Growth" },
      { property: "og:description", content: "A full growth stack orchestrated as one performance system." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="Services · 16 practices"
        title={<>A full growth stack <span className="gradient-text">under one roof.</span></>}
        sub="Sixteen specialised practices, orchestrated as one performance system across every channel that matters."
      />
      <section className="pb-24">
        <div className="container-lg">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 30}>
                <article className="card-lux group flex h-full flex-col overflow-hidden !p-0">
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={s.img}
                      alt={s.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                    <span className="absolute top-3 left-3 rounded-full border border-white/15 bg-background/60 px-2.5 py-1 text-[10px] tracking-widest text-gold uppercase backdrop-blur">
                      {s.tag}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl md:text-2xl">{s.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
                    <ul className="mt-5 space-y-1.5 text-sm">
                      {["Overview", "Benefits", "Deliverables", "Expected outcomes"].map((li) => (
                        <li key={li} className="flex items-center gap-2 text-muted-foreground">
                          <Check className="h-3.5 w-3.5 text-emerald-brand" /> {li}
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact" className="mt-6 inline-flex items-center gap-1 text-sm text-gold hover:underline">
                      Discuss this service <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner
        title={<>Not sure where to <span className="gradient-text">start?</span></>}
        sub="Book a free 30-minute call and we'll map the highest-leverage moves for your store."
      />
    </Shell>
  );
}
