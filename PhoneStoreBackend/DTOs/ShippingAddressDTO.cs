namespace PhoneStoreBackend.DTOs
{
    public class ShippingAddressDTO
    {
        public int ShippingAddressId { get; set; }
        public int OrderId { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public bool IsDefault { get; set; }
    }
}
