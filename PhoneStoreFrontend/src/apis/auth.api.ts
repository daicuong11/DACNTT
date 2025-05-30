import { AuthResponseType, BaseResponse, LoginRequestType, RegisterRequestType } from '../types/auth.type'
import axiosInstance from '@/configs/http'

class AuthAPI {
  loginWithEmailAndPassword = async (loginRequest: LoginRequestType): Promise<BaseResponse<AuthResponseType>> => {
    return await axiosInstance.post('auth/login', loginRequest)
  }

  registerAccount = async (registerRequest: RegisterRequestType): Promise<BaseResponse<AuthResponseType>> => {
    return await axiosInstance.post('auth/register', registerRequest)
  }

  async changePassword({
    userId,
    oldPassword,
    newPassword
  }: {
    userId: number
    oldPassword: string
    newPassword: string
  }): Promise<BaseResponse<object>> {
    return await axiosInstance.post('auth/change-password', { userId, oldPassword, newPassword })
  }
}

export default new AuthAPI()
