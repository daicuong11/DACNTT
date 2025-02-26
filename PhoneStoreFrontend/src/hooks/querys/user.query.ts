import userAPI from '@/apis/user.api'
import { useQuery } from '@tanstack/react-query'

export const useGetUserById = (id: number) => {
  return useQuery({
    queryKey: ['getUserById', id],
    queryFn: () => userAPI.getUserById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
