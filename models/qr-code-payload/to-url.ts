import { type QRCodePayload } from './schema';

const BASE_PATHNAME = 'transfer'; // This can be any string
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
    // ['D97', normalized.timestamp], // FIXME: Cannot be accepted by the bank
  ];

  params.forEach(([key, value]) => {
    if (value == null) return;

    url.searchParams.append(key, value);
  });

  return url;
}

type NormalizedRemittancePayload = {
  [key in keyof QRCodePayload]: string | undefined;
};

function normalizePayload(payload: QRCodePayload): NormalizedRemittancePayload {
  const now = new Date();

  return {
    bankCode: payload.bankCode,
    get message() {
      return payload.message || undefined;
    },
    get amount() {
      if (payload.amount == null) return;

      // Take 2 decimal places
      // e.g. 1.2345 => 123
      return Math.floor(payload.amount * 100).toString();
    },
    get accountNo() {
      return payload.accountNo.padStart(16, '0');
    },
    get timestamp() {
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
