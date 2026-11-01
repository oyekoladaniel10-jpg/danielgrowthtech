import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Star, Upload, Check, Copy, Globe, X } from "lucide-react";
import { Shell } from "@/components/site/Shell";
import { PageHero } from "@/components/site/ui";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/review")({
  head: () => ({
    meta: [
      { title: "Leave a Review | Danielgrowth" },
      { name: "description", content: "Worked with Danielgrowth? Share your rating, feedback and website in under a minute." },
      { property: "og:title", content: "Leave a Review | Danielgrowth" },
      { property: "og:description", content: "Share your experience working with Danielgrowth — star rating, comment and your store link." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ReviewPage,
});

const SERVICES = ["SEO & CRO", "Shopify Optimisation", "Store Audit", "Paid Ads", "Store Design", "Other"];
const LABELS = ["", "Poor", "Fair", "Good", "Great results", "Exceptional"];

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  brand: z.string().trim().max(120).optional(),
  website: z
    .string()
    .trim()
    .max(255)
    .optional()
    .refine((v) => !v || /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#].*)?$/i.test(v), "Please enter a valid website"),
  service: z.string().max(60).optional(),
  rating: z.number().int().min(1, "Please choose a star rating").max(5),
  comment: z.string().trim().min(10, "Please write at least 10 characters").max(2000),
});

type Approved = { id: string; name: string; brand: string | null; website: string | null; service: string | null; rating: number; comment: string; photo_url: string | null; created_at: string };

function siteHref(w: string) {
  return /^https?:\/\//i.test(w) ? w : `https://${w}`;
}

function ReviewPage() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [form, setForm] = useState({ name: "", brand: "", website: "", service: "", comment: "" });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const [reviews, setReviews] = useState<Approved[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false }).limit(30);
      if (!data) return;
      const withPhotos = await Promise.all(
        data.map(async (r) => {
          if (!r.photo_url) return r;
          const { data: s } = await supabase.storage.from("review-photos").createSignedUrl(r.photo_url, 3600);
          return { ...r, photo_url: s?.signedUrl ?? null };
        }),
      );
      setReviews(withPhotos as Approved[]);
    })();
  }, []);

  function pickFile(f: File | null) {
    setError(null);
    if (!f) return;
    if (!f.type.startsWith("image/")) return setError("Please choose an image file");
    if (f.size > 5 * 1024 * 1024) return setError("Photo must be under 5 MB");
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function copyLink() {
    await navigator.clipboard.writeText(`${window.location.origin}/review`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse({
      ...form,
      brand: form.brand || undefined,
      website: form.website || undefined,
      service: form.service || undefined,
      rating,
    });
    if (!parsed.success) return setError(parsed.error.issues[0].message);
    setBusy(true);
    try {
      let photo_url: string | null = null;
      if (file) {
        const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage.from("review-photos").upload(path, file, { contentType: file.type });
        if (upErr) throw new Error("Photo upload failed — try a JPG or PNG");
        photo_url = path;
      }
      const d = parsed.data;
      const { error: insErr } = await supabase.from("reviews").insert({
        name: d.name, brand: d.brand ?? null, website: d.website ?? null, service: d.service ?? null,
        rating: d.rating, comment: d.comment, photo_url,
      });
      if (insErr) throw new Error("Could not send your review, please try again");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  const input = "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none";
  const shown = hover || rating;

  return (
    <Shell>
      <PageHero
        eyebrow="Client Feedback"
        title={<>Share your <span className="gradient-text">experience</span></>}
        sub="Your honest review helps other store owners decide. It takes less than a minute."
      />
      <section className="pb-24">
        <div className="container-lg max-w-2xl">
          <div className="mb-6 flex justify-center">
            <button type="button" onClick={copyLink} className="btn-ghost text-sm">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Link copied" : "Copy review link"}
            </button>
          </div>

          {done ? (
            <div className="card-lux text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary"><Check className="h-7 w-7" /></div>
              <h2 className="mt-4 text-2xl">Thank you, {form.name.split(" ")[0]}!</h2>
              <p className="mt-2 text-sm text-muted-foreground">Your review has been received and will appear on the site once it's checked.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="card-lux space-y-6" noValidate>
              <div>
                <label className="mb-2 block text-sm font-medium">Your rating *</label>
                <div className="flex items-center gap-1" onMouseLeave={() => setHover(0)}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} type="button" aria-label={`${n} star${n > 1 ? "s" : ""}`} onClick={() => setRating(n)} onMouseEnter={() => setHover(n)} className="p-1">
                      <Star className={`h-8 w-8 transition ${n <= shown ? "fill-gold text-gold" : "text-muted-foreground"}`} />
                    </button>
                  ))}
                  <span className="ml-3 text-sm text-gold">{LABELS[shown]}</span>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Your photo or logo (optional)</label>
                <div className="flex items-center gap-4">
                  {preview ? (
                    <div className="relative">
                      <img src={preview} alt="Preview" className="h-16 w-16 rounded-full object-cover" />
                      <button type="button" aria-label="Remove photo" onClick={() => { setFile(null); setPreview(null); }} className="absolute -top-1 -right-1 rounded-full bg-background p-0.5 border border-border"><X className="h-3 w-3" /></button>
                    </div>
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-border text-muted-foreground"><Upload className="h-5 w-5" /></div>
                  )}
                  <label className="btn-ghost cursor-pointer text-sm">
                    Choose photo
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => pickFile(e.target.files?.[0] ?? null)} />
                  </label>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <input className={input} placeholder="Your name *" maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input className={input} placeholder="Store / brand name" maxLength={120} value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
              </div>
              <input className={input} placeholder="Your website (e.g. mystore.com)" maxLength={255} inputMode="url" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />

              <div>
                <label className="mb-2 block text-sm font-medium">Service received</label>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map((s) => (
                    <button key={s} type="button" onClick={() => setForm({ ...form, service: form.service === s ? "" : s })}
                      className={`rounded-full border px-3 py-1.5 text-xs transition ${form.service === s ? "border-primary bg-primary/15 text-foreground" : "border-border text-muted-foreground"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <textarea className={`${input} min-h-32`} placeholder="Tell us about your experience and results *" maxLength={2000} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} />

              {error && <p className="text-sm text-destructive">{error}</p>}
              <button type="submit" disabled={busy} className="btn-primary w-full justify-center disabled:opacity-60">
                {busy ? "Sending…" : "Submit review"}
              </button>
            </form>
          )}

          {reviews.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-6 text-2xl">What clients say</h2>
              <div className="space-y-4">
                {reviews.map((r) => (
                  <article key={r.id} className="card-lux">
                    <div className="flex items-center gap-3">
                      {r.photo_url ? <img src={r.photo_url} alt={r.name} loading="lazy" className="h-11 w-11 rounded-full object-cover" /> : <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-primary">{r.name[0]}</div>}
                      <div className="min-w-0">
                        <p className="font-medium">{r.name}{r.brand ? ` · ${r.brand}` : ""}</p>
                        <div className="flex">{[1, 2, 3, 4, 5].map((n) => <Star key={n} className={`h-3.5 w-3.5 ${n <= r.rating ? "fill-gold text-gold" : "text-muted-foreground"}`} />)}</div>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{r.comment}</p>
                    {r.website && (
                      <a href={siteHref(r.website)} target="_blank" rel="noopener noreferrer nofollow" className="mt-3 inline-flex items-center gap-1 text-xs text-gold">
                        <Globe className="h-3.5 w-3.5" /> {r.website}
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Shell>
  );
}
