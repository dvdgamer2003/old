export interface NewsApiResponse {
  status: string;
  code?: string;
  message?: string;
  totalResults: number;
  articles: NewsApiArticle[];
}

export interface NewsApiArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface NewsApiError {
  status: string;
  code: string;
  message: string;
}