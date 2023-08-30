import AuthProvider from "../context/AuthProvider";
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
          <TokenUpdate>{children}</TokenUpdate>
        </AuthProvider>
      </body>
    </html>
  );
}
