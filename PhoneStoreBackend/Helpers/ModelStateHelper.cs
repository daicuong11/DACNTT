using Microsoft.AspNetCore.Mvc.ModelBinding;
using PhoneStoreBackend.Api.Response;

namespace PhoneStoreBackend.Helpers
{
    public static class ModelStateHelper
    {
        public static Response<Object> CheckModelState(ModelStateDictionary modelState)
        {
            if (modelState.IsValid) return null;

            var errors = modelState.Values
                                    .SelectMany(v => v.Errors)
                                    .Select(e => e.ErrorMessage)
                                    .ToList();

            return errors.Any()
                ? Response<Object>.ErrorModelState(errors.First())
                : null;
        }
    }
}
