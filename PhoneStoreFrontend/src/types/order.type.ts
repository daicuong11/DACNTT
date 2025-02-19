import { CouponType } from './coupon.type'
import { CustomerType } from './customer.type'
import { OrderDetailRequestType, OrderDetailType } from './order_detail.type'
import { PaymentType } from './payment.type'
import { UserAuthType, UserType } from './user.type'

export interface OrderType {
  orderId: number
  orderDate: string
  status: string
  totalAmount: number
  note: string
  shippingFee: number
  shippingAddress: string
  customer: CustomerType
  paymentId: number
  payment: PaymentType
  userId: number
  user: UserType
  couponId: number
  coupon: CouponType
}

export interface OrderRequestType {
  userId: number
  couponId: number | null
  customerId: number
  shippingAddress: string
  note: string
  shippingFee: number
  totalAmount: number
  orderDetailRequests: OrderDetailRequestType[]
}

export interface OrderResponseType {
  orderId: number
  userId: number
  user: UserAuthType
  customerId: number
  customer: CustomerType
  status: string
  totalAmount: number
  note: string
  shippingFee: number
  shippingAddress: string
  orderDate: string
  paymentId: number
  payment: PaymentType
  couponId: number
  coupon: CouponType
  orderDetails: OrderDetailType[]
  createdAt: string
  updatedAt: string
}
