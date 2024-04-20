'use client';

import {
  UseFormReturn,
  useForm,
  FormProvider,
  type DeepPartial,
  type Control,
} from 'react-hook-form';
import { ReactNode, type FormHTMLAttributes } from 'react';
import { Grid } from '@mantine/core';
import {
  AccountNumberField,
  AmountField,
  BankCodeField,
  MessageField,
} from './qr-code-payload-form.fields';

export interface QRCodePayloadFormValues {
  bankCode: string;
  accountNo: string;
  amount?: number;
  message?: string;
}

export type QRCodePayloadFormControl = Control<QRCodePayloadFormValues>;

export function initializeQRCodePayloadFormValues(
  source: DeepPartial<QRCodePayloadFormValues> = {},
): QRCodePayloadFormValues {
  return {
    bankCode: source.bankCode || '',
    accountNo: source.accountNo || '',
    amount: source.amount ?? undefined,
    message: source.message || '',
  };
}

export interface QRCodePayloadFormProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'children'> {
  initialValues?: DeepPartial<QRCodePayloadFormValues>;
  onSubmit(values: QRCodePayloadFormValues): void;
  actions?:
    | ReactNode
    | ((methods: UseFormReturn<QRCodePayloadFormValues>) => ReactNode);
}

export function QRCodePaylaodForm(props: QRCodePayloadFormProps) {
  const { onSubmit, actions, className, onReset, initialValues, ...formProps } =
    props;

  const form = useForm<QRCodePayloadFormValues>({
    defaultValues: initializeQRCodePayloadFormValues(initialValues),
    criteriaMode: 'all',
  });

  return (
    <FormProvider {...form}>
      <Grid
        gutter={{
          base: 'sm',
        }}
        renderRoot={(props) => (
          <form
            {...props}
            {...formProps}
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            onReset={(event) => {
              onReset?.(event);

              if (event.isDefaultPrevented()) return;

              form.reset();
            }}
          />
        )}
      >
        <Grid.Col span={{ base: 12, sm: 5 }}>
          <BankCodeField />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 7 }}>
          <AccountNumberField />
        </Grid.Col>
        <Grid.Col span={12}>
          <AmountField />
        </Grid.Col>
        <Grid.Col span={12}>
          <MessageField />
        </Grid.Col>
        {typeof actions === 'function' ? actions(form) : actions}
      </Grid>
    </FormProvider>
  );
}
