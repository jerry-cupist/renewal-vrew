const config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './context/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    borderRadius: {
      DEFAULT: '8px',
    },

    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        purple: '#6c00c7',
        'bubble-gum': '#ff77e9',
        gray: {
          100: '#f7fafc',
          200: '#ccc',
          900: '#1a202c',
        },
      },
      fontSize: {
        title1: [
          '26px',
          {
            fontWeight: 'bold',
            lineHeight: '36px',
            letterSpacing: '-0.25px',
          },
        ],
        title2: [
          '24px',
          {
            fontWeight: 'bold',
            lineHeight: '32px',
            letterSpacing: '-0.25px',
          },
        ],
        subtitle1: [
          '22px',
          {
            fontWeight: 'semi-bold',
            lineHeight: '30px',
            letterSpacing: 'auto',
          },
        ],
        subtitle2: [
          '18px',
          {
            fontWeight: 'bold',
            lineHeight: 'auto',
            letterSpacing: 'auto',
          },
        ],
        subtitle3: [
          '18px',
          {
            fontWeight: 'bold',
            lineHeight: '24px',
            letterSpacing: 'auto',
          },
        ],
        button1: [
          '16px',
          {
            fontWeight: 'semi-bold',
            lineHeight: 'auto',
            letterSpacing: 'auto',
          },
        ],
        button2: [
          '14px',
          {
            fontWeight: 'semi-bold',
            lineHeight: 'auto',
            letterSpacing: 'auto',
          },
        ],
        link: [
          '13px',
          {
            fontWeight: 'semi-bold',
            lineHeight: 'auto',
            letterSpacing: 'auto',
          },
        ],
      },
      lineHeight: {
        40: '40px',
      },
    },
  },

  plugins: [],
}
export default config
