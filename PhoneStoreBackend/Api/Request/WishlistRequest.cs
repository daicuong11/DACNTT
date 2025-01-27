﻿using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class WishlistRequest
    {
        [Required(ErrorMessage = "Mã người dùng là bắt buộc.")]
        public int UserId { get; set; }
    }
}
