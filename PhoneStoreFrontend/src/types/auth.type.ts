import { UserType } from './user.type'

export interface AuthResponseType {
  accessToken: string
  refreshToken: string
  ExpiresIn: number
  user: Pick<UserType, 'id' | 'email' | 'name' | 'role'>
}
