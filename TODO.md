# X about Y - TODO List

## Project Setup

- [x] Initialize Astro project with TypeScript using pnpm
  - [x] Run `pnpm create astro@latest` with TypeScript option
  - [x] Set up ESLint and Prettier configurations
- [x] Set up project structure following Astro best practices
  - [x] Create necessary directories (components, layouts, pages, etc.)
  - [x] Set up basic components (Header, Footer, PostCard, etc.)
  - [x] Add sample data files
- [ ] Configure Cloudflare Pages integration
- [ ] Set up Cloudflare KV namespaces
  - [ ] `POSTS_KV` for storing generated posts
  - [ ] `GENERATION_COUNTER_KV` for tracking daily generation quota
- [ ] Set up OpenAI API integration
- [ ] Create GitHub repository for X/Y contributions

## Frontend Implementation

- [ ] Create landing page with random post display
- [ ] Design post card UI component
  - [ ] Headline format: "What X taught me about Y"
  - [ ] Two-paragraph post body
  - [ ] Indication if AI-generated recently
  - [ ] Copy button for easily copying post content
- [ ] Implement "Generate another" button
- [ ] Create X/Y selection UI (dropdowns or randomizer)
- [ ] Add "Generate with this combo" button
- [ ] Include PR submission CTA (link to GitHub)
- [ ] Implement responsive design for mobile/desktop
- [ ] Add social sharing functionality
  - [ ] Add social media metadata for rich link previews
  - [ ] Add "Copy Link" button for sharing specific posts
  - [ ] Include "Share on LinkedIn" button for direct sharing
- [ ] Design and implement "Feeling Lucky" mode (optional)

## Backend Implementation

- [ ] Set up Cloudflare Worker routes
- [ ] Implement KV storage structure
  - [ ] Key format: `post:x_slug:y_slug`
  - [ ] Value format: `{ postText, createdAt }`
- [ ] Create API endpoints:
  - [ ] `GET /api/post?x=...&y=...` - Get/generate post for specific X/Y
  - [ ] `GET /api/random` - Return random X/Y combo
- [ ] Implement generation quota tracking
  - [ ] Set daily limit (e.g., 100 generations)
  - [ ] Auto-reset with 24h TTL
- [ ] Implement IP-based rate limiting (optional)
- [ ] Create OpenAI integration function
  - [ ] Implement prompt formatting
  - [ ] Handle API responses
  - [ ] Implement error handling
  - [ ] Set token limits for cost control

## Data Management

- [ ] Create initial dataset of X values (absurd activities)
- [ ] Create initial dataset of Y values (business concepts)
- [ ] Implement data loading for frontend display
- [ ] Create documentation for GitHub PR submission process
- [ ] Set up automated deployment for new PR values

## Testing

- [ ] Test OpenAI integration
- [ ] Test KV storage functionality
- [ ] Test quota enforcement
- [ ] Test rate limiting (if implemented)
- [ ] Test frontend UI across devices

## Deployment

- [ ] Configure Cloudflare Pages deployment
- [ ] Set up environment variables
- [ ] Configure domain/subdomain
- [ ] Test deployment pipeline
- [ ] Monitor initial production usage

## Documentation

- [ ] Create README with project overview
- [ ] Document API endpoints
- [ ] Create contribution guidelines for X/Y values
- [ ] Document deployment process

## Optional Enhancements

- [ ] Implement analytics (PostHog/Plausible)
- [ ] Add ability to bookmark favorite generations
- [ ] Create admin panel for monitoring quota/usage
- [ ] Implement content moderation for generated posts
- [ ] Add theme toggle (light/dark mode)

## Questions to Resolve

1. How many pre-generated posts should we start with?
2. What should be the daily generation limit?
3. Should we implement user accounts or keep it anonymous?
4. How should we handle potentially inappropriate generated content?
5. What mechanisms should be in place for community contributions?

## Architecture and Technical Details

### Astro Setup

- [ ] Configure Astro with SSR mode using the Cloudflare adapter
- [ ] Set up TypeScript configuration
- [ ] Install and configure Tailwind CSS
  - [ ] Run `pnpm astro add tailwind`
  - [ ] Configure basic Tailwind theme settings
- [ ] Create directory structure:
  - [ ] `src/pages/` - For page routes
  - [ ] `src/components/` - For UI components
  - [ ] `src/layouts/` - For page layouts
  - [ ] `src/data/` - For X/Y value files
  - [ ] `src/lib/` - For utility functions and OpenAI integration
- [ ] Set up partial hydration with minimal client-side JavaScript

### Cloudflare Integration

- [ ] Install and configure `@astrojs/cloudflare` adapter
- [ ] Add `platformProxy` option for local development
- [ ] Set up KV bindings in `astro.config.mjs`
- [ ] Configure environment variables in Cloudflare dashboard
  - [ ] `OPENAI_API_KEY` for API access
  - [ ] `DAILY_GENERATION_LIMIT` for quota control
- [ ] Create `env.d.ts` with proper type definitions for KV namespaces
- [ ] Set up proper error handling for KV operations

### API Implementation

- [ ] Create API endpoints as Astro server routes
- [ ] Implement proper caching strategy
- [ ] Set up data validation for inputs
- [ ] Create helper functions for:
  - [ ] Formatting slugs for storage
  - [ ] Sanitizing inputs
  - [ ] Generating OpenAI prompts

### Data Structure

- [ ] Define JSON schema for X values: `{ id, activity, emoji, categories[] }`
- [ ] Define JSON schema for Y values: `{ id, concept, emoji, categories[] }`
- [ ] Create sample data files
- [ ] Set up seed script to pre-generate initial posts 

## Implementation Strategy & Project Phases

### Phase 1: Foundation & MVP

- [ ] Set up basic Astro project with Cloudflare adapter
- [ ] Create minimal UI with hardcoded example posts
- [ ] Set up basic project structure and routes
- [ ] Configure KV namespaces
- [ ] Create static X and Y data files with 10-20 examples each
- [ ] Implement basic random post selection from static data

### Phase 2: OpenAI Integration & Core Features

- [ ] Set up OpenAI API client
- [ ] Implement post generation functionality
- [ ] Create API endpoints for post retrieval and generation
- [ ] Implement quota tracking
- [ ] Set up post storage in KV
- [ ] Add "Generate another" functionality
- [ ] Implement X/Y selection UI

### Phase 3: Polish & User Experience

- [ ] Improve UI design and responsiveness
- [ ] Add animations and transitions
- [ ] Implement social sharing
- [ ] Add "Feeling Lucky" mode
- [ ] Create PR submission process documentation
- [ ] Implement SEO optimizations
- [ ] Add loading states and error handling

### Phase 4: Deployment & Monitoring

- [ ] Set up production environment
- [ ] Configure proper environment variables
- [ ] Implement analytics (if chosen)
- [ ] Set up monitoring for API usage
- [ ] Create admin dashboard (if needed)
- [ ] Complete documentation

### Phase 5: Community & Growth

- [ ] Create contribution guidelines
- [ ] Set up automated PR validation for X/Y contributions
- [ ] Implement user feedback mechanism
- [ ] Collect and analyze usage data
- [ ] Plan for additional features based on feedback 

## Appendix: Sample Data

### Sample X Values (Absurd Activities)

```json
[
  {
    "id": "sheep-shearing",
    "activity": "shaving a sheep",
    "emoji": "🐑",
    "categories": ["animals", "farm"]
  },
  {
    "id": "extreme-ironing",
    "activity": "extreme ironing",
    "emoji": "👕",
    "categories": ["sports", "household"]
  },
  {
    "id": "underwater-basket-weaving",
    "activity": "underwater basket weaving",
    "emoji": "🧺",
    "categories": ["crafts", "water"]
  },
  {
    "id": "competitive-eating",
    "activity": "competitive hot dog eating",
    "emoji": "🌭",
    "categories": ["food", "competition"]
  },
  {
    "id": "goat-yoga",
    "activity": "goat yoga",
    "emoji": "🐐",
    "categories": ["animals", "wellness"]
  }
]
```

### Sample Y Values (Business Concepts)

```json
[
  {
    "id": "b2b-sales",
    "concept": "B2B sales",
    "emoji": "💼",
    "categories": ["sales", "business"]
  },
  {
    "id": "product-market-fit",
    "concept": "product-market fit",
    "emoji": "🎯",
    "categories": ["startup", "product"]
  },
  {
    "id": "thought-leadership",
    "concept": "thought leadership",
    "emoji": "🧠",
    "categories": ["marketing", "personal branding"]
  },
  {
    "id": "stakeholder-management",
    "concept": "stakeholder management",
    "emoji": "🤝",
    "categories": ["management", "leadership"]
  },
  {
    "id": "digital-transformation",
    "concept": "digital transformation",
    "emoji": "💻",
    "categories": ["technology", "strategy"]
  }
]
```

### Sample OpenAI Prompt

```
Write a funny, satirical two-paragraph LinkedIn post with the title:
"What shaving a sheep taught me about B2B sales"

The tone should be inspirational yet absurd, mimicking overly-earnest LinkedIn posts.
Include business buzzwords, forced analogies between the activity and the business concept, and at least one humble-brag.
Make it sound like someone trying too hard to appear insightful based on an unrelated experience.
Include excessive use of hashtags at the end.

Keep it under 400 tokens and format it as a professional LinkedIn post.
DO NOT include any kind of framing or quotes - write as if you are the person who had this experience directly.
``` 