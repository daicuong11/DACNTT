import { useMutation } from '@tanstack/react-query'
import { AuthResponseType, BaseResponse, LoginRequestType, RegisterRequestType } from '../../types/auth.type'
import { useAppDispatch } from '..'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from '@/apis/auth.api'
import { setTokens } from '@/features/auth/auth.slice'

export const useLoginWithEmailAndPassword = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (loginRequest: LoginRequestType) => authApi.loginWithEmailAndPassword(loginRequest),

    onSuccess: (data) => {
      dispatch(setTokens(data.data))
      navigate('/')
    },

    onError: (error: any) => {
      toast.error(error.response.data.message || 'Đăng nhập thất bại!')
    }
  })

  return mutation
}

export const useRegisterAccount = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationKey: ['register'],
    mutationFn: (registerRequest: RegisterRequestType) => {
      return authApi.registerAccount(registerRequest)
    },

    onSuccess: (data: BaseResponse<AuthResponseType>) => {
      dispatch(setTokens(data.data))
      navigate('/')
    },

    onError: (error: any) => {
      toast.error(error.response.data.message || 'Đăng ký thất bại!')
    }
  })

  return mutation
}
