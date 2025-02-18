import axiosInstance from '@/configs/http'
import { PayCodRequestType, PaymentType } from '@/types/payment.type'

class PaymentAPI {
  async addPaymentCod(paymentCODReq: PayCodRequestType): Promise<PaymentType> {
    const req = await axiosInstance.post('payments/pay/cod', paymentCODReq)
    return req.data
  }
}

const paymentAPI = new PaymentAPI()
export default paymentAPI
