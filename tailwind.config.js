module.exports = {
  mode: "jit",
  purge: ["./app/**/*.{ts,tsx}"],
  content: [],
  theme: {
    extend: {
      colors: {
        'error-custom': '#070711'
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['cyberpunk']
  }
}
