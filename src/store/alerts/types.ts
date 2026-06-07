export type AlertId = string

export interface Alert {
  id?: AlertId
  msg: string
  type: string // success, failure, etc - not to be confused with reducer types
}

export type AlertState = Alert[]
