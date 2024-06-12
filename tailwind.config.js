/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#FF9B00',
                secondary: '#0E373D',
                tertiary: '#018395',
                input: '#166D7C',
            },
        },
    },
    plugins: [],
}
