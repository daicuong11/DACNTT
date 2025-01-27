import { CouponType } from './coupon.type'
import { CustomerType } from './customer.type'
import { PaymentType } from './payment.type'
import { UserType } from './user.type'

export interface OrderType {
  orderId: number
  orderDate: string
  status: string
  totalAmount: number
  note: string
  customer: CustomerType
  paymentId: number
  payment: PaymentType
  userId: number
  user: UserType
  couponId: number
  coupon: CouponType
}
