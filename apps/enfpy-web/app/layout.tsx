import AuthProvider from "../context/AuthProvider";
import QueryClientProvider from "../context/QueryClientProvider";
import TokenUpdate from "../context/TokenUpdate";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <QueryClientProvider>
            <TokenUpdate>{children}</TokenUpdate>
          </QueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
