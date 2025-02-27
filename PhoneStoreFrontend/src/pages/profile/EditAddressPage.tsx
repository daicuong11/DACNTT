import { AppCheckBox, LoadingItem, LoadingOpacity } from '@/components'
import { useAppSelector } from '@/hooks'
import { Input, Select } from 'antd'
import { ArrowLeft } from 'lucide-react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { AddressRequestType, AddressType } from '@/types/address.type'
import { useEffect, useState } from 'react'
import { useGetAllProvince, useGetDistrictByProvince, useGetWardByDistrict } from '@/hooks/querys/GHN.query'
import { toast } from 'react-toastify'
import { useGetAddressById, useUpdateAddress } from '@/hooks/querys/address.query'
import { useQueryClient } from '@tanstack/react-query'

const validateAddress = (address: Omit<AddressType, 'addressId'>) => {
  if (!address.province.trim()) {
    return 'Vui lòng chọn tỉnh thành'
  }
  if (!address.district.trim()) {
    return 'Vui lòng chọn quận huyện'
  }
  if (!address.ward.trim()) {
    return 'Vui lòng chọn phường xã'
  }
  if (!address.street.trim()) {
    return 'Vui lòng nhập địa chỉ số nhà'
  }
  return ''
}
const EditAddressPage = () => {
  const { addressId } = useParams<{ addressId: string }>()
  const queryClient = useQueryClient()
  const { data, isLoading } = useGetAddressById(Number(addressId))
  const navigate = useNavigate()
  const [address, setAddress] = useState<Omit<AddressType, 'addressId'>>({
    province: '',
    district: '',
    ward: '',
    street: '',
    isDefault: false
  })

  const { data: province, isLoading: isProvinceLoading } = useGetAllProvince()
  const { data: districts } = useGetDistrictByProvince(
    province?.find((p) => p.ProvinceName === address.province)?.ProvinceID || 0
  )
  const { data: wards } = useGetWardByDistrict(
    districts?.find((d) => d.DistrictName === address.district)?.DistrictID || 0
  )

  const { mutate: updateAddress, isPending } = useUpdateAddress()

  const currentUser = useAppSelector((state) => state.auth.user)

  useEffect(() => {
    if (data) {
      setAddress({
        province: data.province,
        district: data.district,
        ward: data.ward,
        street: data.street,
        isDefault: data.isDefault
      })
    }
  }, [data])

  if (!currentUser) {
    return <Navigate to='/signin' />
  }

  const handleSetInput = (key: string, value: string) => {
    if (key === 'province') {
      setAddress({ ...address, [key]: value, district: '', ward: '' })
    } else if (key === 'district') {
      setAddress({ ...address, [key]: value, ward: '' })
    } else {
      setAddress({ ...address, [key]: value })
    }
  }

  const handleSaveAddress = () => {
    const error = validateAddress(address)
    if (error) {
      toast.error(error)
      return
    }
    const addressRequest: AddressRequestType = {
      userId: currentUser.id,
      province: address.province,
      district: address.district,
      ward: address.ward,
      street: address.street,
      isDefault: address.isDefault
    }

    updateAddress(
      { addressId: Number(addressId), address: addressRequest },
      {
        onSuccess: () => {
          toast('Chỉnh sửa địa chỉ thành công')
          queryClient.invalidateQueries({
            queryKey: ['getAddressByUserId', currentUser.id]
          })
          navigate(-1)
        },
        onError: (error) => {
          console.error('Update address failed:', error)
        }
      }
    )
  }

  return (
    <div className='flex flex-col min-h-screen p-5 pb-20 mt-1 bg-white rounded-md'>
      {isLoading || isPending || (isProvinceLoading && <LoadingOpacity />)}
      <div className='flex items-center'>
        <span onClick={() => navigate(-1)} className='px-3 text-gray-400 cursor-pointer hover:text-gray-600'>
          <ArrowLeft size={26} strokeWidth={1.6} />
        </span>
        <div className='text-2xl font-semibold text-black'>Chỉnh sửa địa chỉ</div>
      </div>

      <div className='flex flex-col p-5 mt-8 gap-y-4'>
        <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
          <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>tỉnh/thành phố</div>
          <Select
            showSearch
            value={address.province || undefined}
            onChange={(value: string) => handleSetInput('province', value)}
            variant='borderless'
            options={province
              ?.slice(1)
              .sort((a, b) => {
                return Number(a.ProvinceID) - Number(b.ProvinceID)
              })
              .map((item) => ({
                value: item.ProvinceName,
                label: item.ProvinceName
              }))}
            placeholder='Chọn tỉnh thành'
            className='text-base'
          />
        </div>
        <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
          <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Quận/huyện</div>
          <Select
            showSearch
            value={address.district || undefined}
            onChange={(value: string) => handleSetInput('district', value)}
            variant='borderless'
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            options={districts
              ?.slice(1)
              .sort((a, b) => {
                return Number(a.DistrictID) - Number(b.DistrictID)
              })
              .map((item) => ({
                value: item.DistrictName,
                label: item.DistrictName
              }))}
            placeholder='Chọn quận huyện'
            className='text-base'
          />
        </div>
        <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
          <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>phường/xã</div>
          <Select
            showSearch
            value={address.ward || undefined}
            onChange={(value: string) => handleSetInput('ward', value)}
            variant='borderless'
            options={wards
              ?.slice(1)
              .sort((a, b) => {
                return Number(a.WardCode) - Number(b.WardCode)
              })
              .map((item) => ({
                value: item.WardName,
                label: item.WardName
              }))}
            placeholder='Chọn phường xã'
            className='text-base'
          />
        </div>
        <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
          <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Địa chỉ</div>
          <Input
            value={address.street}
            onChange={(e) => handleSetInput('street', e.target.value)}
            variant='borderless'
            placeholder='Số nhà, tên đường'
            allowClear
            className='text-base'
            onPressEnter={handleSaveAddress}
          />
        </div>

        <AppCheckBox
          value={address.isDefault}
          onChange={(value) => setAddress((pre) => ({ ...pre, isDefault: value.target.checked }))}
        >
          <span className='text-sm'>Đặt làm địa chỉ mặc định</span>
        </AppCheckBox>

        <button
          // disabled={isPending}
          onClick={handleSaveAddress}
          className='w-full py-2 mt-5 rounded-md btn btn-danger'
        >
          {false ? <LoadingItem className='border-white' /> : 'Lưu lại chỉnh sửa'}
        </button>
      </div>
    </div>
  )
}

export default EditAddressPage
