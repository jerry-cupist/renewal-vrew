import ENV from '../utils/environmentVariableUtil'

const useConfig = () => {
  return {
    mainApiHost: ENV.MAIN_API_HOST,
    webUrl: ENV.WEB_URL,
  }
}

export default useConfig
