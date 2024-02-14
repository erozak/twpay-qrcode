'use client';

import QRCode, { QRCodeProps } from 'react-qr-code';

import type { QRCodePayload } from '@twpay-qrcode/models/qr-code-payload/schema';
import { fromQRCodePayloadToURL } from '@twpay-qrcode/models/qr-code-payload/to-url';

export interface TransferQRCodeImageProps
  extends Omit<QRCodeProps, 'value' | 'ref'> {
  payload: QRCodePayload;
}

export function TransferQRCodeImage({
  payload,
  ...qrCodeProps
}: TransferQRCodeImageProps) {
  const url = fromQRCodePayloadToURL(payload);

  return (
    <QRCode
      {...qrCodeProps}
      fgColor="currentColor"
      bgColor="transparent"
      value={url
        .toString()
        // Some bank apps only support uppercase protocol
        .toUpperCase()}
    />
  );
}
