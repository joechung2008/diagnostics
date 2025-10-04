import { MantineProvider } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";

interface ThemedMantineProviderProps {
  children: React.ReactNode;
}

export function ThemedMantineProvider({
  children,
}: ThemedMantineProviderProps) {
  const colorScheme = useColorScheme();

  return (
    <MantineProvider forceColorScheme={colorScheme}>{children}</MantineProvider>
  );
}
