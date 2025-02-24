import { payment_success_video } from '@/assets/videos'
import { LoadingOpacity, MyDivider } from '@/components'
import { useGetOrderById } from '@/hooks/querys/order.query'
import { useCheckPayment } from '@/hooks/querys/vnpay.query'
import { FixedBottomLayout } from '@/layouts'
import formatPrice from '@/utils/formatPrice'
import { useNavigate, useSearchParams } from 'react-router-dom'

const VnpayPaymentResultPage = () => {
    const [searchParams] = useSearchParams();
    const { data: data1, } = useCheckPayment(searchParams);

    const orderId = data1?.description.replace('orderId_', '');

    const { data, isLoading, isError } = useGetOrderById(orderId || '')

    const navigate = useNavigate()

    return (
        <FixedBottomLayout
            navigateTo={() => navigate('/')}
            title='Hoàn tất đơn hàng'
            body={
                isError ? (
                    <div className='py-10 text-center text-primary'>Lỗi tải đơn hàng</div>
                ) : (
                    <div className='flex flex-col pb-28'>
                        {isLoading && <LoadingOpacity title={'Đang tải đơn hàng...'} />}
                        <div className='flex items-center py-3 !bg-white rounded-md bg-opacity-30'>
                            <div className='w-2/5'>
                                <video src={payment_success_video} className='ml-10 w-28 h-28' autoPlay loop />
                            </div>
                            <div className='flex flex-col items-start justify-center text-center gap-y-1'>
                                <div className='text-xl font-medium text-green-500 uppercase'>Đặt hàng thành công</div>
                                <div className='text-sm font-normal text-gray-500'>
                                    Vào tra cứu đơn hàng để xem thông tin vận chuyển
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
                                    <span className='font-sans font-semibold text-black'>Cần thanh toán</span>
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
                    </div>
                )
            }
            footer={
                <div className='flex flex-col gap-y-3'>
                    <button onClick={() => navigate('/')} className='btn btn-danger'>
                        Tiếp tục mua hàng
                    </button>
                </div>
            }
        />
    )
}

export default VnpayPaymentResultPage
