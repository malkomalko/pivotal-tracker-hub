const colors = require("tailwindcss/colors");

const config = {
	mode: "jit",
	purge: [
		"./src/**/*.{html,js,svelte,ts}",
	],
	theme: {
		colors: {
			transparent: "transparent",
			white: "#fff",
			primary: colors.cyan,
			secondary: colors.amber,
			gray: colors.trueGray,
			red: colors.red,
		},
		extend: {},
	},
	plugins: [
		require('@tailwindcss/forms'),
	],
};

module.exports = config;
