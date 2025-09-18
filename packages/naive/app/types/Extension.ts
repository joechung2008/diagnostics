export type Extension = ExtensionInfo | ExtensionError

export interface ExtensionError {
  lastError: {
    errorMessage: string
    time: string
  }
}

export interface ExtensionInfo {
  extensionName: string
  config?: Record<string, string>
  stageDefinition?: Record<string, string[]>
}

export type ExtensionProps = ExtensionInfo
