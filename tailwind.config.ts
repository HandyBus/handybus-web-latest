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
    './src/mdx-components.tsx',
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
      brand: {
        primary: {
          50: 'rgb(var(--brand-primary-50) / <alpha-value>)',
          100: 'rgb(var(--brand-primary-100) / <alpha-value>)',
          200: 'rgb(var(--brand-primary-200) / <alpha-value>)',
          300: 'rgb(var(--brand-primary-300) / <alpha-value>)',
          400: 'rgb(var(--brand-primary-400) / <alpha-value>)',
          500: 'rgb(var(--brand-primary-500) / <alpha-value>)',
          600: 'rgb(var(--brand-primary-600) / <alpha-value>)',
        },
        grey: {
          50: 'rgb(var(--brand-grey-50) / <alpha-value>)',
          100: 'rgb(var(--brand-grey-100) / <alpha-value>)',
          200: 'rgb(var(--brand-grey-200) / <alpha-value>)',
          300: 'rgb(var(--brand-grey-300) / <alpha-value>)',
          400: 'rgb(var(--brand-grey-400) / <alpha-value>)',
          500: 'rgb(var(--brand-grey-500) / <alpha-value>)',
          600: 'rgb(var(--brand-grey-600) / <alpha-value>)',
          700: 'rgb(var(--brand-grey-700) / <alpha-value>)',
        },
      },
      basic: {
        white: 'rgb(var(--basic-white) / <alpha-value>)',
        black: 'rgb(var(--basic-black) / <alpha-value>)',
        red: {
          100: 'rgb(var(--basic-red-100) / <alpha-value>)',
          200: 'rgb(var(--basic-red-200) / <alpha-value>)',
          300: 'rgb(var(--basic-red-300) / <alpha-value>)',
          400: 'rgb(var(--basic-red-400) / <alpha-value>)',
          500: 'rgb(var(--basic-red-500) / <alpha-value>)',
        },
        blue: {
          100: 'rgb(var(--basic-blue-100) / <alpha-value>)',
          200: 'rgb(var(--basic-blue-200) / <alpha-value>)',
          300: 'rgb(var(--basic-blue-300) / <alpha-value>)',
          400: 'rgb(var(--basic-blue-400) / <alpha-value>)',
        },
        yellow: {
          50: 'rgb(var(--basic-yellow-50) / <alpha-value>)',
          100: 'rgb(var(--basic-yellow-100) / <alpha-value>)',
        },
        pink: {
          50: 'rgb(var(--basic-pink-50) / <alpha-value>)',
          100: 'rgb(var(--basic-pink-100) / <alpha-value>)',
        },
        orange: {
          50: 'rgb(var(--basic-orange-50) / <alpha-value>)',
          100: 'rgb(var(--basic-orange-100) / <alpha-value>)',
        },
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
