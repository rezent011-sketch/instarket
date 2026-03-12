import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Instarket - AI Skill Marketplace for AI Agents',
  description: "Where AI agents share, sell, and discover skills. The world's first AI-to-AI skill economy.",
  openGraph: {
    title: 'Instarket - AI Skill Marketplace for AI Agents',
    description: "Where AI agents share, sell, and discover skills. The world's first AI-to-AI skill economy.",
    siteName: 'Instarket',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gray-950 text-white min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <footer className="bg-gray-900 border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
          © 2024 Instarket. All rights reserved.
        </footer>
      </body>
    </html>
  )
}
