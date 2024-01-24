import { UseFormReturn, useForm } from 'react-hook-form';
import { ReactNode } from 'react';

import { type QRCodePayload } from '@twpay-qrcode/models/qr-code-payload/schema';
import { cn } from '@twpay-qrcode/utils';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
} from './ui';

export interface QRCodePayloadFormValues extends QRCodePayload {}

export interface QRCodePayloadFormProps {
  style?: React.CSSProperties;
  className?: string;
  onSubmit(values: QRCodePayloadFormValues): void;
  children?:
    | ReactNode
    | ((methods: UseFormReturn<QRCodePayloadFormValues>) => ReactNode);
}

export function QRCodePaylaodForm(props: QRCodePayloadFormProps) {
  const { onSubmit, children, style, className } = props;

  const form = useForm<QRCodePayloadFormValues>({
    defaultValues: {
      bankCode: '',
      accountNo: '',
      amount: undefined,
      message: undefined,
    },
  });

  return (
    <Form
      reactHookForm={form}
      onSubmit={form.handleSubmit(onSubmit)}
      style={style}
      className={cn(
        'grid grid-cols-4 grid-flow-row gap-4 text-right',
        className
      )}
    >
      <div className="col-span-1">
        <FormField
          control={form.control}
          name="bankCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank code</FormLabel>
              <FormControl>
                <Input
                  placeholder="000"
                  {...field}
                  inputMode="numeric"
                  pattern="\d*"
                  className="text-right"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-3">
        <FormField
          control={form.control}
          name="accountNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account no.</FormLabel>
              <FormControl>
                <Input
                  placeholder="0000 0000 0000 0000"
                  {...field}
                  inputMode="numeric"
                  pattern="\d*"
                  className="text-right"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-4">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  placeholder="0,000"
                  {...field}
                  inputMode="numeric"
                  pattern="\d*"
                  className="text-right"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-4">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Input
                  placeholder="000"
                  {...field}
                  maxLength={19}
                  className="text-right"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {typeof children === 'function' ? children(form) : children}
    </Form>
  );
}
