import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'CareerAutomate - AI-Powered Job Search & Resume Builder',
  description: 'Automate your job search with AI-powered resume generation, project descriptions, and smart job matching.',
  generator: 'CareerAutomate',
  icons: {
    icon: 'https://i.postimg.cc/v80x21Lm/CA_logo_banner.jpg',
    shortcut: 'https://i.postimg.cc/v80x21Lm/CA_logo_banner.jpg',
    apple: 'https://i.postimg.cc/v80x21Lm/CA_logo_banner.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
