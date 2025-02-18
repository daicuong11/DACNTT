import ghnApi from '@/apis/GHN.api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useAppDispatch } from '..'
import { setShippingFee } from '@/features/order/order.slice'

export const useGetAllProvince = () => {
  return useQuery({
    queryKey: ['getAllProvince'],
    queryFn: ghnApi.getAllProvince,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetDistrictByProvince = (provinceID: number) => {
  return useQuery({
    queryKey: ['getDistrictByProvince', provinceID],
    queryFn: () => ghnApi.getDistrictByProvince(provinceID),
    staleTime: 1000 * 60 * 60 * 24,
    enabled: !!provinceID
  })
}

export const useGetWardByDistrict = (districtID: number) => {
  return useQuery({
    queryKey: ['getWardByDistrict', districtID],
    queryFn: () => ghnApi.getWardByDistrict(districtID),
    staleTime: 1000 * 60 * 60 * 24,
    enabled: !!districtID
  })
}

export const useGetShippingFee = () => {
  const dispatch = useAppDispatch()
  const mutation = useMutation({
    mutationKey: ['getShippingFee'],
    mutationFn: ghnApi.getShippingFee,
    onSuccess: (data) => {
      dispatch(setShippingFee(data.total))
    }
  })

  return mutation
}
