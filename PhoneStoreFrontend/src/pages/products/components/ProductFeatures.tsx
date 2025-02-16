import React, { FC } from 'react'
import { ContainerPanel } from '../../../components'
import { checkLengthProduct } from '../../../utils/checkLenghtProduct'
import { ProductVariantType } from '@/types/product_variant.type'
import { ChevronDown, ChevronUp } from 'lucide-react'
import classNames from 'classnames'

interface ProductFeaturesProps {
  productVariant: ProductVariantType
}
const ProductFeatures: FC<ProductFeaturesProps> = ({ productVariant }) => {
  const [isShowAll, setIsShowAll] = React.useState(false)

  const toggleShowAll = () => {
    setIsShowAll((prev) => !prev)
  }

  return (
    <ContainerPanel>
      <div className='p-3 mt-2 bg-gray-100 rounded-md'>
        <div className='text-lg font-semibold text-center text-primary'>
          {checkLengthProduct(productVariant.product.name)}
        </div>
      </div>
      <div
        className={classNames(
          'overflow-hidden px-2 prose text-gray-900 prose-img:my-3 prose-table:my-3 prose-table:table-fixed prose-table:table prose-p:m-0 prose-h2:mb-2 prose-h2:mt-4 prose-h3:mt-3 prose-h3:mb-1 prose-p:text-base prose-li:text-gray-600 prose-ul:m-0 prose-li:text-sm prose-li:font-medium prose-a:text-primary max-w-none',
          {
            'max-h-[252px]': !isShowAll
          }
        )}
        dangerouslySetInnerHTML={{ __html: productVariant.product.description }}
      />
      <div className='my-2'>
        <button
          onClick={toggleShowAll}
          className='items-center overflow-hidden transition-all duration-500 ease-in-out font-roboto mx-auto text-[15px] w-min text-nowrap px-20 font-medium border border-gray-200 shadow-md btn btn-light hover:border-primary hover:text-primary hover:!bg-red-50 drop-shadow-sm'
        >
          {isShowAll ? 'Thu gọn' : 'Xem thêm'}
          <span>{isShowAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
        </button>
      </div>
    </ContainerPanel>
  )
}

export default ProductFeatures
