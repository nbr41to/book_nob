'use client';

import {
  useMantineColorScheme,
  useComputedColorScheme,
  Button,
} from '@mantine/core';

export function ToggleTheme() {
  const {setColorScheme} = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  const toggleTheme = () => {
    if (computedColorScheme === 'dark') {
      setColorScheme('light');
    } else {
      setColorScheme('dark');
    }
  };

  return (
    <Button onClick={toggleTheme}>
      {computedColorScheme === 'light' ? 'light' : 'dark'}
    </Button>
  );
}
