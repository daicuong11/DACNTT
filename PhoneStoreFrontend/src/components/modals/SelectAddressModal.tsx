import { Modal, Radio, RadioChangeEvent } from 'antd'
import React, { FC, useState } from 'react'
import AddressItem from '../address/AddressItem'
import { AddressType } from '../../types/address.type'

interface SelectAddressModalProps {
  isOpen: boolean
  onClose: () => void
  onFinishedSelectAddress?: (address: AddressType) => void
  dataSources: AddressType[]
}
const SelectAddressModal: FC<SelectAddressModalProps> = ({ isOpen, onClose, onFinishedSelectAddress, dataSources }) => {
  const [selectedAddress, setSelectedAddress] = useState<number>()

  const onChangeSelectedAddress = (e: RadioChangeEvent) => {
    setSelectedAddress(e.target.value)
  }

  const onSelect = (id: number) => {
    setSelectedAddress(id)
  }

  const handleSuccessSelectAddress = () => {
    const address = dataSources.find((address) => address.addressId === selectedAddress)
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
          {dataSources.map((address, index) => (
            <AddressItem
              isSelected={address.addressId === selectedAddress}
              address={address}
              key={index}
              onSelect={onSelect}
            />
          ))}
        </Radio.Group>
      </div>
    </Modal>
  )
}

export default SelectAddressModal
