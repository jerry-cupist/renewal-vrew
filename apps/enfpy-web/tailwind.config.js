import sharedConfig from 'tailwind-config/tailwind.config.js'

const path = require('path')

const UI_PACKAGE_PATH = path.dirname(require.resolve('@vrew/ui'))
const ABSOLUTE_UI_PACKAGE_PATH = path.join(
  UI_PACKAGE_PATH,
  '**/*.{js,ts,jsx,tsx}',
)

const config = {
  presets: [sharedConfig],
  darkMode: 'class',
  content: [ABSOLUTE_UI_PACKAGE_PATH],
}

export default config
