namespace PhoneStoreBackend.Enums
{
    public enum OrderStatusEnum
    {
        ready_to_pick,        // Mới tạo đơn
        picking,     // Đang lấy hàng
        picked,        // Đã lấy hàng
        sorting,        // Hàng đang ở kho
        delivering,     // Đang giao
        delivered,      // Đã nhận hàng thành công
        delivery_fail,     // Giao hàng thất bại
        cancel,         // đã hủy
        pending,        // chờ xác nhận
    }
}
