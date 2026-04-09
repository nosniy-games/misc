import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: '#00d4ff',
          violet: '#7c3aed',
          pink: '#ff006e',
        },
        dark: {
          bg: '#0a0a0a',
          card: '#111111',
          purple: '#1a0a2e',
        }
      },
    },
  },
  plugins: [],
}
export default config
