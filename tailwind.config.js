/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7E57C2', // A deep, vibrant purple
        secondary: '#EC407A', // A bright, energetic pink
        accent: '#4DD0E1', // A cool, refreshing cyan
        background: '#1A1A1A', // A very dark gray, almost black
        surface: '#2C2C2C', // A slightly lighter dark gray for cards and surfaces
        text: '#FFFFFF', // White text for high contrast
        subtle: '#A0A0A0', // A light gray for less important text
      },
      backgroundImage: {
        'noise': "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%\" height=\"100%\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [],
}
