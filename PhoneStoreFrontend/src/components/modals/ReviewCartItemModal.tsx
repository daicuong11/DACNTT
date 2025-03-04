import { Modal, Radio, RadioChangeEvent, Tag } from 'antd'
import React, { FC, useState } from 'react'
import AddressItem from '../address/AddressItem'
import { useAppSelector } from '../../hooks'
import { iphone1 } from '../../assets/images/iphone'
import formatPrice from '../../utils/formatPrice'
import classNames from 'classnames'
import getPriceAfterDiscount from '@/utils/getPriceAfterDiscount'

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
            key={cartItem.cartItemId}
            className={classNames('w-full p-2 bg-white', {
              'border-b border-gray-200': index !== orderSlice.cartItems.length - 1
            })}
          >
            <div className='flex gap-x-4'>
              <div className='w-[60px] h-[60px] md:w-[100px] md:h-[100px] flex-shrink-0'>
                <img src={iphone1} className='object-contain w-full h-full' />
              </div>
              <div className='flex flex-col w-full gap-y-2 text-sm md:text-base'>
                <div className='w-[70%] line-clamp-2 text-[#3a3a3a] text-[16px] font-medium'>
                  {cartItem.productVariant.fullNameVariant}
                </div>
                <div className='flex flex-col gap-y-2'>
                  <div className=''>
                    <Tag color='default' className='text-[10px] md:text-[12px] text-gray-500 font-medium'>
                      {cartItem.productVariant.color}
                    </Tag>
                  </div>
                  <div className='flex flex-col md:flex-row items-start sm:items-end justify-between w-full font-roboto gap-2'>
                    <div className='flex items-end gap-x-2'>
                      <span className='text-base font-semibold leading-none sm:text-lg text-primary'>
                        {formatPrice(
                          getPriceAfterDiscount(
                            cartItem.productVariant.price,
                            cartItem.productVariant.discountPercentage
                          )
                        )}
                      </span>
                      <span className='font-medium text-[#707070] text-xs sm:text-sm leading-none line-through'>
                        {formatPrice(cartItem.productVariant.price)}
                      </span>
                    </div>
                    <div className='flex gap-x-2 '>
                      <div className='text-sm font-medium leading-none text-slate-700 sm:text-base text-nowrap'>
                        Số lượng:
                      </div>
                      <span className='text-sm font-medium leading-none sm:text-base text-primary'>
                        {cartItem.quantity}
                      </span>
                    </div>
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
