/**
 * Type definitions for the X about Y application
 */

/**
 * X Value type - representing an absurd activity
 */
export interface XValue {
  id: string;
  activity: string;
  emoji: string;
}

/**
 * Y Value type - representing a business concept
 */
export interface YValue {
  id: string;
  concept: string;
  emoji: string;
}

/**
 * Post type - representing a generated post
 */
export interface Post {
  id: string;
  title: string;
  content: string;
  xId: string;
  yId: string;
  createdAt: number;
}

/**
 * OpenAI API response format
 */
export interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Daily generation counter format
 */
export interface GenerationCounter {
  date: string;
  count: number;
}

/**
 * Environment variables
 */
export interface Env {
  POSTS_KV: KVNamespace;
  GENERATION_COUNTER_KV: KVNamespace;
  OPENAI_API_KEY: string;
  DAILY_GENERATION_LIMIT: number;
} 