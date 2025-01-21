import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (loginRequest: LoginRequestType) => {
      return loginWithEmailAndPassword(loginRequest)
    },

    onSuccess: (data) => {
      toast.success(`Welcome back, ${data.data.user.name}!`)
      console.log('Login successful:', data)

      queryClient.invalidateQueries({ queryKey: ['login'] })
    },

    onError: (error: unknown) => {
      // Xử lý lỗi và hiển thị thông báo
      const errorMessage = (error as any)?.response?.data?.message || (error as Error).message
      toast.error(`Login failed: ${errorMessage}`)
      console.error('Login error:', error)
    }
  })

  return mutation
}
