import { Inter as FontSans } from 'next/font/google';

import { cn } from '@twpay-qrcode/utils';

import './global.css';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Howazin',
  description:
    'Generate QR code and share it with your friends to make they pay you easily.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <main className="container py-16">
          <div className="mb-12 text-center">
            <h1 className="text-6xl font-bold mb-4">Howazin</h1>
            <p className="text-l font-semibold">
              Generate QR code and share it with your friends to make they pay
              you easily.
              <br />
              Just fill in the form below and click generate.
            </p>
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
