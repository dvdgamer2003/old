import type { Article } from '@/types';
import type { UserInteraction } from './types';

interface CategoryScore {
  [key: string]: number;
}

export function generateRecommendations(
  articles: Article[],
  userInteractions: UserInteraction[],
  limit: number = 5
): Article[] {
  // Calculate category preferences
  const categoryScores = userInteractions.reduce((scores: CategoryScore, interaction) => {
    const weight = interaction.type === 'bookmark' ? 2 : 1;
    scores[interaction.category] = (scores[interaction.category] || 0) + weight;
    return scores;
  }, {});

  // Score articles based on user preferences
  const scoredArticles = articles.map(article => ({
    article,
    score: categoryScores[article.category] || 0,
  }));

  // Sort by score and return top N articles
  return scoredArticles
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ article }) => article);
}