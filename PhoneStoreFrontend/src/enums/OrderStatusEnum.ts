enum OrderStatusEnum {
  pending = 'Chờ xác nhận',
  ready_to_pick = 'Đã xác nhận',
  picking = 'Đang lấy hàng',
  picked = 'Đã lấy hàng',
  sorting = 'Hàng đang ở kho',
  delivering = 'Đang vận chuyển',
  delivered = 'Đã giao hàng',
  delivery_fail = 'Giao hàng thất bại',
  cancel = 'Đã hủy'
}

export default OrderStatusEnum
