import sharedConfig from 'tailwind-config/tailwind.config.js'
/** @type {import('tailwindcss').Config} */
const path = require('path')
/** @vrew/ui의 절대 경로 */
const UI_PACKAGE_PATH = path.dirname(require.resolve('@vrew/ui'))
/**
 * `@vrew/ui`에서 생성한 공용 컴포넌트 폴더명
 * @note tailwind의 스캔범위를 축소하기위해 구체적인 폴더명을 지정하는 것이 좋습니다. 따라서 packages/ui에 새로운 컴포넌트 폴더를 생성한 경우 아래 배열에 폴더명을 추가해야 합니다.
 * @see https://tailwindcss.com/docs/content-configuration#working-with-third-party-libraries
 * @see https://tailwindcss.com/docs/content-configuration#classes-arent-generated
 */
const UI_PACKAGE_FOLDER_NAMES = ['Forms', 'Layout', 'Navigation', 'Typography']
const ABSOLUTE_UI_PACKAGE_PATHS = UI_PACKAGE_FOLDER_NAMES.map(folderName =>
  path.join(UI_PACKAGE_PATH, folderName, '**/*.{jsx,tsx}'),
)

/**
 * @note 외부 패키지 참조시 빌드 시간이 오래 걸리는 이슈가 존재함.
 */
const config = {
  /**
   * 기본 설정을 공유하기위해 사용합니다. presets을 지정할 경우 tailwind 기본 설정을 사용하지 않게 됩니다.
   * @see https://tailwindcss.com/docs/configuration#presets
   * @see https://tailwindcss.com/docs/presets
   */
  presets: [sharedConfig],
  content: {
    /**
     * tailwind.config.js의 위치가 아닌 프로젝트 루트 경로를 기준으로 상대경로를 판단하는 것이 기본값입니다.
     * tailwind.config.js의 위치를 기준으로 상대경로를 설정하려면 아래 `relative:true`로 변경하면 됩니다.
     */
    relative: false,
    files: [
      './app/**/*.{jsx,tsx}', // Note the addition of the `app` directory.
      './context/**/*.{jsx,tsx}',
      './components/**/*.{jsx,tsx}',
      './features/**/*.{jsx,tsx}',
      ...ABSOLUTE_UI_PACKAGE_PATHS,
    ],
  },
}

export default config
