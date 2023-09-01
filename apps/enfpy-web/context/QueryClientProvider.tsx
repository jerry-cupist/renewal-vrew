"use client";

import {
  QueryClient,
  QueryClientProvider as _QueryClientProvider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

/**
 * TODO: 디폴트 설정
 * TODO: 개발도구
 * TODO: RN 화면이동시 포커스되도록 할 수 있는지?
 */
const queryClient = new QueryClient();

export default function QueryClientProvider({ children }: PropsWithChildren) {
  return (
    <_QueryClientProvider client={queryClient}>{children}</_QueryClientProvider>
  );
}
