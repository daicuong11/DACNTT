import { Modal, Radio, RadioChangeEvent } from 'antd'
import React, { FC, useState } from 'react'
import AddressItem from '../address/AddressItem'
import { useAppSelector } from '../../hooks'
import { iphone1 } from '../../assets/images/iphone'
import formatPrice from '../../utils/formatPrice'
import classNames from 'classnames'

interface ReviewCartItemModalProps {
  isOpen: boolean
  onClose: () => void
}

const ReviewCartItemModal: FC<ReviewCartItemModalProps> = ({ isOpen, onClose }) => {
  const orderSlice = useAppSelector((state) => state.order)

  return (
    <Modal
      title={<div className='text-base'>Danh sách sản phẩm đang thanh toán</div>}
      centered
      open={isOpen}
      onOk={onClose}
      onCancel={onClose}
      width={600}
      footer={null}
    >
      <div className='max-h-[60vh] overflow-y-scroll scrollbar-hide flex flex-col gap-y-4'>
        {orderSlice.cartItems.map((cartItem, index) => (
          <div
            key={cartItem.productVariantID}
            className={classNames('w-full p-2 bg-white', {
              'border-b border-gray-200': index !== orderSlice.cartItems.length - 1
            })}
          >
            <div className='flex gap-x-4'>
              <div className='w-[100px] h-[100px] flex-shrink-0'>
                <img src={iphone1} className='object-contain w-full h-full' />
              </div>
              <div className='flex flex-col w-full gap-y-2'>
                <div className='w-[70%] line-clamp-2 text-[#3a3a3a] text-[16px] font-medium'>
                  {cartItem.productVariant.product.name}
                </div>
                <div className='flex items-end justify-between w-full'>
                  <div className='flex items-end gap-x-2'>
                    <span className='text-lg font-medium leading-none text-primary'>{formatPrice(cartItem.price)}</span>
                    <span className='font-medium text-[#707070] text-sm leading-none line-through'>
                      {formatPrice(cartItem.price)}
                    </span>
                  </div>
                  <div className='flex gap-x-2 '>
                    <div className='font-medium leading-none text-slate-700'>Số lượng:</div>
                    <span className='font-medium leading-none text-primary'>1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  )
}

export default ReviewCartItemModal
