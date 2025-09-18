import type { Extension } from "./Extension"
import type { KeyedNavLink } from "./KeyedNavLink"

export interface ExtensionsProps {
  extensions: Record<string, Extension>
  onLinkClick(item?: KeyedNavLink): void
}
