import plugin from 'tailwindcss/plugin';

export default {
    darkMode: 'class',
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            colors: {
                graphite: {
                    900: '#0E141B',
                    800: '#151D28'
                },
                royal: {
                    DEFAULT: '#183B73',
                    shade: '#0E2F63'
                },
                pulse: {
                    cyan: '#53D3F8',
                    hover: '#34B6E3'
                },
                metal: {
                    text: '#E5E7EB'
                },
                gold: {
                    g0: '#FFF1C2',
                    g1: '#E6C56E',
                    g2: '#B3842A'
                }
            },
            fontFamily: {
                heading: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                serif: ['Cinzel', 'ui-serif', 'serif']
            },
            letterSpacing: {
                heading: '-0.02em',
                smallcaps: '0.05em'
            },
            backgroundImage: {
                'gold-imperial':
                    'linear-gradient(92deg, #FFF1C2 0%, #E6C56E 100%)',
                'starfield': 'none',
                'circuit': 'none'
            },
            boxShadow: {
                'gold-emboss': '0 1px 2px rgba(0,0,0,0.2)'
            },
            dropShadow: {
                gold: 'none',
                cyan: 'none'
            },
            keyframes: {
                sparkle: {
                    '0%, 100%': { opacity: 0.5 },
                    '50%': { opacity: 1 }
                }
            },
            animation: {
                sparkle: 'none',
                'wave-scroll': 'none'
            },
            zIndex: {
                wave: 0,
                content: 10,
                ring: 20,
                star: 30,
                header: 50
            },
            borderRadius: {
                panel: '8px',
                button: '6px'
            },
            typography: ({ theme }) => ({
                DEFAULT: {
                    css: {
                        color: theme('colors.metal.text'),
                        h1: { letterSpacing: theme('letterSpacing.heading') },
                        a: { color: theme('colors.pulse.cyan') }
                    }
                }
            })
        }
    },
    plugins: [
        plugin(function ({ addUtilities, theme }) {
            addUtilities({
                '.text-gold-gradient': {
                    color: theme('colors.gold.g1')
                },
                '.ring-gold': {
                    boxShadow: '0 0 0 1px rgba(230,197,110,0.3)'
                },
                '.metallic': {
                    color: theme('colors.metal.text')
                },
                '.small-caps': {
                    letterSpacing: theme('letterSpacing.smallcaps'),
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                },
                '.bg-wave': {
                    backgroundImage: 'none'
                },
                '.animate-wave-scroll': {
                    animation: 'none'
                }
            });
        })
    ]
};

