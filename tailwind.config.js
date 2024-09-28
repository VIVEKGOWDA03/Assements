// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust this line according to your project's structure
  ],
  theme: {
    extend: {
      animation: {
        shimmer: 'shimmer 1.5s infinite linear',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        colors: {
          customBlue: '#3b82f6', // Customize this color
          customPurple: '#8b5cf6', // Customize this color
        },
      },
    },
  },
  plugins: [],
};
