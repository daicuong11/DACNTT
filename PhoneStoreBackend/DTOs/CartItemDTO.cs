namespace PhoneStoreBackend.DTOs
{
    public class CartItemDTO
    {
        public int CartItemId { get; set; }
        public int CartId { get; set; }
        public CartDTO Cart { get; set; }
        public int ProductId { get; set; }
        public ProductDTO Product { get; set; }
        public int Quantity { get; set; }
    }
}
