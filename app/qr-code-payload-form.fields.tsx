'use client';

import { useController } from 'react-hook-form';
import {
  IconCircleCheckFilled,
  IconAlertCircleFilled,
} from '@tabler/icons-react';
import {
  TextInput,
  Combobox,
  useCombobox,
  NumberInput,
  ScrollArea,
  Popover,
  Text,
  Box,
} from '@mantine/core';

import BANK_CODES from '@twpay-qrcode/generated/bank-codes.json';

import type { QRCodePayloadFormControl } from './qr-code-payload-form';
import { useDisclosure, useUncontrolled } from '@mantine/hooks';

export function BankCodeField(props: { control?: QRCodePayloadFormControl }) {
  const length = 3;
  const { field, fieldState, formState } = useController({
    control: props.control,
    name: 'bankCode',
    rules: {
      required: 'Required field',
      minLength: {
        value: length,
        message: `Must be ${length} characters`,
      },
      maxLength: {
        value: length,
        message: `Must be ${length} characters`,
      },
    },
  });
  const [value, handleChange] = useUncontrolled<string | number | undefined>({
    value: field.value,
    finalValue: '',
    onChange: field.onChange,
  });

  const combobox = useCombobox();

  const options = field.value
    ? BANK_CODES.filter((item) =>
        item.code.includes(field.value.toLowerCase().trim()),
      )
    : BANK_CODES;

  const canFindActiveOption = field.value && field.value.length === 3;

  const activeOption = (() => {
    if (!canFindActiveOption) return null;
    if (options.length !== 1) return null;

    return options[0];
  })();

  console.log('!!', fieldState.error);

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        handleChange(optionValue);
        combobox.closeDropdown();
      }}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          required
          label="Bank code"
          placeholder="xxx"
          name={field.name}
          inputMode="numeric"
          pattern="\d*"
          maxLength={length}
          minLength={length}
          value={value}
          ref={field.ref}
          rightSection={
            <BankCodeRecognizedIndicator
              disabled={!canFindActiveOption}
              activeItem={activeOption}
            />
          }
          error={
            (fieldState.isTouched || formState.isSubmitted) &&
            fieldState.error?.message
          }
          onChange={(event) => {
            handleChange(event.target.value);
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
          }}
          onClick={() => {
            combobox.openDropdown();
          }}
          onFocus={() => {
            combobox.openDropdown();
          }}
          onBlur={() => {
            combobox.closeDropdown();
            field.onBlur();
          }}
        />
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea.Autosize type="scroll" mah={240}>
            {options.length === 0 ? (
              <Combobox.Empty>Nothing found</Combobox.Empty>
            ) : (
              options.map((option) => (
                <Combobox.Option value={option.code} key={option.code}>
                  {option.code} - {option.name}
                </Combobox.Option>
              ))
            )}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

function BankCodeRecognizedIndicator(props: {
  activeItem: (typeof BANK_CODES)[number] | null;
  disabled: boolean;
}) {
  const { activeItem, disabled } = props;

  const [opened, { close, open }] = useDisclosure(false);

  if (disabled) return null;

  return (
    <Popover width={200} withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <Box
          c={activeItem ? 'green' : 'yellow'}
          onMouseEnter={open}
          onMouseLeave={close}
          renderRoot={(rootProps) =>
            activeItem ? (
              <IconCircleCheckFilled {...rootProps} />
            ) : (
              <IconAlertCircleFilled {...rootProps} />
            )
          }
        />
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="sm" c="dimmed">
          {activeItem ? (
            <>
              Recognized as{' '}
              <Text
                span
                fw={700}
                style={{ color: 'var(--mantine-color-text)' }}
              >
                {activeItem.name}
              </Text>
              .
            </>
          ) : (
            'Unrecognized.'
          )}
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
}

export function AccountNumberField(props: {
  control?: QRCodePayloadFormControl;
}) {
  const rules = { minLength: 1, maxLength: 16 };
  const { field, fieldState, formState } = useController({
    control: props.control,
    name: 'accountNo',
    rules: {
      required: 'Required field',
      minLength: {
        value: rules.minLength,
        message: `Must be at least ${rules.minLength} characters`,
      },
      maxLength: {
        value: rules.maxLength,
        message: `Must be at most ${rules.maxLength} characters`,
      },
    },
  });

  const [value, handleChange] = useUncontrolled<string | number | undefined>({
    value: field.value,
    onChange: field.onChange,
  });

  return (
    <TextInput
      required
      name={field.name}
      label="Account no."
      placeholder="xxxx xxxx xxxx xxxx"
      inputMode="numeric"
      pattern="\d*"
      ref={field.ref}
      minLength={rules.minLength}
      maxLength={rules.maxLength}
      value={value}
      onChange={(event) => {
        handleChange(event.target.value);
      }}
      error={
        (fieldState.isTouched || formState.isSubmitted) &&
        fieldState.error?.message
      }
      onBlur={field.onBlur}
    />
  );
}

export function AmountField(props: { control?: QRCodePayloadFormControl }) {
  const rules = { min: 1, max: 9_999_999 };

  const { field, fieldState } = useController({
    control: props.control,
    name: 'amount',
    rules: {
      min: {
        value: rules.min,
        message: `Must be greater than ${rules.min - 1}`,
      },
      max: {
        value: rules.max,
        message: `Must be less than ${rules.max + 1}`,
      },
    },
  });

  const [value, handleChange] = useUncontrolled<string | number | undefined>({
    value: field.value,
    onChange: (val) => {
      field.onChange(val);
    },
  });

  return (
    <NumberInput
      name={field.name}
      label="Amount"
      inputMode="numeric"
      placeholder="000,000"
      step={1}
      allowDecimal={false}
      allowNegative={false}
      prefix="NT$"
      thousandSeparator=","
      min={rules.min}
      max={rules.max}
      value={value}
      onChange={handleChange}
      error={fieldState.error?.message}
      onBlur={field.onBlur}
    />
  );
}

export function MessageField(props: { control?: QRCodePayloadFormControl }) {
  const rules = { maxLength: 19 };

  const { field, fieldState } = useController({
    control: props.control,
    name: 'message',
    rules: {
      maxLength: {
        value: rules.maxLength,
        message: `Must be at most ${rules.maxLength} characters`,
      },
    },
  });

  const [value, handleChange] = useUncontrolled<string | number | undefined>({
    value: field.value,
    onChange: field.onChange,
  });

  return (
    <TextInput
      name={field.name}
      label="Message"
      placeholder="A message for the recipient"
      value={value}
      onChange={(event) => {
        handleChange(event.target.value);
      }}
      error={fieldState.error?.message}
      maxLength={rules.maxLength}
      onBlur={field.onBlur}
    />
  );
}
