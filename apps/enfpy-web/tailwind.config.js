import sharedConfig from 'tailwind-config/tailwind.config.js'

// const path = require('path')

// const UI_PACKAGE_PATH = path.dirname(require.resolve('@vrew/ui'))
// const ABSOLUTE_UI_PACKAGE_PATH = path.join(
//   UI_PACKAGE_PATH,
//   '**/*.{js,ts,jsx,tsx}',
// )

/**
 * @note 외부 패키지 참조시 빌드 시간이 오래 걸리는 이슈가 존재함.
 */
const config = {
  presets: [sharedConfig],
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}', // Note the addition of the `app` directory.
    './context/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
    // ABSOLUTE_UI_PACKAGE_PATH,
  ],
}

export default config
