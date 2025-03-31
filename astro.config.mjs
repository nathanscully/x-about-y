import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';

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
    },
    // Runtime configuration for local development
    runtime: {
      bindings: {
        // KV namespaces
        POSTS_KV: {
          type: 'kv',
        },
        GENERATION_COUNTER_KV: {
          type: 'kv',
        },
      },
    },
  }),
  // Enable Tailwind CSS integration
  integrations: [
    tailwind({
      // Configure Tailwind CSS options if needed
      // For example, to add custom plugins or theme values
      config: { 
        applyBaseStyles: false, // We'll import the base styles manually
      },
    }),
  ],
  // Set site metadata for SEO
  site: 'https://linkedin-parody-generator.pages.dev',
}); 