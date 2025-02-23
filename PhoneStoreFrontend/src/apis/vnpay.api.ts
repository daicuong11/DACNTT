import axiosInstance from '@/configs/http'

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
}

export default new VnpayAPI()
