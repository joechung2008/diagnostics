import type { BuildInfoProps } from "./BuildInfoProps"
import type { ServerInfoProps } from "./ServerInfoProps"
import type { Extension } from "./Extension"

export interface Diagnostics {
  buildInfo: BuildInfoProps
  extensions: Record<string, Extension>
  serverInfo: ServerInfoProps
}
