import { Slot } from '@radix-ui/react-slot';
import type { ReactElement, ReactNode } from 'react';
import type {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  type FormFieldProps,
} from './form';
import { Input } from './input';

export interface TextFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<FormFieldProps<TFieldValues, TName>, 'render'> {
  label?: ReactNode;
  input?:
    | ReactElement
    | ((context: {
        field: ControllerRenderProps<TFieldValues, TName>;
      }) => ReactElement);
}

export function TextField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: TextFormFieldProps<TFieldValues, TName>) {
  const { label, input = <Input />, ...fieldProps } = props;

  return (
    <FormField<TFieldValues, TName>
      {...fieldProps}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {typeof input === 'function' ? (
              input({ field })
            ) : (
              <Slot {...field}>{input}</Slot>
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
