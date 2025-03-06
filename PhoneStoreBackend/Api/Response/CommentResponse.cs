namespace PhoneStoreBackend.Api.Response
{
    public class CommentResponse
    {
        public int CommentId { get; set; }
        public string UserName { get; set; }
        public string ProductName { get; set; }
        public string VariantName { get; set; }
        public string CategoryName { get; set; }
        public string BrandName { get; set; }
        public string Slug { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
