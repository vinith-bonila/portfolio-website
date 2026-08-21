/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Editorial charcoal base
        ink: {
          950: '#0B0D0E',
          900: '#101314',
          850: '#15191A',
          800: '#1B2022',
          700: '#262D30',
          600: '#3A4348',
        },
        // Electric teal accent
        accent: {
          DEFAULT: '#2DE2C5',
          soft: '#14C7A8',
          deep: '#0B8F79',
          glow: 'rgba(45, 226, 197, 0.15)',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        label: '0.22em',
      },
      maxWidth: {
        content: '1180px',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out both',
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
}
