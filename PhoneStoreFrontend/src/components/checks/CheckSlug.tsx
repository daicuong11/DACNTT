import { FC, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ProductDetailPage } from '../../pages/products'

const allowedCategories = [
  'dien-thoai',
  'đien-thoai',
  'laptop',
  'tablet',
  'sound',
  'phu-kien',
  'watch',
  'camera',
  'home',
  'pc',
  'monitor',
  'tv'
]

interface CheckSlugProps {}
const CheckSlug: FC<CheckSlugProps> = () => {
  const { categorySlug } = useParams() as { categorySlug?: string }
  const navigate = useNavigate()

  useEffect(() => {
    if (categorySlug && !allowedCategories.includes(categorySlug)) {
      navigate('/not-found', { replace: true })
    }
  }, [categorySlug, navigate])

  if (categorySlug && allowedCategories.includes(categorySlug)) {
    return <ProductDetailPage />
  }

  return null
}

export default CheckSlug
