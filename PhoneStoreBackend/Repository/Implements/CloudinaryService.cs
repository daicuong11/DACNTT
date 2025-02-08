using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace PhoneStoreBackend.Repository.Implements
{
    public class CloudinaryService
    {
        private readonly Cloudinary _cloudinary;

        public CloudinaryService(string cloudName, string apiKey, string apiSecret)
        {
            if (string.IsNullOrWhiteSpace(cloudName) || string.IsNullOrWhiteSpace(apiKey) || string.IsNullOrWhiteSpace(apiSecret))
                throw new ArgumentException("Cloudinary credentials cannot be null or empty.");

            var account = new Account(cloudName, apiKey, apiSecret);
            _cloudinary = new Cloudinary(account);
        }

        public async Task<string> UploadImageAsync(IFormFile file, string folderPath = null)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("File cannot be null or empty.");

            try
            {
                using var fileStream = file.OpenReadStream();

                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, fileStream),
                    Folder = folderPath
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                if (uploadResult.Error != null)
                    throw new Exception($"Cloudinary upload error: {uploadResult.Error.Message}");

                return uploadResult.SecureUrl.ToString();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Upload failed: {ex.Message}");
                return null;
            }
        }

        public async Task<ListResourcesResult> ListResourcesAsync(ListResourcesParams listResourcesParams)
        {
            return await _cloudinary.ListResourcesAsync(listResourcesParams);
        }

        public async Task<ImageUploadResult> UploadAsync(ImageUploadParams uploadParams)
        {
            return await _cloudinary.UploadAsync(uploadParams);
        }
    }
}
