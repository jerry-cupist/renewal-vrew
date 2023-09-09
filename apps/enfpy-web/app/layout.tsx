import { PropsWithChildren } from 'react'
import AuthProvider from '../context/AuthProvider'
import QueryClientProvider from '../context/QueryClientProvider'
import RequestMessageHandler from '../context/RequestMessageHandler'
import '../styles/globals.css'
import UserLayout from './UserLayout'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <QueryClientProvider>
            <RequestMessageHandler>
              <UserLayout>{children}</UserLayout>
            </RequestMessageHandler>
          </QueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
