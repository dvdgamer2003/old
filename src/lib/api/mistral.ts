import { MISTRAL_API_KEY, API_CONFIG } from '@/config/constants';

const API_URL = 'https://api.mistral.ai/v1/chat/completions';

interface MistralResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  error?: {
    message: string;
    type: string;
  };
}

async function callMistralAPI(prompt: string): Promise<string> {
  if (!MISTRAL_API_KEY) {
    throw new Error('Missing Mistral API key');
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        ...API_CONFIG.headers,
        'Authorization': `Bearer ${MISTRAL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistral-tiny',
        messages: [{
          role: 'user',
          content: prompt
        }],
        max_tokens: 300,
        temperature: 0.5,
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'API request failed');
    }

    const data: MistralResponse = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('Invalid response format from API');
    }

    return content.trim();
  } catch (error) {
    console.error('Mistral API error:', error);
    throw error;
  }
}

export async function generateNewsSummary(headlines: string[]): Promise<string> {
  const prompt = `Summarize these news headlines in 2-3 sentences and identify key themes:\n${headlines.join('\n')}`;
  return callMistralAPI(prompt);
}

export async function generateChatResponse(message: string): Promise<string> {
  return callMistralAPI(message);
}