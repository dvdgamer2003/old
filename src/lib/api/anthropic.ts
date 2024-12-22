import { ANTHROPIC_API_KEY } from '@/config/constants';

const API_URL = 'https://api.anthropic.com/v1/messages';

interface AnthropicResponse {
  content: Array<{ text: string }>;
  error?: {
    message: string;
    type: string;
  };
}

export async function generateNewsSummary(headlines: string[]): Promise<string> {
  if (!ANTHROPIC_API_KEY) {
    throw new Error('Missing Anthropic API key');
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2024-02-15',
        'x-api-key': ANTHROPIC_API_KEY,
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 150,
        messages: [{
          role: 'user',
          content: `Summarize these news headlines in 2-3 sentences and identify key themes:\n${headlines.join('\n')}`
        }]
      })
    });

    const data = await response.json();

    // Check for API errors
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to generate summary');
    }

    // Handle successful response
    if (data.content?.[0]?.text) {
      return data.content[0].text.trim();
    }

    throw new Error('Invalid response format from API');
  } catch (error) {
    console.error('Error generating news summary:', error);
    throw error;
  }
}