// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', 
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
      },
      backgroundImage: {
        'custom-gradient': "linear-gradient(0deg, rgba(57, 24, 109, 0.4), rgba(57, 24, 109, 0.4)), linear-gradient(0deg, #0A0118 0%, rgba(0, 0, 0, 0) 100%)",
      },
      colors: {
        customBlue: '#3b82f6', 
        customPurple: '#8b5cf6', 
      },
    },
  },
  plugins: [],
};
