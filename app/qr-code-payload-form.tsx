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
import { Form, Input, TextField } from '@twpay-qrcode/components/ui';

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
        'grid grid-cols-12 grid-flow-row gap-4 text-right',
        className
      )}
    >
      <div className="sm:col-span-5 col-span-12">
        <TextField
          control={form.control}
          name="bankCode"
          label="Bank code"
          input={
            <Input
              placeholder="xxx"
              inputMode="numeric"
              pattern="\d*"
              className="text-right"
            />
          }
        />
      </div>
      <div className="sm:col-span-7 col-span-12">
        <TextField
          control={form.control}
          name="accountNo"
          label="Account no."
          input={
            <Input
              placeholder="xxxx xxxx xxxx xxxx"
              inputMode="numeric"
              pattern="\d*"
              className="text-right"
            />
          }
        />
      </div>
      <div className="col-span-12 flex gap-4 items-center">
        <span className="h-[1px] flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">Advanced Options</span>
      </div>
      <div className="col-span-12">
        <TextField
          control={form.control}
          name="amount"
          label="Amount"
          input={({ field }) => (
            <Input
              placeholder="0,000"
              {...intergerMask(field)}
              inputMode="numeric"
              className="text-right"
            />
          )}
        />
      </div>
      <div className="col-span-12">
        <TextField
          control={form.control}
          name="note"
          label="Note"
          input={
            <Input
              placeholder="A note for the recipient"
              maxLength={19}
              className="text-right"
            />
          }
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
