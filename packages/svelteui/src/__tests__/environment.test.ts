import { describe, it, expect } from 'vitest'
import { Environment, getEnvironmentName } from '../environment'

describe('environment', () => {
  describe('Environment', () => {
    it('should export correct environment URLs', () => {
      expect(Environment.Public).toBe(
        'https://hosting.portal.azure.net/api/diagnostics'
      )
      expect(Environment.Fairfax).toBe(
        'https://hosting.azureportal.usgovcloudapi.net/api/diagnostics'
      )
      expect(Environment.Mooncake).toBe(
        'https://hosting.azureportal.chinacloudapi.cn/api/diagnostics'
      )
    })
  })

  describe('getEnvironmentName', () => {
    it('should return correct name for Public environment', () => {
      expect(getEnvironmentName(Environment.Public)).toBe('Public Cloud')
    })

    it('should return correct name for Fairfax environment', () => {
      expect(getEnvironmentName(Environment.Fairfax)).toBe('Fairfax')
    })

    it('should return correct name for Mooncake environment', () => {
      expect(getEnvironmentName(Environment.Mooncake)).toBe('Mooncake')
    })

    it('should return default message for undefined environment', () => {
      expect(getEnvironmentName(undefined)).toBe('Select environment')
    })
  })
})
