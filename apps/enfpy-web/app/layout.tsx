import AuthProvider from "../context/AuthProvider";
import SessionLoader from "../context/SessionLoader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <SessionLoader>{children}</SessionLoader>
        </AuthProvider>
      </body>
    </html>
  );
}
