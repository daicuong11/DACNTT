import { OrderType } from './order.type'

export interface PaymentType {
  paymentId: number
  transactionId: string
  orderId: number
  order: OrderType
  paymentStatus: string
  paymentMethod: string
  paymentDate: string
  amount: number
}

export interface PayCodRequestType {
  orderId: number
  amount: number
}
