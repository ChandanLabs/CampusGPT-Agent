/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#4F46E5",
                secondary: "#10B981",
                background: "#0f172a",
                surface: "#1e293b",
            }
        },
    },
    plugins: [],
}
