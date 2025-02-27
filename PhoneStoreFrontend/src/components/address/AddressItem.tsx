import React, { FC } from 'react'
import AppRadioButton from '../buttons/AppRadioButton'
import { AddressType } from '../../types/address.type'
import { EditFilled } from '@ant-design/icons'
import getAddressString from '../../utils/getAddressString'

interface AddressProps {
  address: AddressType
  onSelect: (id: number) => void
  selectedAddress: number
}
const AddressItem: FC<AddressProps> = ({ selectedAddress, address, onSelect }) => {
  return (
    <div onClick={() => onSelect(address.addressId)} className='flex items-start cursor-pointer gap-x-1'>
      <AppRadioButton checked={address.addressId == selectedAddress} value={address.addressId}></AppRadioButton>
      <div className='flex items-end justify-between w-full gap-x-4'>
        <div className='flex flex-col items-start justify-center flex-1 w-full h-full gap-y-1'>
          <div className='text-sm font-medium'>{getAddressString(address)}</div>
          {address.isDefault && (
            <div className=''>
              <span className='flex-shrink-0 h-min text-[12px] rounded-md text-primary py-0.5 px-3 bg-primary/10 inline-flex items-center justify-center'>
                Mặc định
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AddressItem
