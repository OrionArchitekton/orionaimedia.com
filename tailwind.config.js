// Observatory palette, in the same family as Orion Awakens.
export default {
    content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.ts'],
    theme: {
        extend: {
            colors: {
                midnight: '#050A1F',
                indigo: '#0A1B4D',
                cosmic: '#1B3A8F',
                gold: { DEFAULT: '#E8B45C', light: '#FDD78B', deep: '#B3842A' },
                cream: '#FEF2CA'
            },
            fontFamily: {
                serif: ['var(--font-serif)', 'Georgia', 'serif'],
                sans: ['var(--font-sans)', 'system-ui', 'sans-serif']
            }
        }
    },
    plugins: []
};
