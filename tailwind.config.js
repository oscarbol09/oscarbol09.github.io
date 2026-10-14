/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          lime: '#dfff52',
          'lime-bright': '#caff33',
          'lime-muted': '#b0d12e',
          dark: '#060709',
          surface: '#0b0c10',
          elevated: '#111218',
          bone: '#f2efe8',
          muted: '#8e919a',
        },
        obsidian: {
          950: '#040406',
          900: '#060709',
          850: '#0b0c10',
          800: '#111218',
          700: '#1b1d24',
        },
        accent: {
          cyan: '#06b6d4',
          blue: '#3b82f6',
          indigo: '#6366f1',
          violet: '#8b5cf6',
          emerald: '#10b981',
          lime: '#dfff52',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Menlo', 'monospace'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      },
      boxShadow: {
        'glass-edge': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
        'glow-cyan': '0 0 24px -4px rgba(6, 182, 212, 0.35)',
        'glow-blue': '0 0 24px -4px rgba(59, 130, 246, 0.35)',
        'glow-violet': '0 0 24px -4px rgba(139, 92, 246, 0.35)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
