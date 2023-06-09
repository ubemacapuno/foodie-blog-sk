/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	daisyui: {
		themes: ['dark', 'light', 'dracula'],
		styled: true
	},
	plugins: [require('daisyui')]
};
