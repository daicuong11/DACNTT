import { iphone1 } from '@/assets/images/iphone'
import formatPrice from '@/utils/formatPrice'
import { Tag } from 'antd'
import React, { FC } from 'react'

interface OrderItemProps {}

const OrderItem: FC<OrderItemProps> = () => {
  return (
    <div className='flex bg-white rounded-lg py-3.5 p-1.5 pr-2.5 gap-x-6 cursor-pointer'>
      <img className='w-[110px] h-[110px] flex-shrink-0 ml-3' src={iphone1} />
      <div className='flex flex-col flex-1 gap-y-2'>
        <div className='text-base font-medium text-black line-clamp-2 font-roboto'>Iphone 16 Pro Max 512GB</div>
        <span className=''>
          <Tag bordered={false} className='px-3 py-0.5' color='purple'>
            Đã hủy
          </Tag>
        </span>
        <div className='mt-auto font-bold text-primary'>{formatPrice(23000000)}</div>
      </div>
      <div className='flex flex-col justify-between'>
        <div className='text-sm font-medium text-gray-400 font-roboto'>02/02/2025 20:16</div>
        <button className='py-1 text-xs font-normal rounded-md btn btn-outline'>Xem chi tiết</button>
      </div>
    </div>
  )
}

export default OrderItem
