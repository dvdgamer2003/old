export const CATEGORIES = [
  'technology',
  'sports', 
  'politics',
  'business',
  'entertainment',
  'health',
  'science',
  'education',
  'environment',
  'food',
  'travel',
  'fashion',
  'automotive',
  'gaming',
  'cryptocurrency'
] as const;

export type Category = typeof CATEGORIES[number];

export const CategoryLabels: Record<Category, string> = {
  technology: 'Technology',
  sports: 'Sports',
  politics: 'Politics',
  business: 'Business',
  entertainment: 'Entertainment',
  health: 'Health',
  science: 'Science',
  education: 'Education',
  environment: 'Environment',
  food: 'Food & Dining',
  travel: 'Travel',
  fashion: 'Fashion',
  automotive: 'Automotive',
  gaming: 'Gaming',
  cryptocurrency: 'Crypto'
};