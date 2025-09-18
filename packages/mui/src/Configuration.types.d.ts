interface ConfigurationProps {
  config: Record<string, string>;
}

interface KeyValuePair<TValue> {
  key: string;
  value: TValue;
}
