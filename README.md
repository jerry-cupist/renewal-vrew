# Vrew

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
- `pacakges`: `apps/*`에 공유되는 공유 코드가 위치합니다.
  - `pacakges/ui`: 공유 UI 컴포넌트 (e.g. 디자인 컴포넌트)
  - `pacakges/utils`: 공유 util
  - `packages/tsconfig`: 각 repo의 tsconfig를 관리하고 이 파일이 merorepo에서 extend됩니다
