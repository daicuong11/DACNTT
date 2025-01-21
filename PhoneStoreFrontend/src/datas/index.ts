import slug from 'slug'
import { ProductType } from '../types/product.type'
import { ReviewType } from '../types/review.type'
import { ProductVariantType } from '../types/product_variant.type'

export const listItems: ProductType[] = Array.from({ length: 20 }, (_, index) => {
  const productNames = [
    'Apple MacBook Air M2 2024 8CPU 8GPU 16GB 256GB I Chính hãng Apple Việt Nam',
    'Samsung Galaxy S23 Ultra 5G 12GB 512GB',
    'Dell XPS 13 Plus 9320 Laptop 2024 16GB 512GB SSD',
    'Asus ROG Zephyrus G14 Gaming Laptop Ryzen 9 16GB 1TB SSD',
    'Sony WH-1000XM5 Wireless Noise-Canceling Headphones',
    'Xiaomi Mi 13 Pro 12GB 256GB 5G Smartphone',
    'Google Pixel 7 Pro 12GB 256GB',
    'HP Spectre x360 Convertible Laptop 16GB 512GB SSD',
    'Lenovo ThinkPad X1 Carbon Gen 11 Ultrabook 16GB 1TB SSD',
    'Microsoft Surface Pro 9 2-in-1 Tablet Intel Core i7 16GB 512GB SSD',
    'Canon EOS R8 Mirrorless Camera Full-Frame 24.2MP',
    'DJI Mavic 3 Pro Drone 4K Camera',
    'Apple iPhone 15 Pro Max 5G 1TB Titanium',
    'Samsung Galaxy Tab S9 Ultra 14.6-inch AMOLED',
    'Bose QuietComfort Earbuds II Wireless',
    'Logitech MX Master 3S Wireless Mouse',
    'Razer BlackWidow V4 Pro Mechanical Gaming Keyboard',
    'Sony A7R V Mirrorless Camera 61MP Full-Frame',
    'Asus TUF Gaming F15 Laptop i7 16GB 512GB RTX 3060',
    'Apple Watch Ultra 2 Titanium Case with Ocean Band'
  ]

  const productName = productNames[index % productNames.length]
  const slugName = slug(productName, { lower: true })

  return {
    productId: index + 1,
    name: productName,
    slug: slugName,
    description: `This is the description for ${productName}`,
    imageUrl: `https://via.placeholder.com/300x300?text=${slugName}`,
    categoryId: 1,
    category: {
      categoryId: 1,
      name: 'Laptop',
      url: 'laptop',
      description: 'Laptop description',
      imageUrl: 'https://via.placeholder.com/300x300?text=laptop'
    },
    brandId: 1,
    brand: {
      brandId: 1,
      name: 'Apple',
      description: 'Apple description',
      imageUrl: 'https://via.placeholder.com/300x300?text=apple'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
})

export const exampleProductVariant: ProductVariantType[] = [
  ...Array.from({ length: 20 }, (_, index) => ({
    productVariantId: index + 1,
    productId: (index % 20) + 1,
    product: listItems[index % 20],
    color: ['Black', 'White', 'Gold', 'Silver'][index % 4],
    storage: ['256GB', '512GB', '1TB'][index % 3],
    price: 29000000 + (index % 3) * 3000000,
    stock: 10 - (index % 5)
  }))
]

export const exampleReview: ReviewType[] = [
  {
    reviewId: 1,
    productId: 1,
    userId: 1,
    userCreatedInfo: {
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
    productId: 1,
    userId: 2,
    userCreatedInfo: {
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
