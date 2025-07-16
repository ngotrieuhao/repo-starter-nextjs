import './globals.css';
import { Providers } from './providers';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Repo Starter - Next.js App',
  description: 'A modern Next.js application with TypeScript and TailwindCSS',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta charSet='utf-8' />
      </head>
      <body className='min-h-screen bg-background font-sans antialiased'>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
