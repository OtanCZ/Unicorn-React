/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'text': '#ebf3ea',
                'background': '#051803',
                'primary': '#67c25e',
                'secondary': '#61287a',
                'accent': '#a4d3a0',
            },

        },
    },
    plugins: [],
}

