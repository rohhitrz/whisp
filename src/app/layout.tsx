import '@/styles/globals.scss';
import type { Metadata } from 'next';
import { AppProvider } from '@/components/AppProvider';
import ClientWrapper from '../components/ClientWrapper';

export const metadata: Metadata = {
  title: 'Whisp X | Minimalist Messaging',
  description: 'A beautifully minimal messaging experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>
          <AppProvider>
            {children}
          </AppProvider>
        </ClientWrapper>
      </body>
    </html>
  );
} 