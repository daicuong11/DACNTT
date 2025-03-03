﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace PhoneStoreBackend.Api.Request
{
    public class ReviewRequest
    {
        [Required(ErrorMessage = "Mã biến thể sản phẩm là bắt buộc.")]
        public int ProductVariantId { get; set; }

        [Required(ErrorMessage = "Đánh giá là bắt buộc.")]
        [Range(1, 5, ErrorMessage = "Đánh giá phải từ 1 đến 5.")]
        public int Rating { get; set; }

        [StringLength(1000, ErrorMessage = "Bình luận không được vượt quá 1000 ký tự.")]
        public string Comment { get; set; }

        // ✅ Thay đổi từ string sang danh sách IFormFile để nhận nhiều file
        public List<IFormFile> Images { get; set; }
    }
}
