import { CustomerInfoType } from './customer_info.type'
import { PaymentType } from './payment.type'
import { UserType } from './user.type'

export interface OrderType {
  orderId: number
  orderDate: string
  status: string
  totalAmount: number
  note: string
  customerId: number
  customerInfo: CustomerInfoType
  PaymentMethodId: number
  paymentInfo: PaymentType
  userId: number
  user: UserType
}
