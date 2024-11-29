namespace PhoneStoreBackend.Api.Response
{
    public class Response<T>
    {
        public bool Success { get; set; }

        public string Message { get; set; }

        public T Data { get; set; }

        public Response()
        {
        }

        public Response(bool success, string message, T data)
        {
            Success = success;
            Message = message;
            Data = data;
        }

        public static Response<T> CreateSuccessResponse(T data, string message = "Request successful")
        {
            return new Response<T>(true, message, data);
        }

        public static Response<T> CreateErrorResponse(string message)
        {
            return new Response<T>(false, message, default);
        }

        public static Response<object> ErrorBodyResponse(string message)
        {
            return new Response<object>
            {
                Success = false,
                Message = "Validation errors occurred.",
                Data = new { Errors = message }
            };
        }

        public static Response<object> ErrorModelState(string error)
        {
            return new Response<object>
            {
                Success = false,
                Message = error,
                Data = default,
            };
        }

    }
}
