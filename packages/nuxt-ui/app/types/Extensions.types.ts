import type { KeyedNavLink } from "./KeyedNavLink.types";

export interface ExtensionsProps {
  extensions: Record<string, Extension>;
  onLinkClick(ev?: MouseEvent, item?: KeyedNavLink): void;
}

export interface ExtensionInfo {
  extensionName: string;
  config?: Record<string, string>;
  stageDefinition?: Record<string, string[]>;
}

export interface ExtensionError {
  lastError: {
    errorMessage: string;
    time: string;
  };
}

export type Extension = ExtensionInfo | ExtensionError;
