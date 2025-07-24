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
        'background': 'var(--color-background)',
        'background-sidebar': 'var(--color-background-sidebar)',
        'background-header': 'var(--color-background-header)',
        'background-card': 'var(--color-background-card)',
        'background-hover': 'var(--color-background-hover)',
        'background-active': 'var(--color-background-active)',
        'background-emphasis': 'var(--color-background-emphasis)',
        'background-disabled': 'var(--color-background-disabled)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-subtle': 'var(--color-text-subtle)',
        'text-placeholder': 'var(--color-text-placeholder)',
        'text-accent': 'var(--color-text-accent)',
        'text-on-accent': 'var(--color-text-on-accent)',
        'text-success': 'var(--color-text-success)',
        'text-danger': 'var(--color-text-danger)',
        'border': 'var(--color-border)',
        'border-subtle': 'var(--color-border-subtle)',
        'border-input': 'var(--color-border-input)',
        'border-focus': 'var(--color-border-focus)',
        'border-active': 'var(--color-border-active)',
        'accent': 'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',
        'ring-color': 'var(--ring-color)',
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
