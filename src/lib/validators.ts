import { z } from "zod";

export const managerFormSchema = z.object({
  name: z.string().trim().min(2, "Asset Manager Name is required."),
  displayName: z.string().trim().optional(),
  description: z.string().trim().optional().default(""),
  type: z.enum(["PMS", "AIF", "BOTH"]),
  websiteUrl: z
    .string()
    .trim()
    .optional()
    .refine(
      (v) => !v || /^https?:\/\/.+/i.test(v),
      "Enter a valid website URL."
    ),
  logoUrl: z.string().optional(),
  coverImageUrl: z.string().optional(),
  categoryIds: z.array(z.string()).default([]),
  contactPerson: z.string().optional(),
  contactEmail: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Enter a valid email."),
  contactPhone: z.string().optional(),
  address: z.string().optional(),
  sebiRegistrationNumber: z.string().optional(),
  registrationType: z.string().optional(),
  licenseDocumentUrl: z.string().optional(),
  licenseValidity: z.string().optional(),
  strategyName: z.string().optional(),
  investmentPhilosophy: z.string().optional(),
  investmentApproach: z.string().optional(),
  riskProfile: z.string().optional(),
  minimumInvestment: z.string().optional(),
  lockInPeriod: z.string().optional(),
  inceptionDate: z.string().optional(),
  aum: z.string().optional(),
  clientCount: z.string().optional(),
  oneYearReturn: z.string().optional(),
  threeYearReturn: z.string().optional(),
  fiveYearReturn: z.string().optional(),
  sinceInceptionReturn: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  featured: z.boolean().default(false),
});

export const publishSchema = managerFormSchema.extend({
  logoUrl: z.string().min(1, "Logo is required."),
  description: z.string().trim().min(20, "Description is required."),
});

export type ManagerFormValues = z.infer<typeof managerFormSchema>;

export const blogFormSchema = z.object({
  title: z.string().trim().min(3, "Title is required."),
  slug: z.string().trim().optional(),
  excerpt: z.string().trim().default(""),
  body: z.string().trim().default(""),
  coverImageUrl: z.string().optional(),
  kicker: z.string().trim().default("Article"),
  authorName: z.string().trim().optional(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  publishedAt: z.string().optional(),
  metaTitle: z.string().trim().optional(),
  metaDescription: z.string().trim().optional(),
  ogImageUrl: z.string().optional(),
  canonicalUrl: z.string().trim().optional(),
  noIndex: z.boolean().default(false),
});

export const blogPublishSchema = blogFormSchema.extend({
  excerpt: z.string().trim().min(20, "Excerpt is required for publish."),
  body: z.string().trim().min(40, "Body content is required for publish."),
});

export type BlogFormValues = z.infer<typeof blogFormSchema>;

export const landingFormSchema = z.object({
  title: z.string().trim().min(3, "Title is required."),
  slug: z.string().trim().min(2, "Slug is required."),
  eyebrow: z.string().trim().default(""),
  lead: z.string().trim().default(""),
  sectionsText: z.string().default(""),
  widgets: z.string().default(""),
  faqsText: z.string().default(""),
  kind: z.string().trim().default("generic"),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  metaTitle: z.string().trim().optional(),
  metaDescription: z.string().trim().optional(),
  ogImageUrl: z.string().optional(),
  canonicalUrl: z.string().trim().optional(),
  noIndex: z.boolean().default(false),
});

export const landingPublishSchema = landingFormSchema.extend({
  lead: z.string().trim().min(20, "Lead is required for publish."),
});

export type LandingFormValues = z.infer<typeof landingFormSchema>;

export const seoSettingsSchema = z.object({
  siteName: z.string().trim().min(2),
  defaultTitle: z.string().trim().min(5),
  titleTemplate: z.string().trim().min(2),
  defaultDescription: z.string().trim().min(20),
  defaultOgImage: z.string().optional(),
  twitterHandle: z.string().optional(),
  robotsIndex: z.boolean().default(true),
  googleVerification: z.string().optional(),
});

export type SeoSettingsValues = z.infer<typeof seoSettingsSchema>;
