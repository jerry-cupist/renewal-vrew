import { PropsWithChildren } from "react";
import AuthProvider from "@context/AuthProvider";
import QueryClientProvider from "@context/QueryClientProvider";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <QueryClientProvider>{children}</QueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
