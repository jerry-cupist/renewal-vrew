import { PropsWithChildren } from "react";
import AuthProvider from "../context/AuthProvider";
import QueryClientProvider from "../context/QueryClientProvider";
import MessageHandler from "../context/MessageHandler";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <QueryClientProvider>
            <MessageHandler>{children}</MessageHandler>
          </QueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
