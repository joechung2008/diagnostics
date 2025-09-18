// Environment constants and helper to map them to friendly names.
export const Environment = {
  Public: 'https://hosting.portal.azure.net/api/diagnostics',
  Fairfax: 'https://hosting.azureportal.usgovcloudapi.net/api/diagnostics',
  Mooncake: 'https://hosting.azureportal.chinacloudapi.cn/api/diagnostics'
} as const

export type EnvironmentType = (typeof Environment)[keyof typeof Environment]

export function getEnvironmentName(
  environment: EnvironmentType | undefined
): string {
  switch (environment) {
    case Environment.Public:
      return 'Public Cloud'
    case Environment.Fairfax:
      return 'Fairfax'
    case Environment.Mooncake:
      return 'Mooncake'
    default:
      return 'Select environment'
  }
}

// Module intentionally small — it only provides Environment constants and a helper.
