"use client";

import {
  useMantineColorScheme,
  useComputedColorScheme,
  Button,
  ActionIcon,
} from "@mantine/core";

export function ToggleTheme() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const toggleTheme = () => {
    if (computedColorScheme === "dark") {
      setColorScheme("light");
    } else {
      setColorScheme("dark");
    }
  };

  return (
    <ActionIcon
      size="xl"
      variant="transparent"
      radius={999}
      onClick={toggleTheme}
    >
      <div className="text-4xl">
        {computedColorScheme === "light" ? "🌚" : "🌞"}
      </div>
    </ActionIcon>
  );
}
