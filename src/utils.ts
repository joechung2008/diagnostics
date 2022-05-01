import type { KeyedNavLink } from './types';

export function isExtensionInfo(value: Extension): value is ExtensionInfo {
  return 'extensionName' in value;
}

export function byKey(a: KeyedNavLink, b: KeyedNavLink): number {
  return a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
}

export function toNavLink({ extensionName }: ExtensionInfo): KeyedNavLink {
  return {
    key: extensionName,
    name: extensionName,
    url: '',
  };
}
