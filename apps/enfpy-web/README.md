# Enpfy Web

## 폴더 구조

```
|- src
|	|- app
|	|- api
|	|- assets
|	|- contexts
|	|- components
|	|- constants
|	|- hocs
|	|- hooks
|	|- modules
|	|- types
|	|- utils
```

- app: next13의 [app router](https://nextjs.org/docs/app/building-your-application/routing#the-app-router)구조, layout, routing, loading state, error handling을 폴더구조로 표현한다.
- apis: web과 공통 api가 아닌 web에서 사용되는 api를 선언
- assets: 이미지등의 정적 자원
- contexts: React.Context
- components: 프로젝트 레벨에서 공통으로 사용되는 컴포넌트
- constants: static 변수선언 모음 e.g. webStorage key
- hocs: high order component
- hooks: 비즈니스 로직이 없는 유틸성 커스텀훅, data-fetching을 위한 훅(hooks/server)과 구분된다.
- hooks/server: 데이터 패칭을 위한 커스텀훅 e.g. useQuery, useMutation
- modules: web-bridge 코드가 올 수 있다. (딱히 구분이 없다면 message 핸들러만 관리하면 좋을 것 같다. 이 경우 폴더명도 `messages`정도로 메세지 핸들러가 선언된 곳임을 명시했으면 좋을 것 같다.)
- types: 전역 타입 정의 관리
- utils: 정적 유틸 함수
