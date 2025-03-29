/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#006D3D",
				background: "#E8D4A5",
				accent: "#F4EAD2",
				light_accent: "#FAF7E6",
				text: "#4B2C20",
				highlight: "#F4A261",
			},
		},
	},
	plugins: [],
};
