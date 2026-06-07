import { jwtDecode } from 'jwt-decode'

export const tokenIsExpired = (token: string) => {
  const decoded = jwtDecode(token) as { exp: number }
  if (!decoded) {
    return true
  }
  const now = Math.floor(new Date().getTime() / 1000)
  return decoded.exp < now
}
