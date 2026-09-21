export const MANAGER_TYPES = ["PMS", "AIF", "BOTH"] as const;
export type ManagerType = (typeof MANAGER_TYPES)[number];

export const STATUSES = ["draft", "published", "archived"] as const;
export type ManagerStatus = (typeof STATUSES)[number];

export const RISK_PROFILES = ["Low", "Moderate", "High", "Very High"] as const;

export const DEFAULT_CATEGORIES = [
  "Large Cap",
  "Mid Cap",
  "Small Cap",
  "Multi Cap",
  "Thematic",
  "Long Only",
  "Long Short",
  "Multi Asset",
] as const;

export const REGISTRATION_TYPES = [
  "Portfolio Manager",
  "AIF Category I",
  "AIF Category II",
  "AIF Category III",
  "Investment Adviser",
] as const;

export const SORT_OPTIONS = [
  { value: "name", label: "Name" },
  { value: "return-3y", label: "3Y Return" },
  { value: "return-1y", label: "1Y Return" },
  { value: "newest", label: "Recently updated" },
] as const;
