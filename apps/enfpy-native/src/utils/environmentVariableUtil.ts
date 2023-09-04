/**
 * APP전역에서 env에 직접 접근하는 것을 방지한다.
 * env 라이브러리에 따라 접근방식이 달라질 수 있는데 이 곳에서 일관된 형식을 제공한다.
 * TODO:추후 .env로 수정 필요함.
 */
const ENV = {
  MAIN_API_HOST: 'https://enfpy.cupist.dev',
  // WEB_URL: 'https://enfpy-web.cupist.dev',
  WEB_URL: 'http://localhost:3000',
};

export default ENV;
