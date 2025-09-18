import type { BuildInfoProps } from './BuildInfoTable.types'
import type { Extension } from './ExtensionItems.types'
import type { ServerInfoProps } from './ServerInfoTable.types'

export interface Diagnostics {
  buildInfo: BuildInfoProps
  extensions: Record<string, Extension>
  serverInfo: ServerInfoProps
}
