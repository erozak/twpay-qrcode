'use client';

import { useController } from 'react-hook-form';

import { TextInput, Combobox, useCombobox, NumberInput } from '@mantine/core';
import type { QRCodePayloadFormControl } from './qr-code-payload-form';

export function BankCodeField(props: { control?: QRCodePayloadFormControl }) {
  const length = 3;
  const { field, fieldState } = useController({
    control: props.control,
    name: 'bankCode',
    rules: {
      minLength: length,
      maxLength: length,
    },
  });
  const combobox = useCombobox();

  const knownCodes: string[] = [];

  const shouldFilterOptions =
    field.value && !knownCodes.some((item) => item === field.value);

  const options = shouldFilterOptions
    ? knownCodes.filter((item) =>
        item.toLowerCase().includes(field.value.toLowerCase().trim()),
      )
    : knownCodes;

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        field.onChange(optionValue);
        combobox.closeDropdown();
      }}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          required
          label="Bank code"
          placeholder="xxx"
          pattern="\d*"
          maxLength={length}
          minLength={length}
          value={field.value}
          error={fieldState.error?.message}
          onChange={(event) => {
            field.onChange(event);
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
        />
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length === 0 ? (
            <Combobox.Empty>Nothing found</Combobox.Empty>
          ) : (
            options.map((option) => (
              <Combobox.Option value={option} key={option}>
                {option}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export function AccountNumberField(props: {
  control?: QRCodePayloadFormControl;
}) {
  const rules = { minLength: 1, maxLength: 16 };
  const { field, fieldState } = useController({
    control: props.control,
    name: 'accountNo',
    rules,
  });

  return (
    <TextInput
      required
      name="accountNo"
      label="Account no."
      placeholder="xxxx xxxx xxxx xxxx"
      inputMode="numeric"
      pattern="\d*"
      minLength={rules.minLength}
      maxLength={rules.maxLength}
      value={field.value}
      onChange={field.onChange}
      error={fieldState.error?.message}
    />
  );
}

export function AmountField(props: { control?: QRCodePayloadFormControl }) {
  const rules = { min: 1, max: 9_999_999 };

  const { field, fieldState } = useController({
    control: props.control,
    name: 'amount',
    rules: rules,
  });

  return (
    <NumberInput
      name="amount"
      label="Amount"
      inputMode="numeric"
      placeholder="000,000"
      min={rules.min}
      max={rules.max}
      value={field.value}
      onChange={field.onChange}
      error={fieldState.error?.message}
    />
  );
}

export function MessageField(props: { control?: QRCodePayloadFormControl }) {
  const rules = { maxLength: 19 };

  const { field, fieldState } = useController({
    control: props.control,
    name: 'message',
    rules,
  });

  return (
    <TextInput
      name="message"
      label="Message"
      placeholder="A message for the recipient"
      value={field.value}
      onChange={field.onChange}
      error={fieldState.error?.message}
      maxLength={rules.maxLength}
    />
  );
}
