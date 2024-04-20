'use client';

import Link from 'next/link';
import {
  AppShell as MantineAppShell,
  Title,
  Center,
  Anchor,
  Container,
  Button,
} from '@mantine/core';
import type { ReactNode } from 'react';

export interface AppShellProps {
  header: ReactNode;
  children: ReactNode;
}

export function AppShell(props: AppShellProps) {
  const { header, children } = props;

  return (
    <MantineAppShell header={{ height: 64 }}>
      <MantineAppShell.Header withBorder={false}>
        <Container py="md">
          <Title order={1} size="h3">
            {header}
          </Title>
        </Container>
      </MantineAppShell.Header>
      <MantineAppShell.Main>{children}</MantineAppShell.Main>
      <MantineAppShell.Footer withBorder={false}>
        <Container py="md">
          <Center>
            <Button
              component={Link}
              href="https://github.com/erozak/twpay-qrcode"
              target="_blank"
              variant="white"
              color="gray"
              size="xs"
            >
              source
            </Button>
          </Center>
        </Container>
      </MantineAppShell.Footer>
    </MantineAppShell>
  );
}
