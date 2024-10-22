import type { Config } from 'tailwindcss';

const createPxEntries = (size: number) => {
  return {
    0: '0',
    ...Array.from(Array(size + 1)).reduce((accumulator, _, i) => {
      return { ...accumulator, [`${i * 4}`]: `${i * 4}px` };
    }),
  };
};

const PX_ENTRIES = createPxEntries(500);

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    spacing: PX_ENTRIES,
    colors: {
      transparent: 'transparent',
      brand: {
        primary: {
          50: 'rgb(var(--brand-primary-50) / <alpha-value>)',
          100: 'rgb(var(--brand-primary-100) / <alpha-value>)',
          200: 'rgb(var(--brand-primary-200) / <alpha-value>)',
          300: 'rgb(var(--brand-primary-300) / <alpha-value>)',
          400: 'rgb(var(--brand-primary-400) / <alpha-value>)',
          main: 'rgb(var(--brand-primary-main) / <alpha-value>)',
          600: 'rgb(var(--brand-primary-600) / <alpha-value>)',
          700: 'rgb(var(--brand-primary-700) / <alpha-value>)',
          800: 'rgb(var(--brand-primary-800) / <alpha-value>)',
          900: 'rgb(var(--brand-primary-900) / <alpha-value>)',
        },
      },
      basic: {
        white: 'rgb(var(--white) / <alpha-value>)',
        black: 'rgb(var(--black) / <alpha-value>)',
        grey: {
          50: 'rgb(var(--basic-grey-50) / <alpha-value>)',
          100: 'rgb(var(--basic-grey-100) / <alpha-value>)',
          200: 'rgb(var(--basic-grey-200) / <alpha-value>)',
          300: 'rgb(var(--basic-grey-300) / <alpha-value>)',
          400: 'rgb(var(--basic-grey-400) / <alpha-value>)',
          500: 'rgb(var(--basic-grey-500) / <alpha-value>)',
          600: 'rgb(var(--basic-grey-600) / <alpha-value>)',
          700: 'rgb(var(--basic-grey-700) / <alpha-value>)',
          800: 'rgb(var(--basic-grey-800) / <alpha-value>)',
          900: 'rgb(var(--basic-grey-900) / <alpha-value>)',
        },
        red: {
          50: 'rgb(var(--basic-red-50) / <alpha-value>)',
          100: 'rgb(var(--basic-red-100) / <alpha-value>)',
          200: 'rgb(var(--basic-red-200) / <alpha-value>)',
          300: 'rgb(var(--basic-red-300) / <alpha-value>)',
          400: 'rgb(var(--basic-red-400) / <alpha-value>)',
          500: 'rgb(var(--basic-red-500) / <alpha-value>)',
          600: 'rgb(var(--basic-red-600) / <alpha-value>)',
          700: 'rgb(var(--basic-red-700) / <alpha-value>)',
          800: 'rgb(var(--basic-red-800) / <alpha-value>)',
          900: 'rgb(var(--basic-red-900) / <alpha-value>)',
        },
        blue: {
          50: 'rgb(var(--basic-blue-50) / <alpha-value>)',
          100: 'rgb(var(--basic-blue-100) / <alpha-value>)',
          200: 'rgb(var(--basic-blue-200) / <alpha-value>)',
          300: 'rgb(var(--basic-blue-300) / <alpha-value>)',
          400: 'rgb(var(--basic-blue-400) / <alpha-value>)',
          500: 'rgb(var(--basic-blue-500) / <alpha-value>)',
          600: 'rgb(var(--basic-blue-600) / <alpha-value>)',
          700: 'rgb(var(--basic-blue-700) / <alpha-value>)',
          800: 'rgb(var(--basic-blue-800) / <alpha-value>)',
          900: 'rgb(var(--basic-blue-900) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
};
export default config;
