export const categoriesUrlConfig: { [key: string]: string } = {
  'Điện thoại': 'mobile',
  Laptop: 'laptop',
  'Máy tính bảng': 'tablet',
  'Âm thanh': 'audio',
  'Đồng hồ': 'watch',
  Camera: 'camera',
  'Phụ kiện': 'accessory',
  Tivi: 'tv',
  PC: 'pc',
  'Màn hình': 'monitor',
  'Máy in': 'printer'
}

export const getProductRoute = (categoryName: string, brandName: string, slug: string): string => {
  const categoryUrl = categoriesUrlConfig[categoryName]

  return `/${categoryUrl || ''}/${brandName}/${slug}`
}
