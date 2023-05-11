import { Inter } from 'next/font/google';

import '@/styles/globals.css';

import { AuthContext } from '@/contexts/AuthContext';
import { ToasterContext } from '@/contexts/ToasterContext';

import { ActiveStatus } from '@/components/ActiveStatus';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Messenger Clone',
  description: 'Messenger Clone',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
