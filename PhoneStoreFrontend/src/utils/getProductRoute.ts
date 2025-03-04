export const getProductRoute = (categoryName: string, brandName: string, slug: string): string => {
  const categoriesUrlConfig: { [key: string]: string } = {
    'Điện thoại': 'mobile',
    Laptop: 'laptop'
  }

  const categoryUrl = categoriesUrlConfig[categoryName]

  return `/${categoryUrl || ''}/${brandName}/${slug}`
}
