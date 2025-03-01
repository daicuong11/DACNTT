import axiosInstance from '@/configs/http'
import { PaymentResult } from '@/types/payment.type'

class VnpayAPI {
  async createPaymentUrl(orderId: number): Promise<string> {
    try {
      const response = await axiosInstance.get<string>(
        `Vnpay/CreatePaymentUrlForOrder`,
        { params: { orderId } } // Sử dụng params để code gọn hơn
      )
      if (!response) {
        throw new Error('Không nhận được URL thanh toán từ API')
      }
      console.log('URL thanh toán:', response)
      return response as unknown as string
    } catch (error) {
      console.error('Lỗi khi tạo URL thanh toán:', error)
      throw new Error('Không thể tạo link thanh toán')
    }
  }
  // async checkPayment(searchParams: URLSearchParams): Promise<PaymentResult> {
  //   try {
  //     const response = await axiosInstance.get<PaymentResult>(`Vnpay/Callback`, {
  //       params: Object.fromEntries(searchParams.entries())
  //     })
  //     console.log('Kết quả thanh toán:', response)
  //     if (!response) {
  //       throw new Error("Không nhận được kết quả thanh toán từ API");
  //     }
  //     return response as unknown as PaymentResult
  //   } catch (error) {
  //     console.error('Lỗi khi kiểm tra thanh toán:', error)
  //     throw new Error('Không thể kiểm tra than')
  //   }
  // }

  async checkPayment(searchParams: URLSearchParams): Promise<PaymentResult> {
    try {
        const data: PaymentResult = await axiosInstance.get('Vnpay/Callback', {
            params: Object.fromEntries(searchParams.entries())
        });

        if (!data) throw new Error("Không nhận được kết quả thanh toán từ API");

        return data;
    } catch (error: any) {
      if (error.response) {
          const { status, data } = error.response;
          if (status === 400) {
              console.error('Lỗi 400 Bad Request:', data);
              // throw new Error(data.message || 'Yêu cầu không hợp lệ.');
              return data;
          }
      }

      console.error('Lỗi khi kiểm tra thanh toán:', error);
      throw new Error('Không thể kiểm tra thanh toán. Vui lòng thử lại sau.');
  }
}
}
export default new VnpayAPI()
