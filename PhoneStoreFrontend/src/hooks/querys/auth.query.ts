import { useMutation } from '@tanstack/react-query'
import { loginWithEmailAndPassword, registerAccount } from '../../apis/auth.api'
import { AuthResponseType, BaseResponse, LoginRequestType, RegisterRequestType } from '../../types/auth.type'
import { useAppDispatch } from '..'
import { setAuth } from '@/features/auth/auth.slice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

export const useLoginWithEmailAndPassword = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (loginRequest: LoginRequestType) => loginWithEmailAndPassword(loginRequest),

    onSuccess: (data) => {
      dispatch(setAuth(data.data))
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
      return registerAccount(registerRequest)
    },

    onSuccess: (data: BaseResponse<AuthResponseType>) => {
      dispatch(setAuth(data.data))
      navigate('/')
    },

    onError: (error: any) => {
      toast.error(error.response.data.message || 'Đăng ký thất bại!')
    }
  })

  return mutation
}
