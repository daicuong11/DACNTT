namespace PhoneStoreBackend.Enums
{
    public enum PaymentStatusEnum
    {
        Pending,        // Chờ thanh toán
        Processing,     // Đang xử lý
        Success,        // Thành công
        Failed,         // Thất bại
        Cancelled,      // Đã hủy
        Refunding,      // Đang hoàn tiền
        Refunded,       // Đã hoàn tiền
        OnHold,         // Tạm giữ
        Expired,        // Hết hạn
        PendingConfirmation // Đang chờ xác nhận
    }
}
