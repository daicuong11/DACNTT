import spec_groupApi from '@/apis/spec_group.api'
import { useQuery } from '@tanstack/react-query'

export const useGetSpecificationGroupsByVariantId = (variantId: number) => {
  return useQuery({
    queryKey: ['specificationGroups', { variantId }],
    queryFn: () => spec_groupApi.getSpecificationGroupsByVariantId(variantId),
    enabled: !!variantId
  })
}

export const useGetSpecificationIsSpecialByVariantId = (variantId: number) => {
  return useQuery({
    queryKey: ['specificationIsSpecial', { variantId }],
    queryFn: () => spec_groupApi.getSpecificationIsSpecialByVariantId(variantId),
    enabled: !!variantId
  })
}
