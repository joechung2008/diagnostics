import type { BuildInfoProps } from "./BuildInfo.types";
import type { Extension } from "./Extensions.types";
import type { ServerInfoProps } from "./ServerInfo.types";

export interface Diagnostics {
  buildInfo: BuildInfoProps;
  extensions: Record<string, Extension>;
  serverInfo: ServerInfoProps;
}
