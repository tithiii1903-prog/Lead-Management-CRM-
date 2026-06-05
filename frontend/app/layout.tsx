import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileHeader } from '@/components/layout/MobileHeader';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'LeadFlow CRM — Lead Management Dashboard',
  description: 'A modern, premium lead management CRM for small businesses. Track, manage and convert your leads effortlessly.',
  keywords: ['CRM', 'lead management', 'sales', 'dashboard'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Providers>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
              <MobileHeader />
              <main
                className="flex-1 overflow-y-auto"
                style={{ background: 'linear-gradient(135deg, #0b1e24 0%, #0f2530 50%, #0b1e24 100%)' }}
              >
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
