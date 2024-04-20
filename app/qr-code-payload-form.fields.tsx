'use client';

import { useMemo } from 'react';
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
import { useDisclosure } from '@mantine/hooks';

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
          value={field.value || ''}
          rightSection={
            <BankCodeRecognizedIndicator
              disabled={!canFindActiveOption}
              activeItem={activeOption}
            />
          }
          error={fieldState.error?.message}
          onChange={(event) => {
            field.onChange(event);
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
          }}
          inputMode="numeric"
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
      value={field.value || ''}
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
      value={field.value || ''}
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
      value={field.value || ''}
      onChange={field.onChange}
      error={fieldState.error?.message}
      maxLength={rules.maxLength}
    />
  );
}
