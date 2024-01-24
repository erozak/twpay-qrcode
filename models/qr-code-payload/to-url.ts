import { type QRCodePayload } from './schema';

const BASE_PATHNAME = 'remittance'; // This can be any string
const COUNTRY_CODE = '158';
const SERVICE_CODE = '02';
const VERSION = 'v1';

/**
 * Convert a QR code payload to a URL.
 *
 * @see https://www.ptt.cc/bbs/MobilePay/M.1543779469.A.577.html
 */
export function fromQRCodePayloadToURL(payload: QRCodePayload): URL {
  const normalized = normalizePayload(payload);

  const url = new URL(
    `twqrp://${BASE_PATHNAME}/${COUNTRY_CODE}/${SERVICE_CODE}/${VERSION}`
  );

  const params: Array<[key: string, value: string | undefined]> = [
    ['D1', normalized.amount],
    ['D5', normalized.bankCode],
    ['D6', normalized.accountNo],
    ['D9', normalized.message],
    ['D97', normalized.timestamp],
  ];

  params.forEach(([key, value]) => {
    if (value) {
      url.searchParams.append(key, value);
    }
  });

  return url;
}

type NormalizedRemittancePayload = {
  [key in keyof QRCodePayload]: string;
};

function normalizePayload(payload: QRCodePayload): NormalizedRemittancePayload {
  const now = new Date();

  return {
    bankCode: payload.bankCode,
    message: payload.message,
    get amount(): string {
      // Take 2 decimal places
      // e.g. 1.2345 => 123
      return Math.floor(payload.amount * 100).toString();
    },
    get accountNo(): string {
      return payload.accountNo.padStart(16, '0');
    },
    get timestamp(): string {
      return [
        now.getFullYear(),
        ...[
          now.getMonth() + 1,
          now.getDate(),
          now.getHours(),
          now.getMinutes(),
          now.getSeconds(),
        ].map((value) => value.toString().padStart(2, '0')),
      ].join('');
    },
  };
}
