import { FixedBottomLayout } from '../../layouts'
import formatPrice from '../../utils/formatPrice'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import Item from './components/Item'
import { ChevronDown, ChevronRight, ChevronUp } from 'lucide-react'
import { ConfigProvider, Input, Select } from 'antd'
import { toast } from 'react-toastify'
import { SelectAddressModal } from '../../components'
import { useAppDispatch, useAppSelector, useModal } from '../../hooks'
import { AddressFormType, AddressType } from '../../types/address.type'
import getAddressString from '../../utils/getAddressString'
import useSetDocTitle from '../../hooks/useSetDocTitle'
import { useNavigate } from 'react-router-dom'
import { setEmail, setInfoShipping, setNote, setShippingAddress } from '../../features/order/order.slice'
interface InfoCustomerType {
  name: string
  phone: string
  province: string
  district: string
  ward: string
  address: string
  note: string
}

const initialInfoCustomer: InfoCustomerType = {
  name: 'Lý Đại Cương',
  phone: '0333333333',
  province: 'Hồ Chí Minh',
  district: '',
  ward: '',
  address: '',
  note: ''
}

const districtOptions = [
  { value: 'Hồ Chí Minh', label: 'Hồ Chí Minh' },
  { value: 'Hà Nội', label: 'Hà Nội' },
  { value: 'Đà Nẵng', label: 'Đà Nẵng' },
  { value: 'Hải Phòng', label: 'Hải Phòng' },
  { value: 'Cần Thơ', label: 'Cần Thơ' }
]

const exampleListAddress: AddressType[] = [
  {
    addressId: 1,
    province: 'Hồ Chí Minh',
    district: 'Quận 1',
    ward: 'Phường Bến Nghé',
    street: 'Số 1 Đại Cương',
    isDefault: true
  },
  {
    addressId: 2,
    province: 'Hồ Chí Minh',
    district: 'Quận 2',
    ward: 'Phường Thảo Điền',
    street: 'Số 2 Đại Cương',
    isDefault: false
  }
]

const handleGetAddressDefault = () => {
  if (exampleListAddress.length === 0) {
    return null
  }
  const addressDefault = exampleListAddress.find((address) => address.isDefault)
  if (addressDefault) {
    return addressDefault
  }
  return exampleListAddress[0]
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
  useSetDocTitle('PhoneStore - Giỏ hàng')

  const navigate = useNavigate()

  const orderSlice = useAppSelector((state) => state.order)
  const dispatch = useAppDispatch()

  const [showAllProduct, setShowAllProduct] = useState<boolean>(false)
  const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(null)

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
  const [emailInput, setEmailInput] = useState(orderSlice.email || '')

  const { isOpen, closeModal, openModal } = useModal()

  useEffect(() => {
    if (orderSlice.cartItems.length === 0) {
      navigate('/cart/')
    }
  }, [orderSlice.cartItems])

  useEffect(() => {
    if (selectedAddress) {
      setInfoCustomer({
        ...infoCustomer,
        province: selectedAddress.province,
        district: selectedAddress.district,
        ward: selectedAddress.ward,
        address: selectedAddress.street
      })
    }
  }, [selectedAddress])

  useEffect(() => {
    if (checkShippingAddress(orderSlice.shippingAddress)) {
      if (orderSlice.shippingAddress?.addressId == -1) {
        setSelectedAddress(null)
        setInfoCustomer({
          ...infoCustomer,
          province: orderSlice.shippingAddress.province,
          district: orderSlice.shippingAddress.district,
          ward: orderSlice.shippingAddress.ward,
          address: orderSlice.shippingAddress.street
        })
      } else {
        setSelectedAddress(orderSlice.shippingAddress)
      }
    } else {
      setSelectedAddress(handleGetAddressDefault())
    }
  }, [])

  const handleInfoCustomer = (key: string, value: string) => {
    setInfoCustomer({ ...infoCustomer, [key]: value })
  }

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

  const handleOpenNewForm = () => {
    setSelectedAddress(null)
    setInfoCustomer({
      ...infoCustomer,
      province: '',
      district: '',
      ward: '',
      address: ''
    })
  }

  const handleSubmitGetInfoCustomer = () => {
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
    dispatch(
      setInfoShipping({
        customerInfo: { name: infoCustomer.name, phone: infoCustomer.phone },
        address: selectedAddress || {
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
          {exampleListAddress.length > 1 && (
            <SelectAddressModal
              isOpen={isOpen}
              onClose={closeModal}
              listAddress={exampleListAddress}
              onFinishedSelectAddress={(address) => setSelectedAddress(address)}
            />
          )}

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
                <div className='font-semibold'>Lý Đại Cương</div>
                <div className='text-[15px] font-medium text-gray-500 font-roboto'>0333333333</div>
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
          <div className='mt-6 space-y-3'>
            <div className='uppercase'>Thông tin nhận hàng</div>

            <div className='p-5 space-y-4 bg-white border border-gray-300 rounded-lg'>
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      fontSize: 16
                    }
                  }
                }}
              >
                <div className='flex flex-col sm:grid sm:grid-cols-2 gap-x-3 gap-y-5'>
                  <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
                    <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>
                      tên người nhận
                    </div>
                    <Input
                      value={infoCustomer.name}
                      onChange={(e) => handleInfoCustomer('name', e.target.value)}
                      variant='borderless'
                      placeholder='Họ tên người nhận'
                      allowClear
                      className='text-base'
                    />
                  </div>
                  <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
                    <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>
                      sđt người nhận
                    </div>
                    <Input
                      value={infoCustomer.phone}
                      onChange={(e) => handleInfoCustomer('phone', e.target.value)}
                      variant='borderless'
                      placeholder='Số điện thoại người nhận'
                      allowClear
                      className='text-base'
                    />
                  </div>
                  {!selectedAddress && (
                    <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
                      <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>
                        tỉnh/thành phố
                      </div>
                      <Select
                        showSearch
                        value={infoCustomer.province || undefined}
                        onChange={(value) => handleInfoCustomer('province', value)}
                        variant='borderless'
                        options={districtOptions}
                        placeholder='Chọn tỉnh thành'
                        className='text-base'
                      />
                    </div>
                  )}
                  {!selectedAddress && (
                    <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
                      <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Quận/huyện</div>
                      <Select
                        showSearch
                        value={infoCustomer.district || undefined}
                        onChange={(value) => handleInfoCustomer('district', value)}
                        placeholder={'Chọn quận huyện'}
                        variant='borderless'
                        options={districtOptions}
                        className='text-base'
                      />
                    </div>
                  )}
                  {!selectedAddress && (
                    <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
                      <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>phường/xã</div>
                      <Select
                        showSearch
                        value={infoCustomer.ward || undefined}
                        onChange={(value) => handleInfoCustomer('ward', value)}
                        placeholder={'Chọn phường/xã'}
                        variant='borderless'
                        options={districtOptions}
                        className='text-base'
                      />
                    </div>
                  )}
                  {!selectedAddress && (
                    <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
                      <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Địa chỉ</div>
                      <Input
                        value={infoCustomer.address}
                        onChange={(e) => handleInfoCustomer('address', e.target.value)}
                        variant='borderless'
                        placeholder='Số nhà, tên đường'
                        allowClear
                        className='text-base'
                      />
                    </div>
                  )}
                  {selectedAddress && exampleListAddress.length > 1 && (
                    <div className='col-span-2'>
                      <div className='flex items-start cursor-pointer gap-x-1'>
                        <div className='flex items-start justify-between w-full gap-x-4'>
                          <span className='font-normal'>Địa chỉ:</span>
                          <div className='flex flex-col items-start justify-center flex-1 w-full h-full pt-1 gap-y-1'>
                            <div className='text-sm font-medium'>{getAddressString(selectedAddress)}</div>
                            {selectedAddress.isDefault && (
                              <div className=''>
                                <span className='flex-shrink-0 h-min text-[12px] rounded-md text-primary py-0.5 px-3 bg-primary/10 inline-flex items-center justify-center'>
                                  Mặc định
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {exampleListAddress.length > 1 && (
                    <div className='col-span-2'>
                      <div
                        onClick={selectedAddress ? () => handleOpenNewForm() : openModal}
                        className='flex items-center justify-end py-1 cursor-pointer text-primary hover:underline'
                      >
                        <span className='text-xs font-medium line-clamp-1'>
                          {selectedAddress ? 'Nhập địa chỉ mới' : 'Chọn địa chỉ đã lưu'}
                        </span>
                        <span className='ml-1'>
                          <ChevronRight size={16} />
                        </span>
                      </div>
                    </div>
                  )}
                  <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group col-span-2'>
                    <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Ghi chú</div>
                    <Input
                      value={infoCustomer.note}
                      onChange={(e) => handleInfoCustomer('note', e.target.value)}
                      variant='borderless'
                      placeholder='Ghi chú khác (nếu có)'
                      allowClear
                      className='text-base'
                    />
                  </div>
                </div>
              </ConfigProvider>
            </div>
          </div>

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
