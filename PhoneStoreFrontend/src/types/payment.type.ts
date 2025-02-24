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

export interface PaymentResponse {
  code: number;
  description: string;
}

export interface BankingInfo {
  bankCode: string;
  bankTransactionId: string;
}

export interface PaymentResult {
  paymentId: number;
  isSuccess: boolean;
  description: string;
  timestamp: string; // Hoặc Date nếu bạn muốn parse thành Date object
  vnpayTransactionId: number;
  paymentMethod: string;
  paymentResponse: PaymentResponse;
  transactionStatus: PaymentResponse; // Có cùng cấu trúc với PaymentResponse
  bankingInfor: BankingInfo;
}

