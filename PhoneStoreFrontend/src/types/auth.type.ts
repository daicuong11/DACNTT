import { UserAuthType, UserType } from './user.type'

// response
export interface BaseResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface AuthResponseType {
  accessToken: string
  refreshToken: string
  expiresIn: number
  user: UserAuthType
}

// request
export interface LoginRequestType {
  phoneNumber: string
  password: string
}

export interface RegisterRequestType {
  name: string
  phoneNumber: string
  email: string
  password: string
}
