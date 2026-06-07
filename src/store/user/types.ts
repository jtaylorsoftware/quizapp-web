import { User } from 'api/models'
import { Failure } from 'api/result'

export type UserError = Failure

export interface UserState {
  loading: boolean
  user: User | null
  error: UserError | null
}
