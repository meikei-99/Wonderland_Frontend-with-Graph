/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        // screens: {
        //     "2xl": { max: "1535px" },
        //     // => @media (max-width: 1535px) { ... }

        //     xl: { max: "1279px" },
        //     // => @media (max-width: 1279px) { ... }

        //     lg: { max: "1023px" },
        //     // => @media (max-width: 1023px) { ... }

        //     md: { max: "767px" },
        //     // => @media (max-width: 767px) { ... }

        //     sm: { max: "639px" },
        //     // => @media (max-width: 639px) { ... }
        // },
        fontFamily: {
            display: ["Satisfy", "cursive"],
            RockSalt: ["Rock Salt", "cursive"],
            CarterOne: ["Carter One", "cursive"],
        },
        extend: {
            width: {
                132: "32rem",
                121: "21rem",
                119: "19rem",
                111: "11rem",
                115: "15rem",
                109: "8.5rem",
            },
            height: {
                132: "32rem",
                126: "26rem",
                124: "24rem",
                121: "21rem",
                123: "23rem",
                119: "19rem",
                115: "15rem",
                111: "11rem",
                109: "8.5rem",
            },
            fontWeight: {
                50: "50",
            },
            fontSize: {
                "1xl": "1.35rem",
                "5.5xl": "3.3rem",
            },
            screens: {
                xs: "360px",
            },
            borderRadius: {
                "4xl": "5rem",
            },
            keyframes: {
                bouncee: {
                    "0%": { transform: "translate-x-[2px]" },
                    "100%": { transform: "translate-x-[4px]" },
                },
            },
        },
    },
    plugins: [],
}
