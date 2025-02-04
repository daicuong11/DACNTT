import { maskPhoneNumber } from '@/utils/maskPhoneNumber'
import { EyeFilled, EyeInvisibleFilled, UserOutlined } from '@ant-design/icons'
import { Avatar, Tag, DatePicker, DatePickerProps } from 'antd'
import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import classNames from 'classnames'
import OrderItem from './components/OrderItem'

const { RangePicker } = DatePicker
dayjs.extend(customParseFormat)

const listOrderStatus = ['Tất cả', 'Chờ xác nhận', 'Đã xác nhận', 'Đang vận chuyển', 'Đã giao hàng', 'Đã hủy']

interface OrderHistoryPageProps {}

const OrderHistoryPage: FC<OrderHistoryPageProps> = () => {
  const [isShowPhoneNumber, setIsShowPhoneNumber] = useState(false)
  const [orderStatus, setOrderStatus] = useState(listOrderStatus[0])
  const navigate = useNavigate()

  return (
    <div className='py-4'>
      <div className='flex px-2 gap-x-2'>
        <Avatar size={72} icon={<UserOutlined />} />
        <div className='flex flex-col gap-y-0.5'>
          <h1 className='text-[19px] font-semibold text-pink-600 uppercase leading-none'>Đạo Thanh Hưng</h1>
          <div className='flex items-center text-sm font-medium text-gray-500 gap-x-2'>
            {isShowPhoneNumber ? '0987654321' : maskPhoneNumber('0987654321')}
            {isShowPhoneNumber ? (
              <EyeInvisibleFilled onClick={() => setIsShowPhoneNumber(false)} className='p-1 text-lg cursor-pointer' />
            ) : (
              <EyeFilled onClick={() => setIsShowPhoneNumber(true)} className='p-1 text-lg cursor-pointer' />
            )}
          </div>
          <span>
            <Tag color='red'>Quản trị viên</Tag>
          </span>
        </div>
      </div>

      <div className='flex items-center justify-between mt-3 p-3 text-black bg-white border rounded-lg h-[114px]'>
        <div className='flex flex-col items-center justify-center flex-1 gap-y-4'>
          <h1 className='text-3xl font-bold'>3</h1>
          <h5 className='text-[13px]'>đơn hàng</h5>
        </div>
        <div className='w-[1px] bg-black-2 h-20'></div>
        <div className='flex flex-col items-center justify-center flex-1 gap-y-4'>
          <h1 className='text-3xl font-bold'>0đ</h1>
          <h5 className='text-[13px]'>Tổng tiền tích lũy từ 1/1/2025</h5>
        </div>
      </div>

      <div className='mt-3'>
        <RangePicker
          defaultValue={[dayjs('01/01/2015', 'DD/MM/YYYY'), dayjs('01/01/2015', 'DD/MM/YYYY')]}
          onChange={(dates, dateStrings) => console.log(dates, dateStrings)}
          format={'DD/MM/YYYY'}
        />
      </div>
      <div className='sticky flex mt-3 gap-x-3 top-[84px] z-10'>
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
        {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
          <OrderItem key={index} />
        ))}
      </div>
    </div>
  )
}

export default OrderHistoryPage
