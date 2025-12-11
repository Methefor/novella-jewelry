import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background))',
        foreground: 'rgb(var(--foreground))',
        primary: {
          DEFAULT: 'rgb(var(--primary))',
          hover: 'rgb(var(--primary-hover))',
        },
        secondary: {
          DEFAULT: 'rgb(var(--secondary))',
          hover: 'rgb(var(--secondary-hover))',
        },
        muted: {
          DEFAULT: 'rgb(var(--muted))',
          foreground: 'rgb(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent))',
          foreground: 'rgb(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'rgb(var(--card))',
          foreground: 'rgb(var(--card-foreground))',
        },
        border: 'rgb(var(--border))',
        ring: 'rgb(var(--ring))',
        gold: {
          DEFAULT: '#D4AF37',
          dark: '#F5E6A3',
          light: '#F8EEC9',
        },
        'rose-gold': {
          DEFAULT: '#B76E79',
          dark: '#E0BFB8',
          light: '#F0D9D4',
        },
      },
      fontFamily: {
        heading: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        body: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      fontSize: {
        display: ['3.5rem', { lineHeight: '1.15' }],
        'display-sm': ['2.5rem', { lineHeight: '1.2' }],
        'heading-sm': ['1.25rem', { lineHeight: '1.4' }],
      },
      boxShadow: {
        glow: '0 0 20px rgba(212, 175, 55, 0.3)',
        'glow-rose': '0 0 20px rgba(183, 110, 121, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
