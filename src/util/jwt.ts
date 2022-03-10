import jwt_decode from 'jwt-decode'

export const tokenIsExpired = (token: string) => {
  const decoded = jwt_decode(token) as { exp: number }
  if (!decoded) {
    return true
  }
  const now = Math.floor(new Date().getTime() / 1000)
  return decoded.exp < now
}
