using System.Text.Json.Serialization;

namespace PhoneStoreBackend.Api.Response.GHN
{
    public class CreateOrderGHNResponse
    {
        [JsonPropertyName("order_code")]
        public string OrderCode { get; set; }

        [JsonPropertyName("total_fee")]
        public int TotalFee { get; set; }

        [JsonPropertyName("expected_delivery_time")]
        public string ExpectedDeliveryTime { get; set; }
    }
}
