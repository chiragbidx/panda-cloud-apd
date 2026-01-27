import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { initDevErrorBridge } from './dev/devErrorBridge';

export const metadata: Metadata = {
  title: 'Next.js SaaS Starter',
  description: 'Get started quickly with Next.js, Postgres, and Stripe.'
};

export const viewport: Viewport = {
  maximumScale: 1
};

const manrope = Manrope({ subsets: ['latin'] });

if (typeof window !== 'undefined') {
  initDevErrorBridge();
}

if (process.env.NODE_ENV === 'development') {
  throw new Error('Simple generated error for testing');
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.className}>
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
}
