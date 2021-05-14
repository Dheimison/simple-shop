import { Stack } from '@fluentui/react';

export function NotFound() {
  return (
    <Stack
      tokens={{ padding: 10 }}
      horizontalAlign="center"
      verticalAlign="center"
      grow
    >
      <h1>Página não encontrada!</h1>
    </Stack>
  );
}
