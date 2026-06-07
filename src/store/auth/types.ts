export type Token = string

export interface AuthState {
  token: Token | null
  isAuthenticated: boolean
}
