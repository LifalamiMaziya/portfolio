
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
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				rajdhani: ['Rajdhani', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'blob-move-1': {
					'0%': {
						transform: 'translate(0, 0) scale(1) rotate(0deg)',
						borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%'
					},
					'33%': {
						transform: 'translate(2%, 2%) scale(1.05) rotate(10deg)',
						borderRadius: '50% 40% 30% 60% / 60% 30% 70% 40%'
					},
					'66%': {
						transform: 'translate(1%, 1%) scale(0.95) rotate(20deg)',
						borderRadius: '30% 60% 50% 40% / 40% 60% 30% 70%'
					},
					'100%': {
						transform: 'translate(0%, 0%) scale(1) rotate(0deg)',
						borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%'
					}
				},
				'blob-move-2': {
					'0%': {
						transform: 'translate(0, 0) scale(1) rotate(0deg)',
						borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
					},
					'33%': {
						transform: 'translate(-2%, 1%) scale(1.05) rotate(-10deg)',
						borderRadius: '40% 60% 70% 30% / 30% 70% 40% 60%'
					},
					'66%': {
						transform: 'translate(-1%, 2%) scale(0.95) rotate(-20deg)',
						borderRadius: '70% 30% 40% 60% / 50% 40% 60% 50%'
					},
					'100%': {
						transform: 'translate(0%, 0%) scale(1) rotate(0deg)',
						borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
					}
				},
				'blob-move-3': {
					'0%': {
						transform: 'translate(0, 0) scale(1) rotate(0deg)',
						borderRadius: '40% 60% 60% 40% / 70% 30% 50% 60%'
					},
					'33%': {
						transform: 'translate(2%, -1%) scale(0.95) rotate(15deg)',
						borderRadius: '60% 40% 30% 70% / 40% 60% 70% 30%'
					},
					'66%': {
						transform: 'translate(1%, -2%) scale(1.05) rotate(30deg)',
						borderRadius: '30% 70% 60% 40% / 60% 40% 50% 70%'
					},
					'100%': {
						transform: 'translate(0%, 0%) scale(1) rotate(0deg)',
						borderRadius: '40% 60% 60% 40% / 70% 30% 50% 60%'
					}
				},
				'blob-move-4': {
					'0%': {
						transform: 'translate(0, 0) scale(1) rotate(0deg)',
						borderRadius: '60% 40% 40% 60% / 40% 60% 40% 60%'
					},
					'33%': {
						transform: 'translate(-1%, -2%) scale(1.05) rotate(-15deg)',
						borderRadius: '40% 60% 70% 30% / 70% 30% 40% 60%'
					},
					'66%': {
						transform: 'translate(-2%, -1%) scale(0.95) rotate(-30deg)',
						borderRadius: '70% 30% 40% 60% / 30% 70% 60% 40%'
					},
					'100%': {
						transform: 'translate(0%, 0%) scale(1) rotate(0deg)',
						borderRadius: '60% 40% 40% 60% / 40% 60% 40% 60%'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'fade-out': 'fade-out 0.3s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'blob-1': 'blob-move-1 25s ease-in-out infinite alternate',
				'blob-2': 'blob-move-2 28s ease-in-out infinite alternate',
				'blob-3': 'blob-move-3 26s ease-in-out infinite alternate',
				'blob-4': 'blob-move-4 24s ease-in-out infinite alternate',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
