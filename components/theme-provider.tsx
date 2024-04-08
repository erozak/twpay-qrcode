import { MantineProvider } from '@mantine/core';
import type { ReactNode } from 'react';

import '@mantine/core/styles.css';

const DEAFULT_FONTS: string[] = [
  'ui-sans-serif',
  'system-ui',
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Helvetica Neue',
  'Arial',
  'Noto Sans',
  'sans-serif',
  'Apple Color Emoji',
  'Segoe UI Emoji',
  'Segoe UI Symbol',
  'Noto Color Emoji',
];

export interface ThemeProviderProps {
  font: string;
  children: ReactNode;
}

export function ThemeProvider(props: ThemeProviderProps) {
  const { font, ...restProps } = props;

  const fontFamily = [font, ...DEAFULT_FONTS].join(',');

  return (
    <MantineProvider
      {...restProps}
      theme={{
        fontFamily,
        fontFamilyMonospace: fontFamily,
        headings: { fontFamily },
      }}
    />
  );
}
