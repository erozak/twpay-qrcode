import * as s from 'superstruct';

export const TaiwainPayQRCodePayload = s.intersection([
  s.object({
    bankCode: s.pattern(s.string(), /^\d{3}$/),
    accountNo: s.pattern(s.string(), /^\d{1,16}$/),
    amount: s.max(s.min(s.number(), 1), 9_999_999),
  }),
  s.partial(s.object({
    message: s.pattern(s.string(), /^\w{0,19}$/i),
  }))
])

export type TaiwainPayQRCodePayload = s.Infer<typeof TaiwainPayQRCodePayload>;
