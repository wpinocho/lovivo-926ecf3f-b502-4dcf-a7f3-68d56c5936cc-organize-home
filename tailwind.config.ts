import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: '0 0% 89.8%',
				input: '0 0% 89.8%',
				ring: '142.1 76.2% 36.3%',
				background: '0 0% 100%',
				foreground: '220 26% 14%',
				primary: {
					DEFAULT: '142.1 76.2% 36.3%',
					foreground: '0 0% 100%'
				},
				secondary: {
					DEFAULT: '220 14% 96%',
					foreground: '220 26% 14%'
				},
				destructive: {
					DEFAULT: '0 84.2% 60.2%',
					foreground: '0 0% 98%'
				},
				muted: {
					DEFAULT: '220 14% 96%',
					foreground: '220 9% 46%'
				},
				accent: {
					DEFAULT: '142.1 76.2% 36.3%',
					foreground: '0 0% 100%'
				},
				popover: {
					DEFAULT: '0 0% 100%',
					foreground: '220 26% 14%'
				},
				card: {
					DEFAULT: '0 0% 100%',
					foreground: '220 26% 14%'
				},
				sidebar: {
					DEFAULT: '0 0% 98%',
					foreground: '220 9% 46%',
					primary: '220 26% 14%',
					'primary-foreground': '0 0% 98%',
					accent: '220 14% 96%',
					'accent-foreground': '220 26% 14%',
					border: '220 13% 91%',
					ring: '142.1 76.2% 36.3%'
				}
			},
			borderRadius: {
				lg: '0.5rem',
				md: '0.375rem',
				sm: '0.25rem'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;