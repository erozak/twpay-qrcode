import {
  UseFormReturn,
  useForm,
  type ControllerRenderProps,
  type DeepPartial,
} from 'react-hook-form';
import {
  ReactNode,
  type FormHTMLAttributes,
  type ChangeEventHandler,
} from 'react';

import { cn } from '@twpay-qrcode/utils';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Separator,
} from '@twpay-qrcode/components/ui';

export interface QRCodePayloadFormValues {
  bankCode: string;
  accountNo: string;
  amount?: number;
  note: string;
}

function initializeFormValues(
  values?: DeepPartial<QRCodePayloadFormValues>
): QRCodePayloadFormValues {
  return {
    bankCode: values?.bankCode ?? '',
    accountNo: values?.accountNo ?? '',
    amount: values?.amount ?? undefined,
    note: values?.note ?? '',
  };
}

export interface QRCodePayloadFormProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'children'> {
  initialValues?: DeepPartial<QRCodePayloadFormValues>;
  onSubmit(values: QRCodePayloadFormValues): void;
  children?:
    | ReactNode
    | ((methods: UseFormReturn<QRCodePayloadFormValues>) => ReactNode);
}

export function QRCodePaylaodForm(props: QRCodePayloadFormProps) {
  const {
    onSubmit,
    children,
    className,
    onReset,
    initialValues,
    ...formProps
  } = props;

  const form = useForm<QRCodePayloadFormValues>({
    defaultValues: initializeFormValues(initialValues),
  });

  return (
    <Form
      {...formProps}
      reactHookForm={form}
      onSubmit={form.handleSubmit(onSubmit)}
      onReset={(event) => {
        onReset?.(event);

        if (event.isDefaultPrevented()) return;

        form.reset(initializeFormValues());
      }}
      className={cn(
        'grid grid-cols-6 grid-flow-row gap-4 text-right',
        className
      )}
    >
      <div className="col-span-2">
        <FormField
          control={form.control}
          name="bankCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank code</FormLabel>
              <FormControl>
                <Input
                  placeholder="xxx"
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
          name="accountNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account no.</FormLabel>
              <FormControl>
                <Input
                  placeholder="xxxx xxxx xxxx xxxx"
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
      <div className="col-span-6 flex gap-4 items-center">
        <span className="h-[1px] flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">Advanced Options</span>
      </div>
      <div className="col-span-6">
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
                  {...intergerMask(field)}
                  inputMode="numeric"
                  className="text-right"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-6">
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="A note for the recipient"
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

function intergerMask(config: {
  value: string | number | undefined | null;
  onChange: ControllerRenderProps['onChange'];
  locale?: string | string[];
}): {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
} {
  let input: number | null;
  if (config.value == null) {
    input = null;
  } else {
    input = Number(config.value);

    if (isNaN(input)) {
      input = null;
    }
  }

  const formattedValue =
    input == null
      ? ''
      : Intl.NumberFormat(config.locale).format(input).toString();

  return {
    value: formattedValue,
    onChange(event) {
      if (!event.target.value) {
        return config.onChange('');
      }

      const parsedValue = parseLocaleNumber(event.target.value, config.locale);

      if (/\./g.test(parsedValue)) return;

      const parsedValueNumber = Number(parsedValue);

      if (Number.isNaN(parsedValueNumber)) return;

      return config.onChange(parsedValueNumber);
    },
  };
}

function parseLocaleNumber(
  stringNumber: string,
  locale?: string | string[]
): string {
  var thousandSeparator = Intl.NumberFormat(locale)
    .format(11111)
    .replace(/\p{Number}/gu, '');
  var decimalSeparator = Intl.NumberFormat(locale)
    .format(1.1)
    .replace(/\p{Number}/gu, '');

  return stringNumber
    .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
    .replace(new RegExp('\\' + decimalSeparator), '.');
}
