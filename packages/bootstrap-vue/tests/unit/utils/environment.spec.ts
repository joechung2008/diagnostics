import { describe, expect, it } from "vitest";
import {
  Environment,
  environmentOptions,
  getEnvironmentName
} from "../../../app/utils/environment";

describe("environment", () => {
  describe("Environment constants", () => {
    it("should have correct URLs", () => {
      expect(Environment.Public).toBe("https://hosting.portal.azure.net/api/diagnostics");
      expect(Environment.Fairfax).toBe(
        "https://hosting.azureportal.usgovcloudapi.net/api/diagnostics"
      );
      expect(Environment.Mooncake).toBe(
        "https://hosting.azureportal.chinacloudapi.cn/api/diagnostics"
      );
    });
  });

  describe("environmentOptions", () => {
    it("should generate options from Environment values", () => {
      expect(environmentOptions).toHaveLength(3);
      expect(environmentOptions).toEqual(
        expect.arrayContaining([
          { text: "Public Cloud", value: Environment.Public },
          { text: "Fairfax", value: Environment.Fairfax },
          { text: "Mooncake", value: Environment.Mooncake }
        ])
      );
    });
  });

  describe("getEnvironmentName", () => {
    it('should return "Public Cloud" for Public environment', () => {
      expect(getEnvironmentName(Environment.Public)).toBe("Public Cloud");
    });

    it('should return "Fairfax" for Fairfax environment', () => {
      expect(getEnvironmentName(Environment.Fairfax)).toBe("Fairfax");
    });

    it('should return "Mooncake" for Mooncake environment', () => {
      expect(getEnvironmentName(Environment.Mooncake)).toBe("Mooncake");
    });

    it('should return "Select environment" for unknown environment', () => {
      expect(getEnvironmentName("unknown")).toBe("Select environment");
      expect(getEnvironmentName(undefined)).toBe("Select environment");
      expect(getEnvironmentName("")).toBe("Select environment");
    });
  });
});
