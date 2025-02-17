using PhoneStoreBackend.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhoneStoreBackend.Api.Response
{
    public class CartResponse
    {
        public int CartId { get; set; }

        public ICollection<CartItemResponse> CartItems { get; set; }
    }
}
