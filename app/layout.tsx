import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import BackToTop from '@/components/BackToTop'

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
      <body className={`${inter.className} bg-[#0d0d0d] text-white min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <BackToTop />
      </body>
    </html>
  )
}
