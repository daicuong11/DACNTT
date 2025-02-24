export enum PaymentStatusEnum {
  SUCCESS = 'Success',
  PENDING = 'Pending',
  FAILED = 'Failed'
}

export enum OrderStatusEnum {
  ready_to_pick = 'Vừa tạo', // Mới tạo đơn
  picking = 'Đang lấy hàng', // Đang lấy hàng
  picked = 'Đã lấy hàng', // Đã lấy hàng
  sorting = 'Hàng đang ở kho', // Hàng đang ở kho
  delivering = 'Đang giao', // Đang giao
  delivered = 'Đã nhận hàng thành công', // Đã nhận hàng thành công
  delivery_fail = 'Giao hàng thất bại' // Giao hàng thất bại
}
