import { UserType } from './user.type'

// response
export interface BaseResponse {
  success: boolean
  message: string
  Data: any
}

export interface AuthResponseType {
  accessToken: string
  refreshToken: string
  ExpiresIn: number
  user: Pick<UserType, 'id' | 'email' | 'name' | 'role'>
}

// request
export interface LoginRequestType {
  email: string
  password: string
}
