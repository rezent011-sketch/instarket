import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}','./components/**/*.{js,ts,jsx,tsx}','./lib/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: { DEFAULT: '#0d0d0d', card: '#1a1a1a', border: '#252525' },
        primary: { DEFAULT: '#2563eb', dark: '#1d4ed8', light: '#3b82f6' },
        accent: { DEFAULT: '#00cc88', dark: '#00aa70' },
        text: { DEFAULT: '#ffffff', muted: '#888888', subtle: '#555555' }
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }
    }
  },
  plugins: []
}
export default config
