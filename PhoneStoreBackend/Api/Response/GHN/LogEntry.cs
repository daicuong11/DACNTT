using System.Text.Json.Serialization;

namespace PhoneStoreBackend.Api.Response.GHN
{
    public class LogEntry
    {
        [JsonPropertyName("status")]
        public string Status { get; set; }

        [JsonPropertyName("updated_date")]
        public string UpdatedDate { get; set; }
    }
}
