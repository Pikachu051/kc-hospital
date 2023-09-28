import NavBar from '@/components/ui/NavBar'
import './globals.css'
import type { Metadata } from 'next'
import { Kanit } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'

const kanit = Kanit({ 
  weight: ['200', '300', '400', '500'],
  subsets: ['thai'] })

export const metadata: Metadata = {
  title: 'In-Patient Department System',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={kanit.className}>
        <div className='h-screen justify-center items-center flex flex-col'>
          <NavBar />
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  )
}
