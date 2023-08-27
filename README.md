# Vrew

[터보레포](https://turbo.build/)를 이용한 모노레포 구조입니다.
react-native와 web간의 공통 코드를 `packages/*`에서 관리하고 있습니다.
webview bridge코드가 이 폴더 안에서 react-native와 web에 공유될 수 있습니다.

## Package Manager

- yarn을 사용하고 있습니다.

## Getting started

- `yarn install` to install deps
- Use turbo to run scripts in all packages:

  - `yarn dev` to start all dev envs
  - `yarn build` to build all packages
  - `yarn start` to start built bundles
  - `yarn test` to run all tests
  - `yarn lint` to lint all packages

## 터보레포 폴더 구조

- `apps/*`: 각각의 repository가 위치합니다. 각 repository는 `@vrew`라는 네임스페이스를 공유하고 있습니다.
  - `apps/enpfy-web`: 엔프피 웹앱
  - `apps/enpfy-native`: 엔프피 react-native
- `pacakges/*`: 모노레포에서 각 앱에 공유되는 공유 코드가 위치합니다.([Internal packages](https://turbo.build/repo/docs/handbook/sharing-code/internal-packages), 반:External packages)
  - `pacakges/ui`: 공유 UI 컴포넌트 (e.g. 디자인 컴포넌트)
  - `pacakges/utils`: 공유 util
  - `packages/tsconfig`: 각 repo의 tsconfig를 관리하고 이 파일이 merorepo에서 extend됩니다

## Good to know

- packages의 소스코드가 변경될 때 마다 재설치를 할 필요가 없습니다.
- 위치를 변경하거나 workspace의 설정을 변경한 경우에 root경로에서 재설치 (`yarn install`)를 하세요.
- 재설치 도중 문제가 생기면 모든 `node_modules`폴더를 제거하고 재설치(`yarn install`)을 하면 됩니다.
- `apps`와 `packages`의 네이밍은 필수가 아닙니다. 하지만 turborepo에서 추천하는 이름이며 문서상 이 네이밍으로 소통되고 있으니 유지하는 것을 추천합니다.
- 기본적으로 root 경로에서 `yarn dev`를 실행하면 `apps`의 앱들이 동시에 구동되도록 할 수 있지만 ios의 경우 빈번하게 실패합니다. 이 경우 xCode내에서 실행하시길 바랍니다.

## 참고

- [addingremovingupgrading-packages](https://turbo.build/repo/docs/handbook/package-installation#addingremovingupgrading-packages)
- [internal package](https://turbo.build/repo/docs/handbook/sharing-code/internal-packages#our-first-internal-package)
