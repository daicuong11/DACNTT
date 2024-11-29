import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { verifyToken } from '../../apis/auth.api'
import { UserType } from '../../types/user.type'

export const useVerifyToken = (token: string, options?: UseQueryOptions<UserType, Error>) => {
  const userQuery = useQuery<UserType, Error>({
    queryKey: ['verifyToken', token],
    queryFn: () => verifyToken(token),
    enabled: !!token,
    ...options
  })

  return userQuery
}
