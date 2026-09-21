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
