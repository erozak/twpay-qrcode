import * as s from 'superstruct';

export const QRCodePayload = s.intersection([
  s.object({
    bankCode: s.pattern(s.string(), /^\d{3}$/),
    accountNo: s.pattern(s.string(), /^\d{1,16}$/),
  }),
  s.partial(
    s.object({
      amount: s.max(s.min(s.number(), 1), 9_999_999),
      message: s.pattern(s.string(), /^\w{0,19}$/i),
      timestamp: s.number(),
    })
  ),
]);

export type QRCodePayload = s.Infer<typeof QRCodePayload>;
