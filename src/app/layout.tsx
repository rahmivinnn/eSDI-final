import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gaple Domino Game',
  description: 'A 4-player Gaple (Domino) game built with Next.js',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} no-select`}>
        {/* Portrait warning for mobile */}
        <div className="portrait-warning">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">📱</div>
            <h2 className="text-2xl font-bold mb-4">Rotate Your Device</h2>
            <p className="text-lg text-gray-300">
              This game is best played in landscape mode
            </p>
          </div>
        </div>
        
        {/* Main game content */}
        <div className="landscape-only">
          {children}
        </div>
      </body>
    </html>
  )
}
