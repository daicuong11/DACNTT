import React, { FC } from 'react'
import { ContainerPanel } from '../../../components'
import { checkLengthProduct } from '../../../utils/checkLenghtProduct'
import { ProductVariantType } from '@/types/product_variant.type'

interface ProductFeaturesProps {
  productVariant: ProductVariantType
}
const ProductFeatures: FC<ProductFeaturesProps> = ({ productVariant }) => {
  return (
    <ContainerPanel>
      <div className='p-3 mt-2 bg-gray-100 rounded-md'>
        <div className='mb-3 text-lg font-semibold text-center text-primary'>
          {checkLengthProduct(productVariant.product.name)}
        </div>
        <ul className='px-3 text-[14px] font-medium text-gray-600 list-disc list-outside'>
          <li className=''>
            Màn hình Super Retina XDR 6,9 inch lớn hơn có viền mỏng hơn, đem đến cảm giác tuyệt vời khi cầm trên tay.
          </li>
          <li className=''>
            Điều khiển Camera - Chỉ cần trượt ngón tay để điều chỉnh camera giúp chụp ảnh hoặc quay video đẹp hoàn hảo
            và siêu nhanh.
          </li>
          <li className=''>
            iPhone 16 Pro Max có thiết kế titan cấp 5 với lớp hoàn thiện mới, tinh tế được xử lý bề mặt vi điểm.
          </li>
          <li className=''>
            iPhone 16 Pro Max được cài đặt sẵn hệ điều hành iOS 18, cho giao diện trực quan, dễ sử dụng và nhiều tính
            năng hữu ích.
          </li>
        </ul>
      </div>
    </ContainerPanel>
  )
}

export default ProductFeatures
