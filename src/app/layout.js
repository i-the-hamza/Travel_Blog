import { Inter } from 'next/font/google';
import './globals.css';
import { NextAuthProvider } from '@/components/NextAuthProvider';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Travel Blog - Explore the World',
  description: 'Join me on my travels around the world, with stunning photos and detailed guides from each country I visit.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextAuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex flex-col min-h-screen">
              <main className="flex-grow">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
