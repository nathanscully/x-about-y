import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'server',

  adapter: cloudflare({
    // Cloudflare-specific configuration
    mode: 'directory',
    directives: {
      // Set security headers
      'content-security-policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://api.openai.com;",
      'x-frame-options': 'DENY',
      'x-content-type-options': 'nosniff',
    },
    // Enable platform proxy for local development with KV
    platformProxy: {
      enabled: true,
      configPath: './wrangler.toml',
      persist: true
    },
    imageService: 'cloudflare',
    // Runtime configuration for local development
    runtime: {
      bindings: {
        // KV namespaces
        XABOUTY_POSTS: {
          type: 'kv',
        },
        XABOUTY_GENERATION_COUNTER: {
          type: 'kv',
        },
        // Add this binding for your OpenAI API key
        OPENAI_API_KEY: {
          type: 'secret',
        },
      },
    },
  }),

  // Enable Tailwind CSS integration
  integrations: [],

  // Set site metadata for SEO
  site: 'https://linkedin-parody-generator.pages.dev',

  vite: {
    plugins: [tailwindcss()],
  },
});