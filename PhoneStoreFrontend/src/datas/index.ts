import { ProductType } from '../types/product.type'
import { generateSlug } from '../utils/generateSlug'

export const listItems: ProductType[] = [
  {
    productId: 1,
    name: 'Apple MacBook Air M2 2024 8CPU 8GPU 16GB 256GB I Chính hãng Apple Việt Nam',
    slug: generateSlug('Apple MacBook Air M2 2024 8CPU 8GPU 16GB 256GB I Chính hãng Apple Việt Nam'),
    description: 'Flagship killer with Snapdragon 888',
    price: 729,
    stock: 20,
    imageUrl: 'https://example.com/oneplus9.jpg',
    category: {
      categoryId: 1,
      name: 'Điện thoại, Tablet',
      slug: generateSlug('Điện thoại'),
      description: 'Smartphones and tablets',
      imageUrl: 'https://example.com/category1.jpg'
    },
    brand: { brandId: 3, name: 'OnePlus', description: 'Leading smartphone manufacturer' },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    productId: 2,
    name: 'Sony WH-1000XM4',
    slug: generateSlug('Sony WH-1000XM4'),
    description: 'Industry leading noise cancelling headphones',
    price: 349,
    stock: 100,
    imageUrl: 'https://example.com/sonywh1000xm4.jpg',
    category: {
      categoryId: 2,
      name: 'Phụ kiện',
      slug: generateSlug('Phụ kiện'),
      description: 'Accessories and televisions',
      imageUrl: 'https://example.com/category2.jpg'
    },
    brand: { brandId: 4, name: 'Sony', description: 'Renowned electronics manufacturer' },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    productId: 3,
    name: 'iPhone 13',
    slug: generateSlug('iPhone 13'),
    description: 'Latest Apple iPhone with A15 Bionic chip',
    price: 999,
    stock: 50,
    imageUrl: 'https://example.com/iphone13.jpg',
    category: {
      categoryId: 1,
      name: 'Điện thoại, Tablet',
      slug: generateSlug('Điện thoại'),
      description: 'Smartphones and tablets',
      imageUrl: 'https://example.com/category1.jpg'
    },
    brand: { brandId: 1, name: 'Apple', description: 'Innovative technology company' },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    productId: 4,
    name: 'Samsung Galaxy S21',
    slug: generateSlug('Samsung Galaxy S21'),
    description: 'Latest Samsung Galaxy with Exynos 2100',
    price: 899,
    stock: 30,
    imageUrl: 'https://example.com/galaxys21.jpg',
    category: {
      categoryId: 1,
      name: 'Điện thoại, Tablet',
      slug: generateSlug('Điện thoại'),
      description: 'Smartphones and tablets',
      imageUrl: 'https://example.com/category1.jpg'
    },
    brand: { brandId: 2, name: 'Samsung', description: 'Global electronics leader' },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    productId: 5,
    name: 'OnePlus 9',
    slug: generateSlug('OnePlus 9'),
    description: 'Flagship killer with Snapdragon 888',
    price: 729,
    stock: 20,
    imageUrl: 'https://example.com/oneplus9.jpg',
    category: {
      categoryId: 1,
      name: 'Điện thoại, Tablet',
      slug: generateSlug('Điện thoại'),
      description: 'Smartphones and tablets',
      imageUrl: 'https://example.com/category1.jpg'
    },
    brand: { brandId: 3, name: 'OnePlus', description: 'Leading smartphone manufacturer' },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    productId: 6,
    name: 'Sony WH-1000XM4',
    slug: generateSlug('Sony WH-1000XM4'),
    description: 'Industry leading noise cancelling headphones',
    price: 349,
    stock: 100,
    imageUrl: 'https://example.com/sonywh1000xm4.jpg',
    category: {
      categoryId: 2,
      name: 'Phụ kiện, TV',
      slug: generateSlug('Phụ kiện'),
      description: 'Accessories and televisions',
      imageUrl: 'https://example.com/category2.jpg'
    },
    brand: { brandId: 4, name: 'Sony', description: 'Renowned electronics manufacturer' },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    productId: 7,
    name: 'iPhone 13',
    slug: generateSlug('iPhone 13'),
    description: 'Latest Apple iPhone with A15 Bionic chip',
    price: 999,
    stock: 50,
    imageUrl: 'https://example.com/iphone13.jpg',
    category: {
      categoryId: 1,
      name: 'Điện thoại, Tablet',
      slug: generateSlug('Điện thoại'),
      description: 'Smartphones and tablets',
      imageUrl: 'https://example.com/category1.jpg'
    },
    brand: { brandId: 1, name: 'Apple', description: 'Innovative technology company' },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    productId: 8,
    name: 'Samsung Galaxy S21',
    slug: generateSlug('Samsung Galaxy S21'),
    description: 'Latest Samsung Galaxy with Exynos 2100',
    price: 899,
    stock: 30,
    imageUrl: 'https://example.com/galaxys21.jpg',
    category: {
      categoryId: 1,
      name: 'Điện thoại, Tablet',
      slug: generateSlug('Điện thoại'),
      description: 'Smartphones and tablets',
      imageUrl: 'https://example.com/category1.jpg'
    },
    brand: { brandId: 2, name: 'Samsung', description: 'Global electronics leader' },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    productId: 9,
    name: 'Google Pixel 6',
    slug: generateSlug('Google Pixel 6'),
    description: "Google's latest smartphone with Tensor chip",
    price: 799,
    stock: 40,
    imageUrl: 'https://example.com/pixel6.jpg',
    category: {
      categoryId: 1,
      name: 'Điện thoại, Tablet',
      slug: generateSlug('Điện thoại'),
      description: 'Smartphones and tablets',
      imageUrl: 'https://example.com/category1.jpg'
    },
    brand: { brandId: 5, name: 'Google', description: 'Tech giant' },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    productId: 10,
    name: 'Dell XPS 13',
    slug: generateSlug('Dell XPS 13'),
    description: 'High performance ultrabook',
    price: 1199,
    stock: 15,
    imageUrl: 'https://example.com/dellxps13.jpg',
    category: {
      categoryId: 3,
      name: 'Laptop',
      slug: generateSlug('Laptop'),
      description: 'Laptops and notebooks',
      imageUrl: 'https://example.com/category3.jpg'
    },
    brand: { brandId: 6, name: 'Dell', description: 'Leading computer manufacturer' },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    productId: 11,
    name: 'HP Spectre x360',
    slug: generateSlug('HP Spectre x360'),
    description: 'Convertible laptop with touch screen',
    price: 1299,
    stock: 10,
    imageUrl: 'https://example.com/hpspectrex360.jpg',
    category: {
      categoryId: 3,
      name: 'Laptop',
      slug: generateSlug('Laptop'),
      description: 'Laptops and notebooks',
      imageUrl: 'https://example.com/category3.jpg'
    },
    brand: { brandId: 7, name: 'HP', description: 'Global PC manufacturer' },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    productId: 12,
    name: 'Microsoft Surface Pro 8',
    slug: generateSlug('Microsoft Surface Pro 8'),
    description: 'Versatile 2-in-1 laptop',
    price: 1399,
    stock: 25,
    imageUrl: 'https://example.com/surfacepro8.jpg',
    category: {
      categoryId: 3,
      name: 'Laptop',
      slug: generateSlug('Laptop'),
      description: 'Laptops and notebooks',
      imageUrl: 'https://example.com/category3.jpg'
    },
    brand: { brandId: 8, name: 'Microsoft', description: 'Software and hardware giant' },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    productId: 13,
    name: 'Asus ROG Strix',
    slug: generateSlug('Asus ROG Strix'),
    description: 'Gaming laptop with high-end specs',
    price: 1599,
    stock: 5,
    imageUrl: 'https://example.com/asusrogstrix.jpg',
    category: {
      categoryId: 3,
      name: 'Laptop',
      slug: generateSlug('Laptop'),
      description: 'Laptops and notebooks',
      imageUrl: 'https://example.com/category3.jpg'
    },
    brand: { brandId: 9, name: 'Asus', description: 'Leading gaming hardware manufacturer' },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    productId: 14,
    name: 'Lenovo ThinkPad X1 Carbon',
    slug: generateSlug('Lenovo ThinkPad X1 Carbon'),
    description: 'Business laptop with robust build',
    price: 1499,
    stock: 20,
    imageUrl: 'https://example.com/thinkpadx1carbon.jpg',
    category: {
      categoryId: 3,
      name: 'Laptop',
      slug: generateSlug('Laptop'),
      description: 'Laptops and notebooks',
      imageUrl: 'https://example.com/category3.jpg'
    },
    brand: { brandId: 10, name: 'Lenovo', description: 'Global PC manufacturer' },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    productId: 15,
    name: 'Acer Predator Helios 300',
    slug: generateSlug('Acer Predator Helios 300'),
    description: 'Gaming laptop with powerful performance',
    price: 1299,
    stock: 8,
    imageUrl: 'https://example.com/acerpredator.jpg',
    category: {
      categoryId: 3,
      name: 'Laptop',
      slug: generateSlug('Laptop'),
      description: 'Laptops and notebooks',
      imageUrl: 'https://example.com/category3.jpg'
    },
    brand: { brandId: 11, name: 'Acer', description: 'Leading computer manufacturer' },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    productId: 16,
    name: 'Razer Blade 15',
    slug: generateSlug('Razer Blade 15'),
    description: 'High-end gaming laptop',
    price: 1799,
    stock: 12,
    imageUrl: 'https://example.com/razerblade15.jpg',
    category: {
      categoryId: 3,
      name: 'Laptop',
      slug: generateSlug('Laptop'),
      description: 'Laptops and notebooks',
      imageUrl: 'https://example.com/category3.jpg'
    },
    brand: { brandId: 12, name: 'Razer', description: 'Gaming hardware manufacturer' },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    productId: 17,
    name: 'LG Gram 17',
    slug: generateSlug('LG Gram 17'),
    description: 'Lightweight laptop with large screen',
    price: 1399,
    stock: 18,
    imageUrl: 'https://example.com/lggram17.jpg',
    category: {
      categoryId: 3,
      name: 'Laptop',
      slug: generateSlug('Laptop'),
      description: 'Laptops and notebooks',
      imageUrl: 'https://example.com/category3.jpg'
    },
    brand: { brandId: 13, name: 'LG', description: 'Global electronics manufacturer' },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    productId: 18,
    name: 'Huawei MateBook X Pro',
    slug: generateSlug('Huawei MateBook X Pro'),
    description: 'Premium ultrabook with sleek design',
    price: 1499,
    stock: 22,
    imageUrl: 'https://example.com/matebookxpro.jpg',
    category: {
      categoryId: 3,
      name: 'Laptop',
      slug: generateSlug('Laptop'),
      description: 'Laptops and notebooks',
      imageUrl: 'https://example.com/category3.jpg'
    },
    brand: { brandId: 14, name: 'Huawei', description: 'Leading technology company' },
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export const exampleReview = [
  {
    reviewId: 1,
    productId: 1,
    rating: 5
  },
  {
    reviewId: 2,
    productId: 2,
    rating: 4.8
  },
  {
    reviewId: 3,
    productId: 3,
    rating: 3.5
  },
  {
    reviewId: 4,
    productId: 0,
    rating: 5
  },
  {
    reviewId: 5,
    productId: 6,
    rating: 4.7
  }
] as { reviewId: number; productId: number; rating: number }[]

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
