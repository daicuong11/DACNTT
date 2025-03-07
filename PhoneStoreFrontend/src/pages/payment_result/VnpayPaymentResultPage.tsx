import { payment_success_video } from '@/assets/videos'
import { LoadingOpacity, MyDivider } from '@/components'
import { PaymentStatusEnum } from '@/enums'
import { useGetOrderById } from '@/hooks/querys/order.query'
import { useCheckPayment } from '@/hooks/querys/vnpay.query'
import { FixedBottomLayout } from '@/layouts'
import formatPrice from '@/utils/formatPrice'
import getPriceAfterDiscount from '@/utils/getPriceAfterDiscount'
import { Tag } from 'antd'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const VnpayPaymentResultPage = () => {
  const [searchParams] = useSearchParams()
  const { data: data1 } = useCheckPayment(searchParams)

  const orderId = data1?.description.replace('orderId_', '')

  const { data, isLoading, isError } = useGetOrderById(orderId || '')

  const navigate = useNavigate()

  return (
    <FixedBottomLayout
      navigateTo={() => navigate('/')}
      title={`Hoàn tất đơn hàng`}
      body={
        isError ? (
          <div className='py-10 text-center text-primary'>Lỗi tải đơn hàng</div>
        ) : (
          <div className='flex flex-col pb-28'>
            {isLoading && <LoadingOpacity title={'Đang tải đơn hàng...'} />}
            <div
              className={`flex items-center py-3 rounded-md bg-opacity-30 ${data1?.isSuccess ? '!bg-white' : 'bg-red-200'}`}
            >
              <div className='w-2/5'>
                {data1 && data1?.isSuccess ? (
                  <video src={payment_success_video} className='ml-1 lg:ml-10 w-28 h-28' autoPlay loop />
                ) : (
                  <img
                    src={'https://static-cart.cellphones.com.vn/cart/_nuxt/img/cart-error.e04728c.svg'}
                    className='w-28 h-28'
                  />
                )}
              </div>
              <div className='flex flex-col items-start justify-center text-center gap-y-1'>
                <div
                  className={`md:text-xl text-base font-medium ${data1?.isSuccess ? 'text-green-500 uppercase' : 'text-red-500 uppercase'}`}
                >
                  {data1?.isSuccess ? 'Đặt hàng thành công' : 'Đặt hàng không thành công'}
                </div>
                <div className='text-xs font-normal text-gray-500 md:text-sm'>
                  {data1?.isSuccess
                    ? 'Vào tra cứu đơn hàng để xem thông tin vận chuyển'
                    : 'Vui lòng kiểm tra lại thông tin đặt hàng & thanh toán'}
                </div>
              </div>
            </div>

            <div className='mt-6 space-y-3'>
              <div className='uppercase'>Thông tin đơn hàng</div>

              <div className='p-5 space-y-4 bg-white border border-gray-300 rounded-lg'>
                <div className='flex items-end  text-[15px] justify-between mt-1 font-roboto'>
                  <span className='font-medium text-gray-500 '>Mã đơn hàng</span>
                  <span className='font-semibold text-gray-800'>{data?.orderId}</span>
                </div>
                <MyDivider className='!h-[0.5px]' />
                <div className='flex items-end  text-[15px] justify-between mt-1 font-roboto'>
                  <span className='font-medium text-gray-500 '>Số lượng sản phẩm</span>
                  <span className='font-semibold text-gray-800'>
                    {data?.orderDetails.reduce((total, item) => total + item.quantity, 0) || 0}
                  </span>
                </div>
                <div className='flex items-end  text-[15px] justify-between font-roboto'>
                  <span className='font-medium text-gray-500 '>Phí vận chuyển</span>
                  <span className='text-gray-800'>
                    {data?.shippingFee ? formatPrice(data.shippingFee || 0) : 'Miễn phí'}
                  </span>
                </div>

                <div className='flex items-end  text-[15px] justify-between font-roboto'>
                  <span className='font-medium text-gray-500 '>Tổng tiền (đã bao gồm VAT)</span>
                  <span className='font-semibold tracking-tight text-gray-800'>
                    {formatPrice(data?.totalAmount || 0)}

                    {/* {formatPrice(data?.orderDetails.reduce((total, item) => total + item.unitPrice, 0) || 0)} */}
                  </span>
                </div>
                <div className='flex items-end  text-[15px] justify-between font-roboto'>
                  <span className='font-medium text-gray-500 '>Phương thức thanh toán</span>
                  <span className='text-gray-800'>
                    {data?.payment.paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng' : data?.payment.paymentMethod}
                  </span>
                </div>
                <MyDivider className='!h-[0.5px]' />
                <div className='flex items-end  text-[15px] justify-between font-roboto'>
                  <span className='font-sans font-semibold text-black'>
                    {data?.payment.paymentStatus === PaymentStatusEnum.SUCCESS ? 'Đã thanh toán' : 'Cần thanh toán'}
                  </span>
                  <span className='font-sans font-bold tracking-tight text-primary'>
                    {formatPrice(data?.totalAmount || 0)}
                  </span>
                </div>
              </div>
            </div>

            <div className='mt-6 space-y-3'>
              <div className='uppercase'>Thông tin nhận hàng</div>
              <div className='p-5 space-y-4 bg-white border text-gray-900 border-gray-300 rounded-lg text-[15px]'>
                <div className='flex justify-between gap-x-4'>
                  <span className='font-medium text-gray-500 w-[120px] flex-shrink-0 text-nowrap font-roboto '>
                    Khách hàng
                  </span>
                  <span className='font-medium text-end'>{data?.customer.name}</span>
                </div>
                <div className='flex justify-between gap-x-4'>
                  <span className='font-medium text-gray-500 w-[120px] flex-shrink-0 text-nowrap font-roboto '>
                    Số điện thoại
                  </span>
                  <span className='font-semibold text-end'>{data?.customer.phoneNumber}</span>
                </div>
                {data?.customer.email && (
                  <div className='flex justify-between gap-x-4'>
                    <span className='font-medium text-gray-500 w-[120px] flex-shrink-0 text-nowrap font-roboto '>
                      Email
                    </span>
                    <span className='font-semibold text-end'>{data.customer.email}</span>
                  </div>
                )}
                <div className='flex justify-between gap-x-4'>
                  <span className='font-medium text-gray-500 w-[120px] flex-shrink-0 text-nowrap font-roboto '>
                    Nhận hàng tại
                  </span>
                  <span className='font-semibold text-end'>{data?.shippingAddress}</span>
                </div>
                {data?.note && (
                  <div className='flex justify-between gap-x-4'>
                    <span className='font-medium text-gray-500 w-[120px] flex-shrink-0 text-nowrap font-roboto '>
                      Ghi chú
                    </span>
                    <span className='font-semibold text-end'>{data.note}</span>
                  </div>
                )}
              </div>
            </div>

            <div className='mt-6 space-y-3'>
              <div className='uppercase'>Danh sách sản phẩm</div>
              {data?.orderDetails.map((item, index) => (
                <div
                  key={index}
                  className='p-5 space-y-4 bg-white border text-gray-900 border-gray-300 rounded-lg text-[15px]'
                >
                  <div className='flex gap-x-4'>
                    <div className='w-[100px] h-[100px] flex-shrink-0'>
                      <img src={item.productVariant.imageUrl} className='object-contain w-full h-full' />
                    </div>
                    <div className='flex flex-col w-full gap-y-2'>
                      {item.productVariant.variantName}
                      <div className='flex flex-col'>
                        <div className=''>
                          <Tag color='default' className='text-[10px] md:text-[12px] text-gray-500 font-medium'>
                            {item.productVariant.color}
                          </Tag>
                        </div>
                        <div className='flex flex-col justify-between w-full gap-2 sm:items-end sm:flex-row'>
                          <div className='flex items-end gap-x-2'>
                            <span className='text-lg font-medium leading-none text-primary'>
                              {formatPrice(getPriceAfterDiscount(item.productVariant.price, item.discount ?? 0))}
                            </span>
                            <span className='font-medium text-[#707070] text-sm leading-none line-through'>
                              {formatPrice(item.productVariant.price)}
                            </span>
                          </div>
                          <div className='flex gap-x-0.5 justify-end'>
                            Số lượng:
                            <div className='text-red-600'>{item.quantity}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }
      footer={
        data1 && data1.isSuccess ? (
          <div className='flex flex-col gap-y-3'>
            <button onClick={() => navigate('/')} className='btn btn-danger'>
              Tiếp tục mua hàng
            </button>
          </div>
        ) : (
          <div className='flex flex-row gap-x-3 text-nowrap'>
            <button onClick={() => navigate('/')} className='flex-1 btn btn-outline'>
              Xem sản phẩm khác
            </button>
            <button onClick={() => navigate('/cart')} className='flex-1 btn btn-danger'>
              Mua lại
            </button>
          </div>
        )
      }
    />
  )
}

export default VnpayPaymentResultPage
