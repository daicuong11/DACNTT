import { OrderStatusMap } from '@/datas/OrderStatusMap'
import { useGetOrderById } from '@/hooks/querys/order.query'
import { OrderDetailType } from '@/types/order_detail.type'
import { formatterDay } from '@/utils/formatterDay'
import { Tag } from 'antd'
import { ArrowLeft, MapPin, Phone, User2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import OrderDetailItem from './components/OrderDetailItem'
import classNames from 'classnames'
import { atm_card_img } from '@/assets/images'
import formatPrice from '@/utils/formatPrice'
import { LoadingOpacity, MyDivider } from '@/components'

const OrderDetailPage = () => {
  const { orderId } = useParams<{ orderId: string }>()

  const { data: order, isLoading, isError } = useGetOrderById(orderId || '')
  const navigate = useNavigate()

  if (isError) return <div>Error...</div>

  return (
    <div className='flex flex-col py-5 pb-20'>
      {isLoading && <LoadingOpacity />}
      <div className='flex items-center'>
        <span onClick={() => navigate(-1)} className='px-3 text-gray-400 cursor-pointer hover:text-gray-600'>
          <ArrowLeft size={26} strokeWidth={1.6} />
        </span>
        <div className='text-2xl font-semibold text-black'>Chi tiết đơn hàng</div>
      </div>
      <div className='flex justify-between mt-4'>
        <div className='flex flex-col gap-y-3 gap-x-2'>
          <div className='text-sm font-medium text-gray-600'>
            Mã đơn hàng: <span className='text-base font-semibold text-black'>{order?.orderId}</span>
          </div>
          <div className='text-sm font-medium text-gray-600'>
            {order ? formatterDay.format(new Date(order.orderDate)) : ''}
          </div>
        </div>
        <div className=''>
          <Tag
            className='m-0'
            color={classNames({
              green: order?.status.toLowerCase() === 'delivered',
              purple: order?.status.toLowerCase() === 'delivering',
              default: order?.status.toLowerCase() === 'cancel',
              processing: order?.status.toLowerCase() === 'ready_to_pick',
              volcano: order?.status.toLowerCase() === 'pending'
            })}
          >
            {OrderStatusMap[order?.status.toLowerCase() || ''] || 'Trạng thái lỗi'}
          </Tag>
        </div>
      </div>

      <div className='p-2 mt-4 bg-white rounded-lg'>
        {order?.orderDetails.map((orderDetail: OrderDetailType, index) => (
          <OrderDetailItem
            key={orderDetail.orderDetailId}
            orderDetail={orderDetail}
            className={classNames({
              '!border-t border-gray-200': index !== 0
            })}
          />
        ))}
      </div>

      <div className='p-4 mt-4 space-y-4 bg-white rounded-lg'>
        <div className='flex items-center gap-x-2'>
          <img className='w-[32px]' src={atm_card_img} />
          <span className='text-lg font-semibold'>Thông tin thanh toán</span>
        </div>
        <div className='flex flex-col gap-y-3 font-roboto'>
          <div className='flex text-[15px] text-gray-500 justify-between gap-x-4 font-medium'>
            <span className=''>Tổng tiền sản phẩm:</span>
            <span className='font-medium text-gray-500'>
              {formatPrice(order?.orderDetails.reduce((total, item) => total + item.unitPrice, 0) || 0)}
            </span>
          </div>
          <div className='flex text-[15px] text-gray-500 justify-between gap-x-4 font-medium'>
            <span className=''>Phí vận chuyển:</span>
            <span className='font-medium text-gray-500'>{formatPrice(order?.shippingFee || 0)}</span>
          </div>
          <MyDivider />
          <div className='flex text-[15px] text-gray-500 justify-between gap-x-4 font-medium'>
            <span className=''>Phải thanh toán:</span>
            <span className='font-bold text-gray-800'>{formatPrice(order?.totalAmount || 0)}</span>
          </div>
          <div className='flex text-[15px] text-gray-500 justify-between gap-x-4 font-medium'>
            <span className='font-sans text-black'>Còn phải thanh toán:</span>
            <span className='font-bold text-primary'>
              {formatPrice(order?.payment.paymentStatus.toLowerCase() === 'success' ? 0 : order?.totalAmount || 0)}
            </span>
          </div>
        </div>
      </div>

      <div className='p-4 mt-4 space-y-4 bg-white rounded-lg'>
        <div className='flex items-center gap-x-2'>
          <img className='w-[32px]' src={atm_card_img} />
          <span className='text-lg font-semibold'>Thông tin khách hàng</span>
        </div>

        <div className='flex flex-col text-gray-600 gap-y-3 font-roboto'>
          <div className='flex gap-x-4'>
            <span className=''>
              <User2 size={20} strokeWidth={1.6} />
            </span>
            <span className=''>{order?.customer.name}</span>
          </div>
          <div className='flex gap-x-4'>
            <span className=''>
              <Phone size={20} strokeWidth={1.6} />
            </span>
            <span className=''>{order?.customer.phoneNumber}</span>
          </div>
          <div className='flex gap-x-4'>
            <span className=''>
              <MapPin size={20} strokeWidth={1.6} />
            </span>
            <span className=''>{order?.shippingAddress}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailPage
