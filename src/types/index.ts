export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  imageUrl: string;
  category: Category;
  publishedAt: string;
  source: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  preferences: string[];
  bookmarks: string[];
}

export type Category = 
  | 'technology' 
  | 'sports' 
  | 'politics' 
  | 'business' 
  | 'entertainment' 
  | 'health'
  | 'science'
  | 'education'
  | 'environment'
  | 'food'
  | 'travel'
  | 'fashion'
  | 'automotive'
  | 'gaming'
  | 'cryptocurrency';