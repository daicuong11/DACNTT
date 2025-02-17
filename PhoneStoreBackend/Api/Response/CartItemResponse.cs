using PhoneStoreBackend.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Response
{
    public class CartItemResponse
    {
        public int CartItemId { get; set; }

        public int CartId { get; set; }

        public VariantBasicResponse ProductVariant { get; set; }

        public int Quantity { get; set; }
    }
}
