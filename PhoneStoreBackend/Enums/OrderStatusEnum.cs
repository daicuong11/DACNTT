namespace PhoneStoreBackend.Enums
{
    public enum OrderStatusEnum
    {
        Pending,        // Đang chờ xử lý
        Processing,     // Đang xử lý
        Shipped,        // Đã giao hàng
        Delivered,      // Đã nhận hàng
        Cancelled,      // Đã hủy
        OnHold,         // Tạm giữ
        Returned,       // Đã trả hàng
        Refunded,       // Đã hoàn tiền
        Failed,         // Thất bại
        Completed       // Hoàn thành
    }
}
