'use client';

import type { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

import type { QRCodePayload } from '@twpay-qrcode/models/qr-code-payload/schema';
import { fromQRCodePayloadToURL } from '@twpay-qrcode/models/qr-code-payload/to-url';

export interface TransferQRCodeImageProps
  extends Omit<
    DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
    'src' | 'alt'
  > {
  payload: QRCodePayload;
  /**
   * @range [99,547]
   */
  size?: number;
  /**
   * @default L
   */
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  /**
   * @default 1
   */
  margin?: number;
}

export function TransferQRCodeImage({
  payload,
  size: derivedSize = 400,
  margin: derivedMargin = 1,
  errorCorrectionLevel = 'L',
  ...imageProps
}: TransferQRCodeImageProps) {
  const url = fromQRCodePayloadToURL(payload);

  const alt = `QR code for transfering to account "${payload.bankCode}-${payload.accountNo}"`;

  const size = clampSize(derivedSize);
  const margin = clampMargin(derivedMargin);

  const qrcodeUrl = new URL('https://chart.googleapis.com/chart');
  qrcodeUrl.searchParams.set('cht', 'qr');
  qrcodeUrl.searchParams.set('chs', `${size}x${size}`);
  qrcodeUrl.searchParams.set(
    'chl',
    url
      .toString()
      // Some bank apps only support uppercase protocol
      .toUpperCase()
  );
  qrcodeUrl.searchParams.set('choe', 'UTF-8');
  qrcodeUrl.searchParams.set('chld', `${errorCorrectionLevel}|${margin}`);

  return <img {...imageProps} alt={alt} src={qrcodeUrl.toString()} />;
}

function clampSize(value: number): number {
  return Math.max(99, Math.min(547, value));
}

function clampMargin(value: number): number {
  return Math.max(1, value);
}
