import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://codesync.dev';

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'CodeSync | AI-Powered Collaborative Cloud IDE',
    template: '%s | CodeSync'
  },
  description: 'CodeSync is the fastest way to build software together. A premium cloud IDE featuring real-time collaboration, built-in AI, and one-click deployments.',
  keywords: ['Cloud IDE', 'Real-time Collaboration', 'AI Coding Assistant', 'Remote Development', 'Pair Programming', 'Next.js', 'React'],
  authors: [{ name: 'CodeSync Team' }],
  creator: 'CodeSync',
  publisher: 'CodeSync Inc.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_URL,
    title: 'CodeSync | AI-Powered Collaborative Cloud IDE',
    description: 'CodeSync is the fastest way to build software together. A premium cloud IDE featuring real-time collaboration, built-in AI, and one-click deployments.',
    siteName: 'CodeSync',
    images: [{
      url: '/api/og',
      width: 1200,
      height: 630,
      alt: 'CodeSync - Build Software Together',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodeSync | AI-Powered Collaborative Cloud IDE',
    description: 'CodeSync is the fastest way to build software together. A premium cloud IDE featuring real-time collaboration, built-in AI, and one-click deployments.',
    images: ['/api/og'],
    creator: '@codesync',
    site: '@codesync',
  },
  appleWebApp: {
    capable: true,
    title: 'CodeSync',
    statusBarStyle: 'black-translucent',
  },
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body suppressHydrationWarning className="min-h-screen bg-[#000000] text-gray-100 font-sans selection:bg-[#8b5cf6]/30 selection:text-white">
        {children}
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}
