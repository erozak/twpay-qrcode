import { ColorSchemeScript } from '@mantine/core';

import { Inter as FontSans } from 'next/font/google';
import { ThemeProvider } from '@twpay-qrcode/components/theme-provider';

// import { RootLayoutFooter } from './layout-footer';
import { AppShell } from './app-shell';

const fontSans = FontSans({
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
      <head>
        <ColorSchemeScript />
      </head>
      <body className={fontSans.variable}>
        <ThemeProvider font={fontSans.style.fontFamily}>
          <AppShell header="Howazin">
            {/* <main className="container xl:py-22 lg:py-16 sm:py-10 py-6">
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
            <RootLayoutFooter /> */}
            {children}
          </AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
