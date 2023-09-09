import axios, { AxiosInstance } from 'axios'

export interface CustomHeader {
  'device-type': 'ios' | 'android' | 'web'
  'device-name': string
  'device-app-version': string
  'device-os-version': string
  'device-identification': string
}

type DefaultAxiosHeaders = AxiosInstance['defaults']['headers']
export type EnfpyAxiosHeaders = DefaultAxiosHeaders & CustomHeader

/**
 * 헤더 속성을 확장했습니다.
 */
export interface EnfpyAxiosInstance extends AxiosInstance {
  defaults: Omit<AxiosInstance['defaults'], 'headers'> & {
    headers: EnfpyAxiosHeaders
  }
}

const apiClient = axios.create({
  timeout: 3000,
}) as EnfpyAxiosInstance

export default apiClient
