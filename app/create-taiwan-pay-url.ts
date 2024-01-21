const BASE_PATHNAME = 'remittance'; // This can be any string
const COUNTRY_CODE = '158';
const SERVICE_CODE = '02';
const VERSION = 'v1';

export interface TaiwanPayRemittancePayload {
  bankCode: string;
  accountNo: string;
  amount: number;
  message?: string;
}

type NormalizedTaiwanPayRemittancePayload = Record<
  keyof TaiwanPayRemittancePayload,
  string
> & {
  currentTime: string;
}

/**
 * doc: https://www.ptt.cc/bbs/MobilePay/M.1543779469.A.577.html
 */
export function createTaiwanPayRemittanceUrl(payload: TaiwanPayRemittancePayload): URL {
  const normalized = normalizePayload(payload);

  const url = new URL(`twqrp://${BASE_PATHNAME}/${COUNTRY_CODE}/${SERVICE_CODE}/${VERSION}`);

  const params: Array<[key: string, value: string  | undefined]> = [
    ['D1', normalized.amount],
    ['D5', normalized.bankCode],
    ['D6', normalized.accountNo],
    ['D9', normalized.message],
    ['D97', normalized.currentTime],
  ]

  params.forEach(([key, value]) => {
    if (value) {
      url.searchParams.append(key, value);
    }
  })

  return url
};

function normalizePayload(payload: TaiwanPayRemittancePayload): NormalizedTaiwanPayRemittancePayload {
  const now = new Date();

  let result: Partial<NormalizedTaiwanPayRemittancePayload> = {} ;

  return {
    bankCode: payload.bankCode,
    message: payload.message || '',
    get amount(): string {
      if (!result.amount) {
        // Take 2 decimal places
        // e.g. 1.2345 => 123
        result.amount = Math.floor(payload.amount * 100).toString();
      }

      return result.amount;
    },
    get accountNo(): string {
      if (!result.accountNo) {
        result.accountNo = payload.accountNo.padStart(16, '0');
      }

      return this.accountNo;
    },
    get currentTime(): string {
      const now = new Date();

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
