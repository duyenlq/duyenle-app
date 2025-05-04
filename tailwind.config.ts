import type { Config } from 'tailwindcss'
export default {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        'main': '#86CEEB', // sky blue
        'mainHover': '#EBA589'
      },
    },
  },
  plugins: [],
}