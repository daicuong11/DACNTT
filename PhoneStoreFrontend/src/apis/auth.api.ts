import { AuthResponseType, LoginRequestType } from '../types/auth.type'
import { UserType } from '../types/user.type'
import http from '../utils/http'

export const loginWithEmailAndPassword = (loginRequest: LoginRequestType) => {
  return http.post<AuthResponseType>('auth/login', loginRequest)
}

export const verifyToken = () => {
  return http.get<UserType>('auth/verify')
}
