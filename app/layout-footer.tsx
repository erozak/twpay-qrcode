'use client';

import { Button } from '@twpay-qrcode/ui';
import Link from 'next/link';

export function RootLayoutFooter() {
  return (
    <footer className="flex mt-8 justify-center">
      <Button variant="link" asChild>
        <Link href="https://github.com/erozak/twpay-qrcode" target="_blank">
          source
        </Link>
      </Button>
    </footer>
  );
}
