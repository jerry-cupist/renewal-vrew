import { PropsWithChildren } from 'react'
import AuthProvider from '../context/AuthProvider'
import QueryClientProvider from '../context/QueryClientProvider'
import RequestMessageHandler from '../context/RequestMessageHandler'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <QueryClientProvider>
            <RequestMessageHandler>{children}</RequestMessageHandler>
          </QueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
