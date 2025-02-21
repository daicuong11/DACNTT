import { FixedBottomLayout } from '../../layouts'
import formatPrice from '../../utils/formatPrice'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { Input } from 'antd'
import { AppCheckBox, LoadingOpacity, MyDivider, PaymentMethodModal } from '../../components'
import useSetDocTitle from '../../hooks/useSetDocTitle'
import { Navigate, useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { atm_card_img } from '../../assets/images'
import { useAppDispatch, useAppSelector, useModal } from '../../hooks'
import { PaymentMethodType } from '../../types/app.type'
import { clearCoupon, clearOrder, setCoupon, setPaymentMethod } from '../../features/order/order.slice'
import { listPaymentMethod } from '../../datas/paymentMethod.data'
import { toast } from 'react-toastify'
import { CouponType } from '../../types/coupon.type'
import CouponItem from './components/CouponItem'
import { getCouponDiscount } from '../../utils/getCouponDiscount'
import { getTotalAmountOfCartItems } from '../../utils/getTotalAmountOfCartItems'
import { formatQuantity } from '../../utils/formatQuantity'
import ReviewCartItemModal from '../../components/modals/ReviewCartItemModal'
import getAddressString from '@/utils/getAddressString'
import { useAddCustomer } from '@/hooks/querys/customer.query'
import { useCreateOrder } from '@/hooks/querys/order.query'
import { useCreateGHNOrder } from '@/hooks/querys/GHN.query'
import { useCreatePayCOD } from '@/hooks/querys/payment.query'
import { CustomerRequestType } from '@/types/customer.type'
import { OrderRequestType } from '@/types/order.type'
import getPriceAfterDiscount from '@/utils/getPriceAfterDiscount'
import { CreateOrderGHNRequest, RequiredNoteGHN } from '@/types/GHN.type'
import { PayCodRequestType } from '@/types/payment.type'
import { set } from 'react-hook-form'

const PaymentConfirmPage = () => {
  useSetDocTitle('PhoneStore - Giỏ hàng')

  const { mutate: addCustomer } = useAddCustomer()
  const { mutate: createOrder } = useCreateOrder()
  const { mutate: createGHNOrder } = useCreateGHNOrder()
  const { mutate: createPayCOD } = useCreatePayCOD()

  const navigate = useNavigate()

  const orderSlice = useAppSelector((state) => state.order)
  const currentUser = useAppSelector((state) => state.auth.user)

  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useAppDispatch()

  const { openModal, closeModal, isOpen } = useModal()
  const reviewCartItemModalController = useModal()

  const [couponCodeInput, setCouponCodeInput] = useState('')
  const [couponActive, setCouponActive] = useState<CouponType | null>(null)
  const [isCheckTerms, setIsCheckTerms] = useState(true)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodType | null>(null)

  useEffect(() => {
    setSelectedPaymentMethod(listPaymentMethod.find((method) => method.name === orderSlice.paymentMethod) || null)
    if (orderSlice.coupon) {
      setCouponActive(orderSlice.coupon)
    }
  }, [orderSlice.coupon, orderSlice.paymentMethod])

  const handleSelectPaymentMethod = (method: PaymentMethodType | null) => {
    setSelectedPaymentMethod(method)
    if (method) {
      dispatch(setPaymentMethod(method.name))
      toast(`Đã chọn phương thức thanh toán thành công.`)
    }
  }

  const handleSearchCoupon = () => {
    const couponSearch = {
      couponId: 1,
      code: couponCodeInput,
      isPercentage: false,
      discountValue: 100000,
      minimumOrderAmount: 100000,
      maxUsageCount: 100,
      UsedCount: 0,
      StartDate: '2025-01-01',
      EndDate: '2025-12-31',
      isActive: true,
      ApplyToCategory: 'all',
      isSingleUse: false,
      userCreateId: 1
    }
    setCouponActive(couponSearch)
    dispatch(setCoupon(couponSearch))
    toast(`Áp dụng mã giảm giá thành công.`)
  }

  const handleClearCoupon = () => {
    setCouponActive(null)
    dispatch(clearCoupon())
    setCouponCodeInput('')
    toast(`Đã xóa mã giảm giá thành công.`)
  }

  const handlePayment = () => {
    if (!orderSlice.paymentMethod || orderSlice.paymentMethod.trim() === '') {
      toast.error('Vui lòng chọn phương thức thanh toán')
      return
    }
    setIsLoading(true)
    const getQuantity = orderSlice.cartItems.reduce((acc, item) => acc + item.quantity, 0)
    const totalWeight = Math.round(getQuantity * 300)
    const totalHeight = Math.round(getQuantity * 6)
    const totalWidth = 30
    const totalLength = 30
    if (orderSlice.paymentMethod === 'Thanh toán khi nhận hàng') {
      const customerReq: CustomerRequestType = {
        name: orderSlice.shippingInfo?.name!,
        phoneNumber: orderSlice.shippingInfo?.phone!,
        email: orderSlice.email!
      }
      const orderReq: OrderRequestType = {
        couponId: 1,
        customerId: -1,
        note: orderSlice.note!,
        shippingAddress: getAddressString(orderSlice.shippingAddress!),
        shippingFee: orderSlice.shippingFee!,
        totalAmount: orderSlice.totalAmount + orderSlice.shippingFee!,
        userId: currentUser!.id,
        orderDetailRequests: orderSlice.cartItems.map((item) => ({
          quantity: item.quantity,
          discount: item.productVariant.discountPercentage,
          price: item.productVariant.price,
          orderId: -1,
          productVariantId: item.productVariant.productVariantId,
          unitPrice:
            getPriceAfterDiscount(item.productVariant.price, item.productVariant.discountPercentage) * item.quantity
        }))
      }

      const orderGHNReq: CreateOrderGHNRequest = {
        client_order_code: 'order_123',
        height: totalHeight,
        length: totalLength,
        payment_type_id: 2,
        required_note: RequiredNoteGHN.CHOXEMHANGKHONGTHU,
        service_type_id: 2,
        to_address: getAddressString(orderSlice.shippingAddress!),
        to_district_name: orderSlice.shippingAddress?.district!,
        to_name: orderSlice.shippingInfo?.name!,
        to_phone: orderSlice.shippingInfo?.phone!,
        to_province_name: orderSlice.shippingAddress?.province!,
        to_ward_name: orderSlice.shippingAddress?.ward!,
        weight: totalWeight,
        width: totalWidth,
        items: orderSlice.cartItems.map((item) => ({
          name: item.productVariant.fullNameVariant,
          quantity: item.quantity
        }))
      }

      const payCodeReq: PayCodRequestType = {
        orderId: -1,
        amount: orderSlice.totalAmount + orderSlice.shippingFee!
      }

      // console.log(orderGHNReq)
      // console.log(orderReq)
      // console.log(customerReq)
      try {
        addCustomer(customerReq, {
          onSuccess: (customer) => {
            console.log('customer', customer)
            orderReq.customerId = customer.customerId
            createOrder(orderReq, {
              onSuccess: (order) => {
                console.log('order', order)
                orderGHNReq.client_order_code = `${order.orderId}`
                createGHNOrder(orderGHNReq, {
                  onSuccess: (ghnRes) => {
                    console.log('ghnRes', ghnRes)
                  },
                  onError: (err) => {
                    console.log(err)
                    setIsLoading(false)
                  }
                })

                payCodeReq.orderId = order.orderId
                payCodeReq.amount = order.totalAmount
                createPayCOD(payCodeReq, {
                  onSuccess: (payRes) => {
                    console.log('payRes', payRes)
                    setIsLoading(false)
                    navigate(`/payment/result/${order.orderId}`)
                  },
                  onError: (err) => {
                    console.log(err)
                    setIsLoading(false)
                    navigate(`/payment/result/${order.orderId}`)
                  }
                })
              },
              onError: (err) => {
                console.log(err)
                setIsLoading(false)
              }
            })
          },
          onError: (err) => {
            console.log(err)
            setIsLoading(false)
          }
        })
      } catch (err) {
        console.log(err)
      }
      // navigate('/cart/payment-result')
    } else if (orderSlice.paymentMethod === 'VNPay') {
      navigate('/payment/result')
    } else {
      toast.error('Lỗi trong quá trình thanh toán')
      navigate('/')
    }
  }

  if (!currentUser) {
    return <Navigate to='/signin' />
  }

  if (orderSlice.cartItems.length === 0) {
    return <Navigate to='/cart' />
  }

  return (
    <FixedBottomLayout
      navigateTo={() => navigate('/cart/payment-info')}
      title='Thông tin'
      body={
        <div className='flex flex-col pb-40'>
          <PaymentMethodModal
            selectMethod={selectedPaymentMethod}
            onFinish={handleSelectPaymentMethod}
            isOpen={isOpen}
            onClose={closeModal}
          />
          <ReviewCartItemModal
            isOpen={reviewCartItemModalController.isOpen}
            onClose={reviewCartItemModalController.closeModal}
          />
          {isLoading && <LoadingOpacity />}

          <div className='sticky top-0 z-[5] flex justify-between gap-x-6 bg-[#f4f6f8] pb-3'>
            <div
              onClick={() => navigate('/cart/payment-info')}
              className={classNames(
                'border-b-[3px] w-full text-center font-bold text-slate-500 border-slate-500 cursor-pointer uppercase py-1.5',
                {
                  '': true
                }
              )}
            >
              1. thông tin
            </div>
            <div
              className={classNames(
                'border-b-[3px] w-full text-center font-bold text-primary border-primary uppercase py-1.5'
              )}
            >
              2. thanh toán
            </div>
          </div>
          <div className='flex flex-col mt-2 gap-y-5'>
            <div className='p-5 space-y-4 bg-white border border-gray-300 rounded-lg'>
              {couponActive ? (
                <div className='flex flex-col items-start gap-y-2'>
                  <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Mã giảm giá</div>
                  <div className='ml-6'>
                    <CouponItem coupon={couponActive} onRemove={handleClearCoupon} />
                  </div>
                </div>
              ) : (
                <div className='flex items-end justify-between gap-x-4'>
                  <div className='flex w-full flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
                    <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Mã giảm giá</div>
                    <Input
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value)}
                      onPressEnter={handleSearchCoupon}
                      variant='borderless'
                      placeholder='Nhập mã giảm giá (chỉ áp dụng 1 lần)'
                      allowClear
                      className='text-base'
                    />
                  </div>
                  <div className=''>
                    <button
                      onClick={handleSearchCoupon}
                      className={classNames('text-sm font-normal border border-gray-100 btn text-nowrap', {
                        'btn-danger': couponCodeInput.length > 0,
                        'bg-gray-300 opacity-50 cursor-not-allowed shadow-none': couponCodeInput.length === 0
                      })}
                    >
                      Áp dụng
                    </button>
                  </div>
                </div>
              )}
              <div className='flex items-end  text-[15px] justify-between mt-1 font-roboto'>
                <span className='font-medium text-gray-500 '>Số lượng sản phẩm</span>
                <span className='text-gray-800'>
                  {formatQuantity(orderSlice.cartItems.reduce((total, item) => total + item.quantity, 0))}
                </span>
              </div>
              <div className='flex items-end  text-[15px] justify-between font-roboto'>
                <span className='font-medium text-gray-500 '>Tiền hàng (tạm tính)</span>
                <span className='tracking-tight text-gray-800'>
                  {formatPrice(getTotalAmountOfCartItems(orderSlice.cartItems))}
                </span>
              </div>
              <div className='flex items-end  text-[15px] justify-between font-roboto'>
                <span className='font-medium text-gray-500 '>Phí vận chuyển</span>
                <span className='text-gray-800'>
                  {orderSlice.shippingFee ? formatPrice(orderSlice.shippingFee) : 'Miễn phí'}
                </span>
              </div>
              {couponActive && (
                <div className='flex items-end  text-[15px] justify-between font-roboto'>
                  <span className='font-medium text-gray-500 '>Giảm giá</span>
                  <span className='text-primary'>{getCouponDiscount(couponActive).displayName}</span>
                </div>
              )}
              <MyDivider className='!h-[0.5px]' />
              <div className='flex items-end  text-[15px] justify-between font-roboto'>
                <span className='font-medium text-gray-500 '>
                  {' '}
                  <span className='mr-1 font-sans font-bold text-black'>Tổng tiền</span>(Đã bao gồm VAT)
                </span>
                <span className='font-sans font-bold tracking-tight text-black'>
                  {formatPrice(orderSlice.totalAmount + (orderSlice?.shippingFee ?? 0))}
                </span>
              </div>
            </div>
          </div>
          <div className='mt-6 space-y-3'>
            <div className='uppercase'>Thông tin thanh toán</div>
            <div
              onClick={openModal}
              className='flex items-center justify-between p-5 bg-white border border-gray-300 rounded-lg cursor-pointer'
            >
              <div className='flex items-center gap-x-4'>
                <div className='flex-shrink-0 w-10 h-10'>
                  <img className='object-contain w-full h-full' src={selectedPaymentMethod?.image || atm_card_img} />
                </div>
                {selectedPaymentMethod ? (
                  <div className='font-semibold'>{selectedPaymentMethod.name}</div>
                ) : (
                  <div className='flex flex-col gap-y-1'>
                    <div className='font-medium text-primary font-roboto'>Chọn phương thức thanh toán</div>
                    <div className='text-xs font-medium text-gray-500 font-roboto'>
                      Giảm thêm tới {formatPrice(500000)}
                    </div>
                  </div>
                )}
              </div>
              <div className='flex items-center text-primary gap-x-1'>
                <ChevronRight size={18} strokeWidth={3} />
              </div>
            </div>
          </div>
          <div className='mt-1 space-x-1.5'>
            <span className='text-xs font-bold text-slate-600'>Mẹo:</span>
            <span className='text-xs text-slate-500'>Bạn có thể nhấn vào để thay đổi phương thức thanh toán.</span>
          </div>
          <div className='mt-6 space-y-3'>
            <div className='uppercase'>Thông tin nhận hàng</div>
            <div className='p-5 space-y-4 bg-white border text-gray-900 border-gray-300 rounded-lg text-[15px]'>
              <div className='flex justify-between gap-x-4'>
                <span className='font-medium text-gray-500 w-[120px] flex-shrink-0 text-nowrap font-roboto '>
                  Khách hàng
                </span>
                <span className='font-medium text-end'>{orderSlice.shippingInfo?.name}</span>
              </div>
              <div className='flex justify-between gap-x-4'>
                <span className='font-medium text-gray-500 w-[120px] flex-shrink-0 text-nowrap font-roboto '>
                  Số điện thoại
                </span>
                <span className='font-semibold text-end'>{orderSlice.shippingInfo?.phone}</span>
              </div>
              {orderSlice.email && (
                <div className='flex justify-between gap-x-4'>
                  <span className='font-medium text-gray-500 w-[120px] flex-shrink-0 text-nowrap font-roboto '>
                    Email
                  </span>
                  <span className='font-semibold text-end'>{orderSlice.email}</span>
                </div>
              )}
              <div className='flex justify-between gap-x-4'>
                <span className='font-medium text-gray-500 w-[120px] flex-shrink-0 text-nowrap font-roboto '>
                  Nhận hàng tại
                </span>
                <span className='font-semibold text-end'>{getAddressString(orderSlice.shippingAddress!)}</span>
              </div>
              {orderSlice.note && (
                <div className='flex justify-between gap-x-4'>
                  <span className='font-medium text-gray-500 w-[120px] flex-shrink-0 text-nowrap font-roboto '>
                    Ghi chú
                  </span>
                  <span className='font-semibold text-end'>{orderSlice.note}</span>
                </div>
              )}
            </div>
          </div>
          <div className='my-6'>
            <AppCheckBox value={isCheckTerms} onChange={() => setIsCheckTerms(!isCheckTerms)}>
              Bằng việc Đặt hàng, bạn đồng ý với Điều khoản sử dụng của BC Mobile.
            </AppCheckBox>
          </div>
        </div>
      }
      footer={
        <div className='flex flex-col gap-y-3'>
          <div className='flex items-center justify-between w-full'>
            <div className='font-semibold'>Tổng tiền tạm tính:</div>
            <span className='text-base font-bold font-roboto text-primary'>
              {formatPrice(orderSlice.totalAmount + (orderSlice?.shippingFee ?? 0))}
            </span>
          </div>
          <button onClick={handlePayment} className='rounded-md btn btn-danger'>
            Thanh toán
          </button>
          <button
            onClick={reviewCartItemModalController.openModal}
            className='text-sm text-blue-600 rounded-md shadow-none btn hover:underline'
          >
            Kiểm tra danh sách sản phẩm ({formatQuantity(orderSlice.cartItems.length)})
          </button>
        </div>
      }
    />
  )
}

export default PaymentConfirmPage
