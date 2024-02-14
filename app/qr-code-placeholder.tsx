'use client';

import type { HTMLAttributes } from 'react';
import ReactQRCode from 'react-qr-code';

import { cn } from '@twpay-qrcode/utils';

export interface QRCodePlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

export function QRCodePlaceholder({
  children,
  className,
  size,
  ...rootProps
}: QRCodePlaceholderProps) {
  return (
    <div
      {...rootProps}
      className={cn('relative flex items-center justify-center', className)}
    >
      <div className="text-muted">
        <ReactQRCode
          size={size}
          value="QR code placeholder"
          fgColor="currentColor"
          bgColor="transparent"
        />
      </div>
      <div className="absolute inset-0 p-4 flex justify-center items-center text-muted-foreground">
        <span className=" px-4 py-2 text-center text-sm">{children}</span>
      </div>
    </div>
  );
}
