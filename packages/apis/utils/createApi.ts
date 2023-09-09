import { AxiosInstance, AxiosResponse } from 'axios'

type AxiosFunction = (...args: any[]) => Promise<AxiosResponse>

type FunctionSchema = Record<string, AxiosFunction>

export function createApis<Schema extends FunctionSchema>(
  callbackFunction: (instance: AxiosInstance) => {
    [FunctionName in keyof Schema]: Schema[FunctionName]
  },
) {
  return (instance: AxiosInstance) => callbackFunction(instance)
}
