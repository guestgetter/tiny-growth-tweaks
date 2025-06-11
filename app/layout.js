import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '52 Tiny Tweaks - One Restaurant Growth Strategy Each Week',
  description: 'Transform your restaurant with 52 research-backed tiny tweaks. One manageable strategy per week for a full year of growth.',
  keywords: 'restaurant growth, weekly restaurant tips, restaurant marketing, increase revenue, restaurant strategies, hospitality, 52 weeks',
  authors: [{ name: 'Guest Getter' }],
  openGraph: {
    title: '52 Tiny Tweaks - One Restaurant Growth Strategy Each Week',
    description: 'Transform your restaurant with 52 research-backed tiny tweaks. One manageable strategy per week for a full year of growth.',
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