import { OrderResponseType } from '@/types/order.type'
import { OrderDetailType } from '@/types/order_detail.type'
import formatPrice from '@/utils/formatPrice'
import { Tag } from 'antd'
import React, { FC } from 'react'
import OrderDetailItem from './OrderDetailItem'
import classNames from 'classnames'
import { OrderStatusMap } from '@/datas/OrderStatusMap'
import { useNavigate } from 'react-router-dom'
import { formatterDay } from '@/utils/formatterDay'

interface OrderItemProps {
  orderItem: OrderResponseType
}

const OrderItem: FC<OrderItemProps> = ({ orderItem }) => {
  const navigate = useNavigate()

  const handleDetailClick = () => {
    navigate(`/profile/order/order-detail/${orderItem.orderId}`)
  }
  return (
    <div className='bg-white rounded-lg'>
      <div className='flex items-center justify-between p-3.5 pb-2'>
        <div className='flex text-sm font-medium leading-none text-gray-700 gap-x-1'>
          Ngày đặt hàng:
          <div className='text-sm font-medium leading-none text-gray-400 font-roboto'>
            {formatterDay.format(new Date(orderItem.createdAt))}
          </div>
        </div>
        <div className=''>
          <Tag bordered={false} className='px-3 py-0.5' color='purple'>
            {OrderStatusMap[orderItem.status.toLowerCase()] || 'Trạng thái lỗi'}
          </Tag>
        </div>
      </div>
      <div className='px-2'>
        {orderItem.orderDetails.map((orderDetail: OrderDetailType, index) => (
          <OrderDetailItem
            key={orderDetail.orderDetailId}
            orderDetail={orderDetail}
            className={classNames({
              '!border-t border-gray-200': index !== 0
            })}
          />
        ))}
      </div>
      <div className='flex justify-between'>
        <div></div>
        <div className='flex flex-col p-3.5 gap-y-3'>
          <div className='flex items-end text-sm font-medium leading-none text-gray-700 gap-x-2'>
            {orderItem.orderDetails.reduce((sum, order) => sum + order.quantity, 0)} mặt hàng:
            <div className='text-base font-bold leading-none text-primary'>{formatPrice(orderItem.totalAmount)}</div>
          </div>
          <div className='flex justify-end'>
            <button onClick={handleDetailClick} className='py-1 text-xs font-normal rounded btn btn-outline'>
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderItem
