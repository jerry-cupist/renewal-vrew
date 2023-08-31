export interface BaseResponse<D, M = any | undefined> {
  data: D;
  meta?: M;
}
