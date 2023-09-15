import NavBar from '@/components/ui/NavBar'
import './globals.css'
import type { Metadata } from 'next'
import { Kanit } from 'next/font/google'

const kanit = Kanit({ 
  weight: '500',
  subsets: ['thai'] })

export const metadata: Metadata = {
  title: 'Bahn Bahn',
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
        <main className='h-screen flex flex-col justify-center items-center'>
          <NavBar />
          {children}
        </main>
      </body>
    </html>
  )
}
