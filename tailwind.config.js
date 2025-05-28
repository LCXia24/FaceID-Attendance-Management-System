/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accentPrimary: '#4F46E5', // Indigo-600
        accentSecondary: '#6366F1', // Indigo-500
        accentBorder: '#C7D2FE', // Indigo-200
      },
      boxShadow: {
        accent: '0 4px 6px -1px rgba(79, 70, 229, 0.4), 0 2px 4px -2px rgba(79, 70, 229, 0.1)',
      },
    },
  },
  plugins: [],
};
