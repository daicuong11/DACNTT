namespace PhoneStoreBackend.Api.Response
{
    public class ReviewResponse
    {
        public int TotalReview { get; set; }
        public int Total5Rate { get; set; }
        public int Total4Rate { get; set; }
        public int Total3Rate { get; set; }
        public int Total2Rate { get; set; }
        public int Total1Rate { get; set; }
        public double RateAverage { get; set; }
    }
}
