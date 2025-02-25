import { useGetOrderDetailById } from '@/hooks/querys/order_detail.query'
import { OrderDetailType } from '@/types/order_detail.type'
import formatPrice from '@/utils/formatPrice'
import getPriceAfterDiscount from '@/utils/getPriceAfterDiscount'
import { Tag } from 'antd'
import React, { FC, HTMLAttributes } from 'react'

interface OrderDetailItemProps extends HTMLAttributes<HTMLDivElement> {
  orderDetail: OrderDetailType
}

const OrderDetailItem: FC<OrderDetailItemProps> = ({ orderDetail, className = '', ...props }) => {
  const { productVariant, price = 0, discount = 0, quantity } = orderDetail
  const finalPrice = formatPrice(getPriceAfterDiscount(price, discount))

  return (
    <div {...props} className={`flex bg-white py-3.5 p-1.5 pr-2.5 gap-x-6 ${className}`}>
      <img className='w-[110px] h-[110px] flex-shrink-0 ml-3' src={productVariant?.imageUrl} alt='Product' />
      <div className='flex flex-col flex-1 gap-y-2'>
        <div className='text-base font-medium text-black line-clamp-2 font-roboto'>{productVariant?.variantName}</div>
        <div className='flex'>
          {productVariant?.color && (
            <div>
              <Tag color='default' className='text-[10px] md:text-[12px] text-gray-500'>
                {productVariant.color}
              </Tag>
            </div>
          )}
          {productVariant?.storage && (
            <div>
              <Tag color='default' className='text-[10px] md:text-[12px] text-gray-500'>
                {productVariant.storage}
              </Tag>
            </div>
          )}
        </div>
        <div className='mt-auto font-bold text-primary'>{finalPrice}</div>
      </div>
      <div className='flex flex-col justify-between'>
        <div className='text-sm font-medium text-gray-400 font-roboto'></div>
        <div className='flex justify-end'>x{quantity}</div>
      </div>
    </div>
  )
}

export default OrderDetailItem
