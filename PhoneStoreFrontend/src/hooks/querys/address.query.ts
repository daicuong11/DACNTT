import { AddressRequestType } from './../../types/address.type'
import addressAPI from '@/apis/address'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useGetAddressByUserId = (userId: number) => {
  return useQuery({
    queryKey: ['getAddressByUserId', userId],
    queryFn: async () => addressAPI.getAddressByUserId(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetAddressById = (addressId: number) => {
  return useQuery({
    queryKey: ['getAddressById', addressId],
    queryFn: async () => addressAPI.getAddressById(addressId),
    enabled: !!addressId
  })
}

export const useAddAddress = () => {
  return useMutation({
    mutationKey: ['addAddress'],
    mutationFn: addressAPI.addAddress
  })
}

export const useUpdateAddress = () => {
  return useMutation({
    mutationKey: ['updateAddress'],
    mutationFn: ({ addressId, address }: { addressId: number; address: AddressRequestType }) =>
      addressAPI.updateAddress(addressId, address)
  })
}

export const useSetDefaultAddress = () => {
  return useMutation({
    mutationKey: ['setDefaultAddress'],
    mutationFn: (addressId: number) => addressAPI.setDefaultAddress(addressId)
  })
}

export const useDeleteAddress = () => {
  return useMutation({
    mutationKey: ['deleteAddress'],
    mutationFn: (addressId: number) => addressAPI.deleteAddress(addressId)
  })
}
