import type { Extension } from "./Extension"

export interface ExtensionsProps {
  extensions: Record<string, Extension>
  onLinkClick(item?: KeyedNavLink): void
}

export interface KeyValuePair<TValue> {
  key: string
  value: TValue
}

export type KeyedNavLink = {
  key: string
  name: string
  url?: string
  [prop: string]: unknown
}
