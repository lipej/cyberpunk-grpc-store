module.exports = {
  mode: "jit",
  purge: ["./app/**/*.{ts,tsx}"],
  content: [],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['cyberpunk']
  }
}
