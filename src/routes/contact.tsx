import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Shell } from "@/components/site/Shell";
import { PageHero } from "@/components/site/ui";
import { ContactMethods } from "@/components/site/ContactMethods";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Jacob Growth" },
      { name: "description", content: "Book a free ecommerce growth consultation with Jacob Growth. Reply within one business day with next steps and pricing." },
      { property: "og:title", content: "Contact | Jacob Growth" },
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
        className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-gold/50"
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
        <div className="container-lg flex flex-col gap-10 lg:flex-row">
          <div className="min-w-0 flex-1">
            <ContactMethods includeDetails />
          </div>

          <form
            className="h-fit min-w-0 flex-1 rounded-3xl border border-border bg-surface p-6 md:p-8"
            onSubmit={(e) => { e.preventDefault(); alert("Thanks, I'll be in touch shortly."); }}
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
                className="w-full resize-none rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-gold/50"
                placeholder="Tell me about your brand, goals and current challenges…" />
            </div>
            <Button type="submit" size="lg" className="mt-6 h-auto w-full rounded-full bg-primary px-6 py-3.5 text-primary-foreground">
              Send message <ArrowRight className="h-4 w-4" />
            </Button>
            <p className="mt-3 text-center text-[11px] text-muted-foreground">
              Your details stay private. No sales spam, ever.
            </p>
          </form>
        </div>
      </section>
    </Shell>
  );
}
