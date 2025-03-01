import userAPI from '@/apis/user.api'
import { UserType } from '@/types/user.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useGetUserById = (id: number) => {
  return useQuery({
    queryKey: ['getUserById', id],
    queryFn: () => userAPI.getUserById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ['getAllUsers'],
    queryFn: userAPI.getAllUsers,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['updateUserStatus'],
    mutationFn: (id: number) => userAPI.updateUserStatus(id), // Gọi API

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['getUserById', id] })

      const previousUser = queryClient.getQueryData<UserType>(['getUserById', id])

      // Optimistic update
      if (previousUser) {
        queryClient.setQueryData(['getUserById', id], {
          ...previousUser,
          active: !previousUser.active
        })
      }

      return { previousUser }
    },

    onSuccess: (data) => {
      console.log('Update user status successful:', data)
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ['getAllUsers'] })
    },

    onError: (error, id, context) => {
      toast.error('Cập nhật trạng thái thất bại!')
      if (context?.previousUser) {
        queryClient.setQueryData(['getUserById', id], context.previousUser)
      }
    }
  })
}
