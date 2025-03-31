# Project Structure

This document outlines the key files and directories in the X about Y project.

```
├── public/                 # Static assets
│   ├── favicon.svg
│   ├── social-image.jpg    # For social media sharing
│   └── fonts/              # Web fonts (if needed)
│
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Button.astro
│   │   ├── CopyButton.astro # For copying post content
│   │   ├── ShareButtons.astro # Social sharing buttons
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── PostCard.astro  # Main post display component
│   │   └── SelectionUI.astro # X/Y selection UI
│   │
│   ├── data/               # Static data
│   │   ├── x-values.json   # Absurd activities
│   │   └── y-values.json   # Business concepts
│   │
│   ├── layouts/            # Page layouts
│   │   └── BaseLayout.astro # Common page structure with social media metadata
│   │
│   ├── lib/                # Utilities and helpers
│   │   ├── api.ts          # API client functions
│   │   ├── openai.ts       # OpenAI integration
│   │   ├── social.ts       # Social sharing utilities
│   │   └── utils.ts        # Helper functions
│   │
│   ├── pages/              # Page routes
│   │   ├── index.astro     # Homepage
│   │   ├── about.astro     # About page
│   │   ├── contribute.astro # How to contribute
│   │   ├── post/[x]/[y].astro # Sharable permalink page for specific post
│   │   └── api/            # API endpoints
│   │       ├── post.ts     # Get/generate specific post
│   │       └── random.ts   # Get random post
│   │
│   └── styles/             # Global styles
│       └── global.css
│
├── .env                    # Environment variables (git-ignored)
├── .env.example            # Example environment variables
├── astro.config.mjs        # Astro configuration
├── tailwind.config.cjs     # Tailwind configuration
├── package.json            # Dependencies and scripts
├── pnpm-lock.yaml          # PNPM lock file
├── tsconfig.json           # TypeScript configuration
├── README.md               # Project overview
└── TODO.md                 # Development tasks
```

## Key Files and Their Purpose

### Configuration Files

- **astro.config.mjs**: Configures Astro and the Cloudflare adapter
- **tailwind.config.cjs**: Configure Tailwind CSS theme and plugins
- **env.d.ts**: TypeScript declarations for environment variables and Cloudflare bindings
- **.env**: Contains environment variables like API keys (git-ignored)

### Frontend Components

- **PostCard.astro**: Displays the generated LinkedIn post with styling
- **CopyButton.astro**: Button for copying post content to clipboard
- **ShareButtons.astro**: Buttons for sharing content to social media
- **SelectionUI.astro**: Interface for selecting X and Y values
- **BaseLayout.astro**: Common layout with SEO and social metadata 
  - Includes Open Graph tags for rich previews on social media
  - Includes Twitter card tags
  - Configures dynamic metadata for each post

### API Routes

- **api/post.ts**: Gets or generates a post for a specific X/Y combination
- **api/random.ts**: Returns a random X/Y combination and its post
- **post/[x]/[y].astro**: Dynamic route for sharable, permalink pages

### Utilities

- **lib/openai.ts**: Handles OpenAI API requests for post generation
- **lib/utils.ts**: Contains helper functions for formatting, slug handling, etc.
- **lib/social.ts**: Utilities for generating share links and metadata

### Data Files

- **data/x-values.json**: JSON array of absurd activities (X values)
- **data/y-values.json**: JSON array of business concepts (Y values) 