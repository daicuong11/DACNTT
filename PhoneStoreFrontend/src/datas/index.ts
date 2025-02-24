import slug from 'slug'
import { ReviewType } from '../types/review.type'

export const exampleReview: ReviewType[] = [
  {
    reviewId: 1,
    productVariantId: 1,
    userId: 1,
    user: {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'dfasf@gmai.com',
      numberPhone: '0987654321',
      address: 'Hà Nội',
      role: 'CUSTOMER',
      profilePicture: 'https://via.placeholder.com/300x300?text=profile'
    },
    rating: 5,
    comment: 'Sản phẩm rất tốt',
    createdAt: new Date().toISOString()
  },
  {
    reviewId: 2,
    productVariantId: 1,
    userId: 2,
    user: {
      id: 2,
      name: 'Nguyễn Văn B',
      email: 'fsdafa',
      numberPhone: '0987654321',
      address: 'Hà Nội',
      role: 'CUSTOMER',
      profilePicture: 'https://via.placeholder.com/300x300?text=profile'
    },
    rating: 4,
    comment: 'Sản phẩm tốt',
    createdAt: new Date().toISOString()
  }
]

export const productSpecificationsArray = [
  { name: 'Kích thước màn hình', value: '6.9 inches' },
  { name: 'Công nghệ màn hình', value: 'Super Retina XDR OLED' },
  {
    name: 'Camera sau',
    value:
      'Camera chính: 48MP, f/1.78, 24mm, 2µm, chống rung quang học dịch chuyển cảm biến thế hệ thứ hai, Focus Pixels 100%; Telephoto 2x 12MP: 52 mm, ƒ/1.6; Camera góc siêu rộng: 48MP, 13 mm,ƒ/2.2 và trường ảnh 120°, Hybrid Focus Pixels, ảnh có độ phân giải'
  },
  { name: 'Camera trước', value: '12MP, ƒ/1.9, Tự động lấy nét theo pha Focus Pixels' },
  { name: 'Chipset', value: 'Apple A18 Pro' },
  { name: 'Công nghệ NFC', value: 'Có' },
  { name: 'Bộ nhớ trong', value: '256 GB' },
  { name: 'Thẻ SIM', value: 'Sim kép (nano-Sim và e-Sim) - Hỗ trợ 2 e-Sim' },
  { name: 'Hệ điều hành', value: 'iOS 18' },
  { name: 'Độ phân giải màn hình', value: '2868 x 1320 pixels' },
  {
    name: 'Tính năng màn hình',
    value:
      'Dynamic Island; Màn hình Luôn Bật; Công nghệ ProMotion với tốc độ làm mới thích ứng lên đến 120Hz; Màn hình HDR; True Tone; Dải màu rộng (P3); Haptic Touch; Tỷ lệ tương phản 2.000.000:1'
  },
  { name: 'Loại CPU', value: 'CPU 6 lõi mới với 2 lõi hiệu năng và 4 lõi hiệu suất' },
  { name: 'Tương thích', value: 'Tương Thích Với Thiết Bị Trợ Thính' }
]
