import { z } from "zod";

export const auditRequestSchema = z.object({
  url: z.string().trim().min(1).max(2048),
  websiteTrap: z.string().max(0).optional(),
});

export const auditFindingSchema = z.object({
  category: z.enum(["SEO", "Technical", "Accessibility", "Security"]),
  status: z.enum(["good", "warning", "issue"]),
  title: z.string().max(160),
  detail: z.string().max(500),
  recommendation: z.string().max(500).optional(),
});

export const auditPageSchema = z.object({
  url: z.string().url(),
  status: z.number().int(),
  title: z.string().max(300),
  description: z.string().max(500),
  h1Count: z.number().int().nonnegative(),
  imageCount: z.number().int().nonnegative(),
  imagesMissingAlt: z.number().int().nonnegative(),
  wordCount: z.number().int().nonnegative(),
});

export const auditResponseSchema = z.object({
  score: z.number().int().min(0).max(100),
  summary: z.string().max(120),
  host: z.string().max(253),
  pagesAudited: z.number().int().min(1).max(3),
  checkedAt: z.string().datetime(),
  findings: z.array(auditFindingSchema).max(24),
  pages: z.array(auditPageSchema).max(3),
});

export type AuditResponse = z.infer<typeof auditResponseSchema>;