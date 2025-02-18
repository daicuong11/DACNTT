import { Modal, Radio, RadioChangeEvent } from 'antd'
import React, { FC, useState } from 'react'
import AddressItem from '../address/AddressItem'
import { AddressType } from '../../types/address.type'

interface SelectAddressModalProps {
  isOpen: boolean
  onClose: () => void
  onFinishedSelectAddress?: (address: AddressType) => void
}

const listAddress: AddressType[] = [
  {
    addressId: 1,
    province: 'Hồ Chí Minh',
    district: 'Quận 1',
    ward: 'Phường Bến Nghé',
    street: 'Số 1 Đại Cương',
    isDefault: true
  },
  {
    addressId: 2,
    province: 'Hồ Chí Minh',
    district: 'Quận 2',
    ward: 'Phường Thảo Điền',
    street: 'Số 2 Đại Cương',
    isDefault: false
  }
]

const SelectAddressModal: FC<SelectAddressModalProps> = ({ isOpen, onClose, onFinishedSelectAddress }) => {
  const [selectedAddress, setSelectedAddress] = useState(listAddress[0].addressId)

  const onChangeSelectedAddress = (e: RadioChangeEvent) => {
    setSelectedAddress(e.target.value)
  }

  const onSelect = (id: number) => {
    setSelectedAddress(id)
  }

  const handleSuccessSelectAddress = () => {
    const address = listAddress.find((address) => address.addressId === selectedAddress)
    if (address && onFinishedSelectAddress) {
      onFinishedSelectAddress(address)
    }
    onClose()
  }

  return (
    <Modal
      title={<div className='text-lg text-center'>Thông tin giao hàng</div>}
      centered
      open={isOpen}
      onOk={onClose}
      onCancel={onClose}
      width={600}
      footer={
        <div onClick={handleSuccessSelectAddress} className='btn btn-danger'>
          Xác nhận
        </div>
      }
    >
      <div className='max-h-[60vh] h-[60vh] overflow-y-scroll scrollbar-hide flex flex-col gap-y-4'>
        <Radio.Group value={selectedAddress} onChange={onChangeSelectedAddress} className='flex flex-col gap-y-4'>
          {listAddress.map((address, index) => (
            <AddressItem selectedAddress={selectedAddress} address={address} key={index} onSelect={onSelect} />
          ))}
        </Radio.Group>
      </div>
    </Modal>
  )
}

export default SelectAddressModal
