import React, { FC } from 'react'
import { AddressType } from '@/types/address.type'
import getAddressString from '@/utils/getAddressString'
import { house_img } from '@/assets/images'
import { ChevronDownSquare, Edit2, MoreVertical, Trash2 } from 'lucide-react'
import { Popover } from 'antd'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/hooks'
import { useQueryClient } from '@tanstack/react-query'
import { useDeleteAddress, useSetDefaultAddress } from '@/hooks/querys/address.query'
import { toast } from 'react-toastify'
import { LoadingOpacity } from '@/components'

interface AddressItemSettingProps {
  address: AddressType
}
const AddressItemSetting: FC<AddressItemSettingProps> = ({ address }) => {
  const queryClient = useQueryClient()
  const currentUser = useAppSelector((state) => state.auth.user)
  const navigate = useNavigate()

  const { mutate: setDefaultAddress, isPending } = useSetDefaultAddress()
  const { mutate: deleteAddress, isPending: isPendingDelete } = useDeleteAddress()

  if (!currentUser) {
    return <Navigate to='/signin' />
  }

  const handleSetDefaultAddress = () => {
    setDefaultAddress(address.addressId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['getAddressByUserId', currentUser.id]
        })
      },
      onError: (error) => {
        console.error('Set default address failed:', error)
      }
    })
  }

  const handleDeleteAddress = () => {
    deleteAddress(address.addressId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['getAddressByUserId', currentUser.id]
        })
        toast('Xóa địa chỉ thành công')
      },
      onError: (error) => {
        console.error('Delete address failed:', error)
      }
    })
  }

  const contentOptions = (
    <div className='flex flex-col w-44'>
      <button
        onClick={handleSetDefaultAddress}
        className='flex items-center gap-x-2 py-1.5 hover:bg-gray-100 px-2 rounded-md'
      >
        <ChevronDownSquare size={16} strokeWidth={1.6} />
        <span className=''>Đặt làm mặc định</span>
      </button>
      <button
        onClick={() => navigate(`edit/${address.addressId}`)}
        className='flex items-center gap-x-2 py-1.5 hover:bg-gray-100 px-2 rounded-md'
      >
        <Edit2 size={16} strokeWidth={1.6} />
        <span className=''>Chỉnh sửa</span>
      </button>
      <button
        onClick={handleDeleteAddress}
        className='flex items-center gap-x-2 py-1.5 hover:bg-gray-100 px-2 rounded-md'
      >
        <Trash2 size={16} strokeWidth={1.6} />
        <span className=''>Xóa địa chỉ</span>
      </button>
    </div>
  )
  return (
    <div className='flex gap-x-3'>
      {isPending || (isPendingDelete && <LoadingOpacity />)}
      <div className='w-12 h-12 p-2 border rounded-full'>
        <img className='object-contain w-full h-full' src={house_img} />
      </div>
      <div className='flex flex-col items-start justify-center flex-1 gap-y-1'>
        <div className='text-sm font-medium'>{getAddressString(address)}</div>
        {address.isDefault && (
          <div className=''>
            <span className='flex-shrink-0 h-min text-[12px] rounded-md text-primary py-0.5 px-3 bg-primary/10 inline-flex items-center justify-center'>
              Mặc định
            </span>
          </div>
        )}
      </div>
      <div className='flex flex-col justify-between'>
        <div></div>
        <Popover placement='topRight' content={contentOptions} trigger='click'>
          <button
            onClick={(e) => {
              e.stopPropagation()
            }}
            className='flex items-end justify-center py-1.5 rounded-md hover:bg-gray-100 px-2'
          >
            <MoreVertical size={20} strokeWidth={1.6} />
          </button>
        </Popover>
      </div>
    </div>
  )
}

export default AddressItemSetting
