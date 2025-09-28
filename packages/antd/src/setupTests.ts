import "@testing-library/jest-dom/vitest";

/**
 * Mock window.matchMedia for Ant Design and jsdom tests.
 * Ant Design components use matchMedia for responsive features.
 */
if (!window.matchMedia) {
  window.matchMedia = function () {
    return {
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      onchange: null,
      dispatchEvent: () => false,
      media: "",
    };
  };
}

/**
 * Mock window.getComputedStyle for Ant Design Table and jsdom.
 * Ant Design Table and other components rely on getComputedStyle, which is not implemented in jsdom.
 */
// Always mock to provide deterministic behavior and make spying reliable in tests.
// Return string values for any property access and support getPropertyValue().
window.getComputedStyle = function (_element?: Element): CSSStyleDeclaration {
  // mark as used for linters
  void _element;
  const styleObject: Partial<CSSStyleDeclaration> = {};

  // Create a proxy to return empty strings for any style property reads
  const proxy = new Proxy(styleObject, {
    get(target, prop: string | symbol) {
      // mark as used for linters
      void target;

      if (prop === "getPropertyValue") {
        return (name: string) =>
          (styleObject as Record<string, string>)[name] || "";
      }

      if (prop === "setProperty") {
        return (name: string, value: string) => {
          (styleObject as Record<string, string>)[name] = value;
        };
      }

      if (prop === "removeProperty") {
        return (name: string) => {
          const current = (styleObject as Record<string, string>)[name] || "";
          delete (styleObject as Record<string, string>)[name];
          return current;
        };
      }

      if (prop === "item") {
        return (_index: number) => {
          void _index;
          return "";
        };
      }

      if (prop === "length") {
        return 0;
      }

      // Return empty string by default for any other property access
      return "";
    },
  });

  return proxy as CSSStyleDeclaration;
};
