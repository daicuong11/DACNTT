import { AuthResponseType, BaseResponse, LoginRequestType, RegisterRequestType } from '../types/auth.type'
import axiosInstance from '@/configs/http'

export const loginWithEmailAndPassword = async (
  loginRequest: LoginRequestType
): Promise<BaseResponse<AuthResponseType>> => {
  return await axiosInstance.post('auth/login', loginRequest)
}

export const registerAccount = async (
  registerRequest: RegisterRequestType
): Promise<BaseResponse<AuthResponseType>> => {
  return await axiosInstance.post('auth/register', registerRequest)
}
