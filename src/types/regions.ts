export const REGIONS = {
  us: 'United States',
  gb: 'United Kingdom',
  in: 'India',
  au: 'Australia',
  ca: 'Canada',
  fr: 'France',
  de: 'Germany',
  jp: 'Japan',
} as const;

export type RegionCode = keyof typeof REGIONS;