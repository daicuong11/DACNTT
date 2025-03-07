import { COD_img, momo_vi_img, vnpay_img } from '../assets/images'
import { PaymentMethodType } from '../types/app.type'

export const listPaymentMethod: PaymentMethodType[] = [
  {
    id: 1,
    name: 'Thanh toán khi nhận hàng',
    image: COD_img
  },
  {
    id: 2,
    name: 'VNPay',
    image: vnpay_img
  },
  {
    id: 3,
    name: 'Ví MoMo',
    image: momo_vi_img,
    disabled: true
  }
]
