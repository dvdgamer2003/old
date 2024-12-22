import type { NewsApiArticle } from './types';
import type { Article, Category } from '@/types';

export function createArticleId(article: NewsApiArticle): string {
  return btoa(article.url);
}

export function transformArticle(article: NewsApiArticle, category?: Category): Article {
  const content = article.content?.split('[+')[0].trim() || article.description;
  
  return {
    id: createArticleId(article),
    title: article.title,
    description: article.description,
    content,
    url: article.url,
    imageUrl: article.urlToImage,
    category: category || 'general',
    publishedAt: article.publishedAt,
    source: article.source.name,
  };
}