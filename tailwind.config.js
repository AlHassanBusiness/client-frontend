/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#FFD814E5',
                secondary: '#0E373D',
                tertiary: '#018395',
                input: '#166D7C',
            },
        },
    },
    plugins: [],
}
