import { FixedBottomLayout } from '../../layouts'
import formatPrice from '../../utils/formatPrice'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import Item from './components/Item'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Input } from 'antd'
import { toast } from 'react-toastify'
import { LoadingOpacity } from '../../components'
import { useAppDispatch, useAppSelector } from '../../hooks'
import useSetDocTitle from '../../hooks/useSetDocTitle'
import { useNavigate } from 'react-router-dom'
import FormCustomerInfo from './components/FormCustomerInfo'
import { setEmail, setInfoShipping, setNote, setShippingFee } from '@/features/order/order.slice'
import { AddressType } from '@/types/address.type'
import {
  useGetAllProvince,
  useGetDistrictByProvince,
  useGetShippingFee,
  useGetWardByDistrict
} from '@/hooks/querys/GHN.query'
import { ItemShippingFeeGHNRequest, ShippingFeeGHNRequest } from '@/types/GHN.type'
import { get } from 'http'

export interface InfoCustomerType {
  name: string
  phone: string
  province: string
  district: string
  ward: string
  address: string
  note: string
}

const initialInfoCustomer: InfoCustomerType = {
  name: '',
  phone: '',
  province: '',
  district: '',
  ward: '',
  address: '',
  note: ''
}

const checkShippingAddress = (shippingAddress: AddressType | null): boolean => {
  if (!shippingAddress) {
    return false
  }
  if (
    shippingAddress.province === '' ||
    shippingAddress.district === '' ||
    shippingAddress.ward === '' ||
    shippingAddress.street === ''
  ) {
    return false
  }
  return true
}

const PaymentInfoPage = () => {
  useSetDocTitle('BC Mobile - Giỏ hàng')

  const { mutate, isPending } = useGetShippingFee()

  const navigate = useNavigate()

  const orderSlice = useAppSelector((state) => state.order)
  const currentUser = useAppSelector((state) => state.auth.user)

  const dispatch = useAppDispatch()

  const [showAllProduct, setShowAllProduct] = useState<boolean>(false)

  const [emailInput, setEmailInput] = useState(orderSlice.email || '')
  const [infoCustomer, setInfoCustomer] = useState<InfoCustomerType>(
    orderSlice.shippingAddress
      ? {
          name: initialInfoCustomer.name,
          phone: initialInfoCustomer.phone,
          province: orderSlice.shippingAddress.province,
          district: orderSlice.shippingAddress.district,
          address: orderSlice.shippingAddress.street,
          ward: orderSlice.shippingAddress.ward,
          note: orderSlice.note || ''
        }
      : initialInfoCustomer
  )

  const { data: province, isLoading: isProvinceLoading } = useGetAllProvince()
  const { data: districts } = useGetDistrictByProvince(
    province?.find((p) => p.ProvinceName === infoCustomer.province)?.ProvinceID || 0
  )
  const { data: wards } = useGetWardByDistrict(
    districts?.find((d) => d.DistrictName === infoCustomer.district)?.DistrictID || 0
  )

  useEffect(() => {
    if (orderSlice.cartItems.length === 0) {
      navigate('/cart/')
    }
  }, [orderSlice.cartItems])

  useEffect(() => {
    if (currentUser) {
      if (emailInput.trim() === '') {
        setEmailInput(currentUser.email || '')
      }
    }
  }, [currentUser])

  const handleEmailInput = (value: string) => {
    setEmailInput(value)
  }

  const handleCheckEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (emailInput && !emailRegex.test(emailInput)) {
      toast.error('Vui lòng kiểm tra lại email')
      return false
    }
    return true
  }

  const handleSubmitGetInfoCustomer = async () => {
    if (!handleCheckEmail()) {
      return
    }

    if (emailInput) {
      dispatch(setEmail(emailInput))
    }

    const requiredFields: { key: keyof typeof infoCustomer; label: string }[] = [
      { key: 'name', label: 'Tên người nhận' },
      { key: 'phone', label: 'Số điện thoại' },
      { key: 'province', label: 'Tỉnh/Thành phố' },
      { key: 'district', label: 'Quận/Huyện' },
      { key: 'ward', label: 'Phường/Xã' },
      { key: 'address', label: 'Số nhà, tên đường' }
    ]

    const missingField = requiredFields.find((field) => !infoCustomer[field.key])

    if (missingField) {
      toast.error(`Quý khách vui lòng không bỏ trống ${missingField.label}`)
      return
    }

    if (infoCustomer.name.length < 3) {
      toast.error('Tên người nhận phải có ít nhất 3 ký tự')
      return
    }

    const phoneRegex = /^[0-9]{10,11}$/
    if (!phoneRegex.test(infoCustomer.phone)) {
      toast.error('Quý khách vui lòng kiểm tra lại số điện thoại người nhận thay')
      return
    }
    const findDistrictID = districts?.find((d) => d.DistrictName === infoCustomer.district)?.DistrictID
    const findWardCode = wards?.find((w) => w.WardName === infoCustomer.ward)?.WardCode

    if (findDistrictID && findWardCode) {
      const listItemRequest: ItemShippingFeeGHNRequest[] = orderSlice.cartItems.map((item) => {
        return {
          name: item.productVariant.fullNameVariant + '-' + item.productVariant.color,
          quantity: item.quantity
        }
      })

      const getQuantity = orderSlice.cartItems.reduce((acc, item) => acc + item.quantity, 0)
      const totalWeight = Math.round(getQuantity * 300)
      const totalHeight = Math.round(getQuantity * 6)
      const totalWidth = 30
      const totalLength = 30
      const getShippingFeeRequest: ShippingFeeGHNRequest = {
        service_type_id: 2,
        length: totalLength,
        width: totalWidth,
        height: totalHeight,
        weight: totalWeight,
        from_district_id: 1449,
        from_ward_code: '20706',
        to_district_id: findDistrictID,
        to_ward_code: findWardCode,
        items: listItemRequest
      }
      mutate(getShippingFeeRequest)
    }
    dispatch(
      setInfoShipping({
        customerInfo: { name: infoCustomer.name, phone: infoCustomer.phone },
        address: {
          addressId: -1,
          province: infoCustomer.province,
          district: infoCustomer.district,
          ward: infoCustomer.ward,
          street: infoCustomer.address,
          isDefault: false
        }
      })
    )
    dispatch(setNote(infoCustomer.note))
    navigate('/cart/payment')
  }

  return (
    <FixedBottomLayout
      navigateTo={() => navigate('/cart')}
      title='Thông tin'
      body={
        <div className='flex flex-col pb-40'>
          {isPending && <LoadingOpacity />}

          <div className='sticky top-0 z-[5] flex justify-between gap-x-6 bg-[#f4f6f8] pb-3'>
            <div
              className={classNames(
                'border-b-[3px] w-full text-center font-bold text-primary border-primary uppercase py-1.5'
              )}
            >
              1. thông tin
            </div>
            <div
              onClick={() => handleSubmitGetInfoCustomer()}
              className={classNames(
                'border-b-[3px] w-full text-center font-bold text-slate-500 border-slate-500 cursor-pointer uppercase py-1.5'
              )}
            >
              2. thanh toán
            </div>
          </div>
          <div
            className={classNames(
              'flex flex-col mt-2 bg-white border border-gray-200 rounded-lg px-3 sm:px-4',
              'overflow-hidden transition-all duration-500 ease-in-out'
            )}
          >
            {orderSlice.cartItems.map((item, index) => (
              <Item
                key={index}
                cartItem={item}
                className={classNames('overflow-hidden transition-all duration-300 ease-in-out rounded-none', {
                  ' invisible py-0 max-h-0': !showAllProduct && index > 0,
                  'max-h-screen visible box-border': showAllProduct,
                  'border-b border-gray-200': index < orderSlice.cartItems.length - 1 && showAllProduct
                })}
              />
            ))}
            {!showAllProduct && orderSlice.cartItems.length > 1 && (
              <div
                onClick={() => setShowAllProduct(true)}
                className='flex py-1.5 mb-1 gap-x-1 items-center justify-center cursor-pointer text-gray-500 hover:underline'
              >
                và {orderSlice.cartItems.length - 1} sản phẩm khác
                <ChevronDown size={16} strokeWidth={2} />
              </div>
            )}
            {showAllProduct && orderSlice.cartItems.length > 1 && (
              <div
                onClick={() => setShowAllProduct(false)}
                className='flex py-1.5 mb-2 gap-x-2 items-center justify-center cursor-pointer text-gray-500 hover:underline'
              >
                thu gọn
                <ChevronUp size={16} strokeWidth={1.6} />
              </div>
            )}
          </div>

          <div className='mt-6 space-y-3'>
            <div className='uppercase'>Thông tin khách hàng</div>
            <div className='p-5 space-y-4 bg-white border border-gray-300 rounded-lg'>
              <div className='flex items-center justify-between'>
                <div className='font-semibold'>{currentUser?.name}</div>
                <div className='text-[15px] font-medium text-gray-500 font-roboto'>{currentUser?.phoneNumber}</div>
              </div>
              <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
                <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>email</div>
                <Input
                  value={emailInput}
                  onChange={(e) => handleEmailInput(e.target.value)}
                  type='email'
                  variant='borderless'
                  placeholder='Nhập email nhận hóa đơn'
                  allowClear
                  className='text-base'
                />
              </div>
              <div className='text-[11px] font-medium italic text-gray-400'>
                (*) Hóa đơn VAT sẽ được gửi qua email này
              </div>
            </div>
          </div>
          <FormCustomerInfo infoCustomer={infoCustomer} setInfoCustomer={setInfoCustomer} />

          <div className='mt-1 space-x-1.5'>
            <span className='text-xs font-bold text-slate-600'>Mẹo:</span>
            <span className='text-xs text-slate-500'>
              Bạn có thể vào trang cá nhân cập nhật địa chỉ để đặt hàng nhanh hơn.
            </span>
          </div>
        </div>
      }
      footer={
        <div className='flex flex-col gap-y-1'>
          <div className='flex items-center justify-between w-full'>
            <div className='flex font-semibold'>Tổng tiền tạm tính:</div>
            <span className='text-base font-bold font-roboto text-primary'>{formatPrice(orderSlice.totalAmount)}</span>
          </div>
          <div className='mb-3 text-xs text-gray-500'>Chưa bao gồm chiết khấu</div>
          <button onClick={handleSubmitGetInfoCustomer} className='rounded-md btn btn-danger'>
            Tiếp tục
          </button>
        </div>
      }
    />
  )
}

export default PaymentInfoPage
