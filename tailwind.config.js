/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/**/*.{ts,tsx}", "*.{js,ts,jsx,tsx,mdx}", "./index.html"],
    theme: {
        extend: {},
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1360px",
            },
        },
    },
    plugins: [],
};
