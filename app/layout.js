import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Guest Getter - 50 Restaurant Growth Tweaks',
  description: 'Discover 50 research-backed restaurant growth strategies that increase revenue 15-30%. Interactive checklist with ROI calculator.',
  keywords: 'restaurant growth, restaurant marketing, increase revenue, restaurant tips, hospitality',
  authors: [{ name: 'Guest Getter' }],
  openGraph: {
    title: 'Guest Getter - 50 Restaurant Growth Tweaks',
    description: 'Discover 50 research-backed restaurant growth strategies that increase revenue 15-30%.',
    type: 'website',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 