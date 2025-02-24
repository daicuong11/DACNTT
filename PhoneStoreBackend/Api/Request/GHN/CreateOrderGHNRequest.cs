using PhoneStoreBackend.Enums;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace PhoneStoreBackend.Api.Request.GHN
{
    public class CreateOrderGHNRequest
    {
        [JsonPropertyName("payment_type_id")]
        public int PaymentTypeId { get; set; }

        [JsonPropertyName("required_note")]
        public string RequiredNote { get; set; }

        [JsonPropertyName("client_order_code")]
        public string ClientOrderCode { get; set; }

        [JsonPropertyName("to_name")]
        public string ToName { get; set; }

        [JsonPropertyName("to_phone")]
        public string ToPhone { get; set; }

        [JsonPropertyName("to_address")]
        public string ToAddress { get; set; }

        [JsonPropertyName("to_ward_name")]
        public string ToWardName { get; set; }

        [JsonPropertyName("to_district_name")]
        public string ToDistrictName { get; set; }

        [JsonPropertyName("to_province_name")]
        public string ToProvinceName { get; set; }

        [JsonPropertyName("service_type_id")]
        public int ServiceTypeId { get; set; } // 2 hoặc 5

        [JsonPropertyName("length")]
        public int Length { get; set; }

        [JsonPropertyName("width")]
        public int Width { get; set; }

        [JsonPropertyName("height")]
        public int Height { get; set; }

        [JsonPropertyName("weight")]
        public int Weight { get; set; }

        [JsonPropertyName("items")]
        public List<ItemOrderGHNRequest> Items { get; set; }
    }
}
