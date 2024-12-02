import { useMutation, useQuery } from '@tanstack/react-query'
import { loginWithEmailAndPassword, verifyToken } from '../../apis/auth.api'
import { toast } from 'react-toastify'
import { LoginRequestType } from '../../types/auth.type'

export const useVerifyToken = () => {
  const userQuery = useQuery({
    queryKey: ['verifyToken'],
    queryFn: () => verifyToken(),
    retry: 0,
    refetchOnWindowFocus: false
  })

  return userQuery
}

export const useLoginWithEmailAndPassword = () => {
  const mutation = useMutation({
    mutationFn: (loginRequest: LoginRequestType) => {
      return loginWithEmailAndPassword(loginRequest)
    },

    onSuccess: (data) => {
      toast.success(`Welcome back, ${data.data.user.name}!`)
      console.log('Login successful:', data)
    },

    onError: (error) => {
      toast.error(`Login failed: ${(error as Error).message}`)
      console.error('Login error:', error)
    }
  })

  return mutation
}
