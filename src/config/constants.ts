export const NEWS_API_KEY = '979885c25c8642a99c820190e573bae2';
export const NEWS_API_BASE_URL = 'https://newsapi.org/v2';
export const MISTRAL_API_KEY = 'V1rSAh4fCm0yEc8iRkyUzKBS21zHfKA3';

export const CATEGORIES = [
  'technology',
  'sports',
  'politics',
  'business',
  'entertainment',
  'health',
] as const;

// AI Usage limits
export const DAILY_AI_LIMIT = 10;
export const AI_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// API Configuration
export const API_CONFIG = {
  headers: {
    'Accept': 'application/json',
    'User-Agent': 'Samachar News App',
  },
  timeoutMs: 10000,
};