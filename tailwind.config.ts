import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
const createPxEntries = (size: number) => {
  return {
    0: '0',
    ...Array.from(Array(size + 1)).reduce((accumulator, _, i) => {
      return { ...accumulator, [`${i * 4}`]: `${i * 4}px` };
    }),
  };
};

const PX_ENTRIES = createPxEntries(500);

const hideScrollbar = plugin(function ({ addUtilities }) {
  addUtilities({
    '.scrollbar-hidden': {
      /* Chrome, Safari, Opera */
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      /* IE, Edge */
      '-ms-overflow-style': 'none',
      /* Firefox */
      'scrollbar-width': 'none',
    },
  });
});

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  animate: {
    spin: 'spin 1s linear infinite',
  },
  keyframes: {
    spin: {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
  },
  theme: {
    spacing: PX_ENTRIES,
    colors: {
      transparent: 'transparent',
      primary: {
        50: 'rgb(var(--primary-50) / <alpha-value>)',
        100: 'rgb(var(--primary-100) / <alpha-value>)',
        200: 'rgb(var(--primary-200) / <alpha-value>)',
        300: 'rgb(var(--primary-300) / <alpha-value>)',
        400: 'rgb(var(--primary-400) / <alpha-value>)',
        main: 'rgb(var(--primary-main) / <alpha-value>)',
        sub: 'rgb(var(--primary-sub) / <alpha-value>)',
        600: 'rgb(var(--primary-600) / <alpha-value>)',
        700: 'rgb(var(--primary-700) / <alpha-value>)',
        800: 'rgb(var(--primary-800) / <alpha-value>)',
        900: 'rgb(var(--primary-900) / <alpha-value>)',
      },
      white: 'rgb(var(--white) / <alpha-value>)',
      black: 'rgb(var(--black) / <alpha-value>)',
      grey: {
        50: 'rgb(var(--grey-50) / <alpha-value>)',
        100: 'rgb(var(--grey-100) / <alpha-value>)',
        200: 'rgb(var(--grey-200) / <alpha-value>)',
        300: 'rgb(var(--grey-300) / <alpha-value>)',
        400: 'rgb(var(--grey-400) / <alpha-value>)',
        500: 'rgb(var(--grey-500) / <alpha-value>)',
        600: {
          DEFAULT: 'rgb(var(--grey-600) / <alpha-value>)',
          sub: 'rgb(var(--grey-600-sub) / <alpha-value>)',
        },
        700: 'rgb(var(--grey-700) / <alpha-value>)',
        800: 'rgb(var(--grey-800) / <alpha-value>)',
        900: 'rgb(var(--grey-900) / <alpha-value>)',
      },
      red: {
        50: 'rgb(var(--red-50) / <alpha-value>)',
        100: 'rgb(var(--red-100) / <alpha-value>)',
        200: 'rgb(var(--red-200) / <alpha-value>)',
        300: 'rgb(var(--red-300) / <alpha-value>)',
        400: 'rgb(var(--red-400) / <alpha-value>)',
        500: 'rgb(var(--red-500) / <alpha-value>)',
        600: 'rgb(var(--red-600) / <alpha-value>)',
        700: 'rgb(var(--red-700) / <alpha-value>)',
        800: 'rgb(var(--red-800) / <alpha-value>)',
        900: 'rgb(var(--red-900) / <alpha-value>)',
      },
      blue: {
        50: 'rgb(var(--blue-50) / <alpha-value>)',
        100: 'rgb(var(--blue-100) / <alpha-value>)',
        200: 'rgb(var(--blue-200) / <alpha-value>)',
        300: 'rgb(var(--blue-300) / <alpha-value>)',
        400: 'rgb(var(--blue-400) / <alpha-value>)',
        500: 'rgb(var(--blue-500) / <alpha-value>)',
        600: 'rgb(var(--blue-600) / <alpha-value>)',
        700: 'rgb(var(--blue-700) / <alpha-value>)',
        800: 'rgb(var(--blue-800) / <alpha-value>)',
        900: 'rgb(var(--blue-900) / <alpha-value>)',
      },
    },
    fontSize: {
      10: '10px',
      12: '12px',
      14: '14px',
      16: '16px',
      18: '18px',
      20: '20px',
      22: '22px',
      24: '24px',
      26: '26px',
      28: '28px',
    },
    fontWeight: {
      400: '400',
      500: '500',
      600: '600',
      700: '700',
    },
    fontFamily: {
      sans: ['Pretendard', 'Arial'],
    },
    extend: {
      boxShadow: {
        bottomBar: '0 -4px 6px -1px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [hideScrollbar],
};
export default config;
