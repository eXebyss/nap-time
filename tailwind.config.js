/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    important: true,
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',

        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        screens: {
            xs: '414px',
            ...defaultTheme.screens,
            fhd: '1920px',
            '2k': '2560px',
            '4k': '3840px',
        },
        extend: {
            fontFamily: {
                coda: ['var(--font-coda)'],
            },
            minWidth: {
                72: '18rem',
            },
        },
    },
    // eslint-disable-next-line global-require
    plugins: [require('daisyui')],
};
