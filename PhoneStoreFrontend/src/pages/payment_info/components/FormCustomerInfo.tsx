import { ConfigProvider, Input, Select } from 'antd'
import { ChevronRight } from 'lucide-react'
import React, { FC, useEffect, useState } from 'react'
import { AddressType } from '@/types/address.type'
import { LoadingOpacity, SelectAddressModal } from '@/components'
import { useAppDispatch, useAppSelector, useModal } from '@/hooks'
import getAddressString from '@/utils/getAddressString'
import { useGetAllProvince, useGetDistrictByProvince, useGetWardByDistrict } from '@/hooks/querys/GHN.query'
import { InfoCustomerType } from '../PaymentInfoPage'
import { useGetAddressByUserId } from '@/hooks/querys/address.query'

export type CodeAddressType = {
  province?: number
  district?: number
}

interface FormCustomerInfoProps {
  infoCustomer: InfoCustomerType
  setInfoCustomer: React.Dispatch<React.SetStateAction<InfoCustomerType>>
}
const FormCustomerInfo: FC<FormCustomerInfoProps> = ({ infoCustomer, setInfoCustomer }) => {
  const orderSlice = useAppSelector((state) => state.order)
  const currentUser = useAppSelector((state) => state.auth.user)

  const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(null)
  const { isOpen, closeModal, openModal } = useModal()

  const { data: province, isLoading: isProvinceLoading } = useGetAllProvince()
  const { data: districts } = useGetDistrictByProvince(
    province?.find((p) => p.ProvinceName === infoCustomer.province)?.ProvinceID || 0
  )
  const { data: wards } = useGetWardByDistrict(
    districts?.find((d) => d.DistrictName === infoCustomer.district)?.DistrictID || 0
  )

  const { data: listAddressOfUser, isLoading: isLoadingAddress } = useGetAddressByUserId(currentUser?.id || 0)

  useEffect(() => {
    if (listAddressOfUser && listAddressOfUser.length > 0) {
      const findAddress = listAddressOfUser.find((address) => address.isDefault) || listAddressOfUser[0]
      if (orderSlice.shippingAddress == null) {
        setSelectedAddress(findAddress)
      }
    }
  }, [listAddressOfUser])

  useEffect(() => {
    if (selectedAddress) {
      setInfoCustomer({
        ...infoCustomer,
        province: selectedAddress.province,
        district: selectedAddress.district,
        ward: selectedAddress.ward,
        address: selectedAddress.street
      })
    }
  }, [selectedAddress])

  useEffect(() => {
    if (currentUser || !orderSlice.shippingInfo) {
      setInfoCustomer((prev) => ({
        ...prev,
        name: currentUser?.name || '',
        phone: currentUser?.phoneNumber || ''
      }))
    } else {
      setInfoCustomer((prev) => ({
        ...prev,
        name: orderSlice.shippingInfo?.name || '',
        phone: orderSlice.shippingInfo?.phone || ''
      }))
    }
  }, [currentUser])

  const handleOpenNewForm = () => {
    setSelectedAddress(null)
    setInfoCustomer({
      ...infoCustomer,
      province: '',
      district: '',
      ward: '',
      address: '',
      note: ''
    })
  }

  const handleSetInput = (key: string, value: string) => {
    if (key === 'province') {
      setInfoCustomer({ ...infoCustomer, [key]: value, district: '', ward: '' })
    } else if (key === 'district') {
      setInfoCustomer({ ...infoCustomer, [key]: value, ward: '' })
    } else {
      setInfoCustomer({ ...infoCustomer, [key]: value })
    }
  }

  return (
    <div className='mt-6 space-y-3'>
      {isProvinceLoading || (isLoadingAddress && <LoadingOpacity />)}
      <SelectAddressModal
        dataSources={listAddressOfUser || []}
        isOpen={isOpen}
        onClose={closeModal}
        onFinishedSelectAddress={(address) => setSelectedAddress(address)}
      />
      <div className='uppercase'>Thông tin nhận hàng</div>

      <div className='p-5 space-y-4 bg-white border border-gray-300 rounded-lg'>
        <ConfigProvider
          theme={{
            components: {
              Select: {
                fontSize: 16
              }
            }
          }}
        >
          <div className='flex flex-col sm:grid sm:grid-cols-2 gap-x-3 gap-y-5'>
            <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
              <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>tên người nhận</div>
              <Input
                value={infoCustomer.name}
                onChange={(e) => handleSetInput('name', e.target.value)}
                variant='borderless'
                placeholder='Họ tên người nhận'
                allowClear
                className='text-base'
              />
            </div>
            <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
              <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>sđt người nhận</div>
              <Input
                value={infoCustomer.phone}
                onChange={(e) => handleSetInput('phone', e.target.value)}
                variant='borderless'
                placeholder='Số điện thoại người nhận'
                allowClear
                className='text-base'
              />
            </div>
            {!selectedAddress && (
              <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
                <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>tỉnh/thành phố</div>
                <Select
                  showSearch
                  value={infoCustomer.province || undefined}
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
            )}
            {!selectedAddress && (
              <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
                <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Quận/huyện</div>
                <Select
                  showSearch
                  value={infoCustomer.district || undefined}
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
            )}
            {!selectedAddress && (
              <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
                <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>phường/xã</div>
                <Select
                  showSearch
                  value={infoCustomer.ward || undefined}
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
            )}
            {!selectedAddress && (
              <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
                <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Địa chỉ</div>
                <Input
                  value={infoCustomer.address}
                  onChange={(e) => handleSetInput('address', e.target.value)}
                  variant='borderless'
                  placeholder='Số nhà, tên đường'
                  allowClear
                  className='text-base'
                />
              </div>
            )}
            {selectedAddress && (
              <div className='col-span-2'>
                <div className='flex items-start cursor-pointer gap-x-1'>
                  <div className='flex items-start justify-between w-full gap-x-4'>
                    <span className='font-normal'>Địa chỉ:</span>
                    <div className='flex flex-col items-start justify-center flex-1 w-full h-full pt-1 gap-y-1'>
                      <div className='text-sm font-medium'>{getAddressString(selectedAddress)}</div>
                      {selectedAddress.isDefault && (
                        <div className=''>
                          <span className='flex-shrink-0 h-min text-[12px] rounded-md text-primary py-0.5 px-3 bg-primary/10 inline-flex items-center justify-center'>
                            Mặc định
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {listAddressOfUser && listAddressOfUser.length > 0 && (
              <div className='col-span-2'>
                <div
                  onClick={selectedAddress ? () => handleOpenNewForm() : openModal}
                  className='flex items-center justify-end py-1 cursor-pointer text-primary hover:underline'
                >
                  <span className='text-xs font-medium line-clamp-1'>
                    {selectedAddress ? 'Nhập địa chỉ mới' : 'Chọn địa chỉ đã lưu'}
                  </span>
                  <span className='ml-1'>
                    <ChevronRight size={16} />
                  </span>
                </div>
              </div>
            )}
            <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group col-span-2'>
              <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Ghi chú</div>
              <Input
                value={infoCustomer.note}
                onChange={(e) => handleSetInput('note', e.target.value)}
                variant='borderless'
                placeholder='Ghi chú khác (nếu có)'
                allowClear
                className='text-base'
              />
            </div>
          </div>
        </ConfigProvider>
      </div>
    </div>
  )
}

export default FormCustomerInfo
