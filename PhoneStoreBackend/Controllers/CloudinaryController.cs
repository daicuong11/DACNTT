using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Repository.Implements;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/cloudinary")]
    [ApiController]
    public class CloudinaryController : ControllerBase
    {
        private readonly CloudinaryService _cloudinaryService;

        public CloudinaryController(CloudinaryService cloudinaryService)
        {
            _cloudinaryService = cloudinaryService;
        }

        [HttpGet("list-images")]
        public async Task<IActionResult> GetImages()
        {
            var listParams = new ListResourcesParams()
            {
                Type = "upload",
                MaxResults = 50 // Số lượng ảnh tối đa trả về
            };

            var result = await _cloudinaryService.ListResourcesAsync(listParams);

            return Ok(result.Resources.Select(r => new { r.PublicId, r.SecureUrl }));
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage(IFormFile file, [FromForm] string folder)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("File không hợp lệ");
            }

            using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream),
                Folder = folder // Lấy tên thư mục từ request
            };

            var uploadResult = await _cloudinaryService.UploadAsync(uploadParams);

            if (uploadResult.Error != null)
            {
                return BadRequest(uploadResult.Error.Message);
            }

            return Ok(new { uploadResult.PublicId, uploadResult.SecureUrl });
        }
    }
}
