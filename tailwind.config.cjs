/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rubik', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '75ch',
            color: '#000',
            fontFamily: 'Rubik, system-ui, sans-serif',
            a: {
              color: '#000',
              textDecoration: 'underline',
              fontWeight: '700',
              '&:hover': {
                color: '#333',
              },
            },
            h1: {
              fontWeight: '900',
              letterSpacing: '-0.025em',
              fontFamily: 'Rubik, system-ui, sans-serif',
            },
            h2: {
              fontWeight: '900',
              letterSpacing: '-0.025em',
              fontFamily: 'Rubik, system-ui, sans-serif',
            },
            h3: {
              fontWeight: '700',
              fontFamily: 'Rubik, system-ui, sans-serif',
            },
            strong: {
              fontWeight: '700',
            },
            p: {
              fontFamily: 'Rubik, system-ui, sans-serif',
            }
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}; 