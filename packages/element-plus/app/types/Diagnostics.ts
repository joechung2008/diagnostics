import type { BuildInfoProps } from "./BuildInfoProps"
import type { Extension } from "./Extension"
import type { ServerInfoProps } from "./ServerInfoProps"

export interface Diagnostics {
  buildInfo: BuildInfoProps
  extensions: Record<string, Extension>
  serverInfo: ServerInfoProps
}
