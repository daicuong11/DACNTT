import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CategoryType } from '../types/category.type'
import { ProductType } from '../types/product.type'
import { listItems } from '../datas'

const useBreadcrumbs = () => {
  const location = useLocation()
  const [product, setProduct] = useState<ProductType | null>(null)
  const [categories, setCategories] = useState<CategoryType[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // const response = await fetch('/api/categories');
        // const data = await response.json();
        const data: CategoryType[] = [
          {
            categoryId: 1,
            name: 'Điện thoại',
            url: 'mobile',
            description: 'Smartphones and tablets',
            imageUrl: 'https://example.com/category1.jpg'
          },
          {
            categoryId: 2,
            name: 'Laptop',
            url: 'laptop',
            description: 'Powerful laptops',
            imageUrl: 'https://example.com/category2.jpg'
          },
          {
            categoryId: 3,
            name: 'Máy ảnh',
            url: 'camera',
            description: 'High-quality cameras',
            imageUrl: 'https://example.com/category3.jpg'
          },
          {
            categoryId: 4,
            name: 'Phụ kiện',
            url: 'accessory',
            description: 'Accessories for all devices',
            imageUrl: 'https://example.com/category4.jpg'
          }
        ]
        setCategories(data)
      } catch (error) {
        console.error('Lỗi khi tải danh sách category:', error)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchProduct = () => {
      const decodedPathname = decodeURIComponent(location.pathname)
      const pathnames = decodedPathname.split('/').filter((x) => x)

      if (pathnames.length === 2) {
        const productSlug = pathnames[1]
        const matchedProduct = listItems.find((item) => item.slug === productSlug)
        setProduct(matchedProduct || null)
      } else {
        setProduct(null)
      }
    }

    fetchProduct()
  }, [location.pathname])

  const decodedPathname = decodeURIComponent(location.pathname)
  const pathnames = decodedPathname.split('/').filter((x) => x)

  const breadcrumbs = pathnames.map((_, index) => {
    const href = `/${pathnames.slice(0, index + 1).join('/')}`
    const slug = pathnames[index]

    const matchedCategory = categories.find((category) => category.url === slug)

    const isProductSlug = index === 1 && product
    const title = isProductSlug ? product.name : matchedCategory ? matchedCategory.name : slug

    return { href, title }
  })

  return [{ href: '/', title: 'Trang chủ' }, ...breadcrumbs]
}

export default useBreadcrumbs
