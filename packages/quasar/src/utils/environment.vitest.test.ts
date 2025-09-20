import { describe, it, expect } from 'vitest';
import { Environment, getEnvironmentName } from './environment';

describe('environment utils', () => {
  describe('getEnvironmentName', () => {
    it('should return "Public Cloud" for Public environment', () => {
      expect(getEnvironmentName(Environment.Public)).toBe('Public Cloud');
    });

    it('should return "Fairfax" for Fairfax environment', () => {
      expect(getEnvironmentName(Environment.Fairfax)).toBe('Fairfax');
    });

    it('should return "Mooncake" for Mooncake environment', () => {
      expect(getEnvironmentName(Environment.Mooncake)).toBe('Mooncake');
    });

    it('should return "Select environment" for unknown environment', () => {
      expect(getEnvironmentName('unknown')).toBe('Select environment');
    });

    it('should return "Select environment" for undefined', () => {
      expect(getEnvironmentName(undefined)).toBe('Select environment');
    });
  });
});
