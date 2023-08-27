import axios, {
  AxiosInterceptorOptions,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const apiClient = axios.create({
  timeout: 3000,
});

const handleRequestFulfilled = async (config: InternalAxiosRequestConfig) => {
  console.log("[AXIOS_INTERCEPTOR] REQ fulfilled");

  return config;
};
const handleRequestRejected = (
  error: any,
  options?: AxiosInterceptorOptions
) => {
  console.log("[AXIOS_INTERCEPTOR]  REQ rejected", { error });
};

apiClient.interceptors.request.use(
  handleRequestFulfilled,
  handleRequestRejected
);

const handleResponseFulfilled = async (response: AxiosResponse) => {
  console.log("[AXIOS_INTERCEPTOR]  RES fulfilled");
  return response;
};

const handleResponseRejected = async (
  error: any,
  options?: AxiosInterceptorOptions
) => {
  console.log("[AXIOS_INTERCEPTOR]  RES rejected", { error });
};

apiClient.interceptors.response.use(
  handleResponseFulfilled,
  handleResponseRejected
);

export default apiClient;
