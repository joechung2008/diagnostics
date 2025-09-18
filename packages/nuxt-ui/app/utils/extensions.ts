import type { Extension, ExtensionInfo, KeyedNavLink } from "~/types";

export function isExtensionInfo(
  value: Extension | undefined
): value is ExtensionInfo {
  return (
    value !== undefined && typeof value === "object" && "extensionName" in value
  );
}

export function byKey(a: KeyedNavLink, b: KeyedNavLink): number {
  return a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
}

export function toNavLink({ extensionName }: ExtensionInfo): KeyedNavLink {
  return {
    key: extensionName,
    name: extensionName,
  };
}

export function when<T>(condition: unknown, value: T): T[] {
  return condition ? [value] : [];
}
