using PhoneStoreBackend.Api.Request.GHN;
using VNPAY.NET.Models;

namespace PhoneStoreBackend.Api.Request
{
    public class AddOrderRequest
    {
        public AddressOrderRequest Address { get; set; }
        public CustomerInfoRequest CustomerInfo { get; set; }
        public OrderRequest Order { get; set; }
    }
}
