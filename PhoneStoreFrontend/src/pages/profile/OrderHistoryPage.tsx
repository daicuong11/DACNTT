import { maskPhoneNumber } from '@/utils/maskPhoneNumber'
import { EyeFilled, EyeInvisibleFilled, UserOutlined } from '@ant-design/icons'
import { Avatar, Tag, DatePicker, DatePickerProps } from 'antd'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import classNames from 'classnames'
import OrderItem from './components/OrderItem'
import { useAppSelector } from '@/hooks'
import { useGetOrderByUserId, useGetOrdersByStatus } from '@/hooks/querys/order.query'
import { AvatarCustom, LoadingOpacity } from '@/components'
import { OrderStatusEnum } from '@/enums'
import formatPrice from '@/utils/formatPrice'

const { RangePicker } = DatePicker
dayjs.extend(customParseFormat)

const listOrderStatus = ['Tất cả', 'Chờ xác nhận', 'Đã xác nhận', 'Đang vận chuyển', 'Đã giao hàng', 'Đã hủy']

const OrderStatusMap = Object.fromEntries(Object.entries(OrderStatusEnum).map(([key, value]) => [value, key]))

const getKeyByValueStatus = (value: string) => {
  return OrderStatusMap[value] || 'all'
}

interface OrderHistoryPageProps {}

const OrderHistoryPage: FC<OrderHistoryPageProps> = () => {
  const currentUser = useAppSelector((state) => state.auth.user)
  const [isShowPhoneNumber, setIsShowPhoneNumber] = useState(false)
  const [orderStatus, setOrderStatus] = useState(listOrderStatus[0])

  const { data: orders, isLoading } = useGetOrdersByStatus(currentUser?.id || 0, getKeyByValueStatus(orderStatus))
  const { data: ordersAll, isLoading: isLoadingOrderAll } = useGetOrdersByStatus(currentUser?.id || 0, 'all')

  const totalPay = useMemo(() => {
    return ordersAll?.reduce((total, order) => {
      if (order.status === 'delivered') {
        return total + order.totalAmount
      }
      return total
    }, 0)
  }, [ordersAll])

  return (
    <div className='py-4'>
      {isLoading && <LoadingOpacity />}
      <div className='flex px-2 gap-x-2'>
        <AvatarCustom size={72} name={currentUser?.name || ''} role={currentUser?.role} />

        <div className='flex flex-col gap-y-0.5'>
          <h1 className='text-[19px] font-semibold text-pink-600 uppercase leading-none'>{currentUser?.name}</h1>
          <div className='flex items-center text-sm font-medium text-gray-500 gap-x-2'>
            {isShowPhoneNumber ? currentUser?.phoneNumber : maskPhoneNumber(currentUser?.phoneNumber || '')}
            {isShowPhoneNumber ? (
              <EyeInvisibleFilled onClick={() => setIsShowPhoneNumber(false)} className='p-1 text-lg cursor-pointer' />
            ) : (
              <EyeFilled onClick={() => setIsShowPhoneNumber(true)} className='p-1 text-lg cursor-pointer' />
            )}
          </div>
          <span>
            <Tag color='red'>{currentUser?.role}</Tag>
          </span>
        </div>
      </div>

      <div
        className={classNames(
          'flex items-center flex-1 justify-between mt-6 p-3 text-black bg-white border rounded-lg',
          {
            'animate-pulse': isLoadingOrderAll
          }
        )}
      >
        <div className='flex flex-col items-center justify-center flex-1 gap-y-4'>
          <h1 className='text-xl font-bold sm:text-3xl'>{ordersAll?.length}</h1>
          <h5 className='text-[11px] sm:text-[13px]'>đơn hàng</h5>
        </div>
        <div className='w-[1px] bg-black-2 h-20'></div>
        <div className='flex flex-col items-center justify-center flex-1 gap-y-4'>
          <h1 className='text-xl font-bold sm:text-3xl'>{formatPrice(totalPay || 0)}</h1>
          <h5 className='text-[11px] sm:text-[13px]'>Tổng tiền tích lũy mua sắm</h5>
        </div>
      </div>

      {/* <div className='mt-3'>
        <RangePicker
          defaultValue={[dayjs('01/01/2015', 'DD/MM/YYYY'), dayjs('01/01/2015', 'DD/MM/YYYY')]}
          onChange={(dates, dateStrings) => console.log(dates, dateStrings)}
          format={'DD/MM/YYYY'}
        />
      </div> */}
      <div className='sticky flex mt-3 gap-x-2 sm:gap-x-3 top-[84px] z-10 overflow-x-auto text-sm sm:text-base'>
        {listOrderStatus.map((status) => (
          <button
            key={status}
            onClick={() => setOrderStatus(status)}
            className={classNames('border rounded-md transition-all drop-shadow-sm py-1.5 px-3', {
              'bg-white hover:bg-gray-50': orderStatus !== status,
              'bg-primary text-white': orderStatus === status
            })}
          >
            {status}
          </button>
        ))}
      </div>

      <div className='flex flex-col mt-3 gap-y-2.5 mb-20'>
        {orders?.map((order, index) => <OrderItem key={index} orderItem={order} />)}
      </div>
    </div>
  )
}

export default OrderHistoryPage
