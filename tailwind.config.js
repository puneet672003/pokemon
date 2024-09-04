/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				"search-gradient":
					"linear-gradient(to bottom, rgba(15, 14, 16, 0.9), rgba(15, 14, 16, 0))",
			},
			boxShadow: {
				glow: "0 0 30px #0284c7",
			},
			colors: {
				secondary: {
					"50": "#f0f9ff",
					"100": "#e0f2fe",
					"200": "#bae6fd",
					"300": "#7dd3fc",
					"400": "#38bdf8",
					"500": "#0ea5e9",
					"600": "#0284c7",
					"700": "#0369a1",
					"800": "#075985",
					"900": "#0c4a6e",
					"950": "#082f49",
				},
				primary: {
					"100": "#18191A",
					"200": "#0F0E10",
				},
			},
		},
	},
	plugins: [require("tailwind-scrollbar")],
};
