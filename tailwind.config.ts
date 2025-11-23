import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            screens: {
                sm: '430px',
                md: '744px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1600px',
            },
            backgroundImage: {
                admin: "url('/assets/images/main-lg.jpg')",
            },
        },
    },
};

export default config;
