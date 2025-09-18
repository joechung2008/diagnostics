// Remove Fluent UI 8 dependency and define KeyedNavLink locally
export type KeyedNavLink = {
  key: string
  name: string
  url?: string
  [prop: string]: unknown
}

export interface KeyValuePair<TValue> {
  key: string
  value: TValue
}
