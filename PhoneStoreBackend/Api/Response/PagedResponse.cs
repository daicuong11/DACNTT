namespace PhoneStoreBackend.Api.Response
{
    public class PagedResponse<T> : Response<T>
    {
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalItems { get; set; }

        public PagedResponse(T data, int currentPage, int pageSize, int totalItems, string message = "Request successful")
            : base(true, message, data)
        {
            CurrentPage = currentPage;
            PageSize = pageSize;
            TotalItems = totalItems;
            TotalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
        }

        public static PagedResponse<T> CreatePagedResponse(T data, int currentPage, int pageSize, int totalItems, string message = "Request successful")
        {
            return new PagedResponse<T>(data, currentPage, pageSize, totalItems, message);
        }
    }
}
