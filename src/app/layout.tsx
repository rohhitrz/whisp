import React from 'react';
import { Inter, Outfit, DM_Sans } from 'next/font/google';
import '@/styles/globals.scss';
import { AppProvider } from '@/components/AppProvider';
import ClientWrapper from '../components/ClientWrapper';
import { metadata } from './metadata';

// Font imports
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' });

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} ${dmSans.variable}`}>
        <ClientWrapper>
          <AppProvider>
            {children}
          </AppProvider>
        </ClientWrapper>
      </body>
    </html>
  );
} 