namespace PhoneStoreBackend.Enums
{
    public enum OrderStatusEnum
    {
        Pending,        // Đang chờ xử lý
        Picking,     // Đang lấy hàng
        Picked,        // Đã lấy hàng
        Sorting,        // Hàng đang ở kho
        Delivering,     // Đang giao
        Delivered,      // Đã nhận hàng thành công
        Delivered_fail, // Giao hàng thất bại
        Return,         // Trả hàng
        Returning,      // Đang trả hàng
        Returned,       // Đã trả hàng
        Return_fail,       // Đã trả hàng thất bại
    }
}
