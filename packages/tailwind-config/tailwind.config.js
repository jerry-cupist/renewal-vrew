/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  /** 컨텐츠 스캔 범위에서 탐색되지 않은 tailwind css class의 생성이 필요한 경우 아래 배열에 추가할 수 있습니다 */
  safelist: [
    // 'bg-red-500',
  ],

  /**
   * 콘텐츠 스캔에서 의도하지 않은 css class가 생길 수 있습니다.
   * 그런 경우 아래 배열을 통해 css class가 생성되지 않도록 지정할 수 있습니다.
   * @see https://tailwindcss.com/docs/content-configuration#discarding-classes
   */
  blocklist: [
    // 'container'
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

        body3: [
          '16px',
          { fontWeight: 'bold', lineHeight: 'auto', letterSpacing: '-0.25px' },
        ],
      },
      lineHeight: {
        40: '40px',
      },
    },
  },

  plugins: [],
}
