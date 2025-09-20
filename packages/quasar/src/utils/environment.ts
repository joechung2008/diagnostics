export const Environment = {
  Public: 'https://hosting.portal.azure.net/api/diagnostics',
  Fairfax: 'https://hosting.azureportal.usgovcloudapi.net/api/diagnostics',
  Mooncake: 'https://hosting.azureportal.chinacloudapi.cn/api/diagnostics',
} as const;

export const environmentOptions = Object.values(Environment).map((url) => ({
  text: getEnvironmentName(url),
  value: url,
}));

export function getEnvironmentName(env?: string) {
  switch (env) {
    case Environment.Public:
      return 'Public Cloud';
    case Environment.Fairfax:
      return 'Fairfax';
    case Environment.Mooncake:
      return 'Mooncake';
    default:
      return 'Select environment';
  }
}
