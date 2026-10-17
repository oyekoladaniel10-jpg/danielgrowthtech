import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Shell } from "@/components/site/Shell";
import { PageHero } from "@/components/site/ui";
import { ContactMethods } from "@/components/site/ContactMethods";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/site-content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Danielgrowth" },
      { name: "description", content: "Book a free ecommerce growth consultation with Danielgrowth. Reply within one business day with next steps and pricing." },
      { property: "og:title", content: "Contact | Danielgrowth" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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

type Status = "idle" | "sending" | "sent" | "error";

function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${BRAND.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New enquiry from ${data.name || "your website"}`,
          _template: "table",
          _captcha: "false",
          name: data.name,
          email: data.email,
          brand: data.brand,
          monthly_revenue: data.rev,
          message: data.msg,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

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
            onSubmit={handleSubmit}
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
            <Button type="submit" size="lg" disabled={status === "sending"}
              className="mt-6 h-auto w-full rounded-full bg-primary px-6 py-3.5 text-primary-foreground">
              {status === "sending" ? "Sending…" : "Send message"} <ArrowRight className="h-4 w-4" />
            </Button>
            {status === "sent" && (
              <p role="status" className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" /> Message sent — I'll reply within one business day.
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-red-400">
                <AlertCircle className="h-3.5 w-3.5" /> Something went wrong — please email me directly or try again.
              </p>
            )}
            <p className="mt-3 text-center text-[11px] text-muted-foreground">
              Your details stay private. No sales spam, ever.
            </p>
          </form>
        </div>
      </section>
    </Shell>
  );
}
