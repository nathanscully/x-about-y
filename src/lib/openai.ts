/**
 * OpenAI integration for generating LinkedIn-style posts
 */

import type { OpenAIResponse, Post, XValue, YValue } from '../types';
import { generatePostKey } from './utils';

// Constants
const MODEL = 'gpt-4o-mini';
const MAX_TOKENS = 400;
const TEMPERATURE = 0.7;

/**
 * Generate a post using OpenAI API
 */
export async function generatePost(
  x: XValue,
  y: YValue,
  openAIKey: string
): Promise<{ post: Post; isNewGeneration: boolean }> {
  try {
    const prompt = `Write a funny, satirical two-paragraph LinkedIn post with the title:
"What ${x.activity} taught me about ${y.concept}"

The tone should be inspirational yet absurd, mimicking overly-earnest LinkedIn posts.
Include business buzzwords, forced analogies between the activity and the business concept, and at least one humble-brag.
Make it sound like someone trying too hard to appear insightful based on an unrelated experience.
Include excessive use of hashtags at the end.

Keep it under 400 tokens and format it as a professional LinkedIn post.
DO NOT include any kind of framing or quotes - write as if you are the person who had this experience directly. DO NOT include the title in the response post.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openAIKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: 'system',
            content:
              'You are a satirical writer creating funny LinkedIn-style posts that parody the overly earnest style common on the platform.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: MAX_TOKENS,
        temperature: TEMPERATURE,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API Error: ${response.status} - ${errorText}`);
    }

    const data = (await response.json()) as OpenAIResponse;
    const content = data.choices[0]?.message?.content?.trim() || '';

    if (!content) {
      throw new Error('No content generated from OpenAI');
    }

    const post: Post = {
      id: generatePostKey(x.id, y.id),
      title: `${x.activity} taught me about ${y.concept}`,
      content,
      xId: x.id,
      yId: y.id,
      createdAt: Date.now(),
      isGenerated: true,
    };

    return { post, isNewGeneration: true };
  } catch (error) {
    console.error('Error generating post with OpenAI:', error);
    throw error;
  }
}

/**
 * Check if we can generate a new post based on daily limits
 */
export async function canGenerateNewPost(
  counterKV: KVNamespace,
  limit: number
): Promise<boolean> {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const countKey = `generation_count:${today}`;

  // Get current count for today
  const currentCount = parseInt((await counterKV.get(countKey)) || '0', 10);

  return currentCount < limit;
}

/**
 * Increment the daily generation counter
 */
export async function incrementGenerationCounter(
  counterKV: KVNamespace
): Promise<number> {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const countKey = `generation_count:${today}`;

  // Get current count
  const currentCount = parseInt((await counterKV.get(countKey)) || '0', 10);
  const newCount = currentCount + 1;

  // Set new count with 24-hour expiration (in seconds)
  await counterKV.put(countKey, newCount.toString(), { expirationTtl: 86400 });

  return newCount;
}
