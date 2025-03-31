/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

// Define KV namespace type
type KVNamespace = import("@cloudflare/workers-types").KVNamespace;

// Define our custom environment with bindings
interface Env {
  // KV namespaces
  XABOUTY_POSTS: KVNamespace;
  XABOUTY_GENERATION_COUNTER: KVNamespace;
  
  // Environment variables
  OPENAI_API_KEY: string;
  DAILY_GENERATION_LIMIT: string;
  ALLOW_USER_GENERATIONS: string;
}

// Define Cloudflare runtime with our environment
type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

// Extend Astro's Locals interface
declare namespace App {
  interface Locals extends Runtime {}
} 