using PhoneStoreBackend.Api.Response;

namespace PhoneStoreBackend.Helpers
{
    public static class InputValidator
    {
        public static Response<object>? CheckInput<T>(T input, string name)
        {
            if (input == null)
            {
                var responseError = Response<string>.ErrorBodyResponse(name + " is required.");
                return responseError;
            }

            // Kiểm tra cho kiểu string
            if (input is string str && string.IsNullOrEmpty(str))
            {
                var responseError = Response<string>.ErrorBodyResponse(name + " cannot be empty.");
                return responseError;
            }

            // Kiểm tra cho kiểu number (int, double, float...)
            if (input is int || input is double || input is float)
            {
                if (Convert.ToDecimal(input) <= 0)
                {
                    var responseError = Response<string>.ErrorBodyResponse(name + " must be a positive number.");
                    return responseError;
                }
            }

            if (input is bool)
            {
            }

            if (input is IList<object> list && list.Count == 0)
            {
                var responseError = Response<string>.ErrorBodyResponse(name + " cannot be empty.");
                return responseError;
            }

            return null;
        }
    }
}
