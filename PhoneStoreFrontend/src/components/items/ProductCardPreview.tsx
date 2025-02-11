import { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { getProductRoute } from '../../utils/getProductRoute'
import formatPrice from '../../utils/formatPrice'
import { ProductVariantRequestType, ProductVariantType } from '../../types/product_variant.type'
import { iphone1 } from '@/assets/images/iphone'
import { Edit } from 'lucide-react'
import { useAppSelector } from '@/hooks'

interface ProductCardPreviewType extends HTMLAttributes<HTMLDivElement> {
  productVariant: ProductVariantRequestType
  className?: string
}

const ProductCardPreview: FC<ProductCardPreviewType> = ({ productVariant, className, ...props }) => {
  const { product } = useAppSelector((state) => state.createProduct)

  return (
    <div
      {...props}
      className={classNames(
        'h-[220px] min-w-[220px] relative group w-[224px] hover:border-primary transition-all cursor-pointer rounded-xl bg-white p-[10px] flex flex-col drop-shadow-md border border-gray-100',
        className
      )}
    >
      <span className='absolute hidden top-2 right-2 group-hover:block'>
        <Edit size={20} />
      </span>
      <div className='flex-[5] flex items-center justify-center'>
        <img
          src={iphone1}
          alt={product?.name + ' ' + productVariant.variantName}
          className='w-[80px] h-[80px] object-contain mt-3'
        />
      </div>
      <div className='flex-[6] flex flex-col'>
        <div className='flex flex-col gap-3 mt-2'>
          <h2 className='h-[60px] text-sm font-bold text-black/80 line-clamp-3'>
            {product?.name + ' ' + productVariant.variantName}
          </h2>
          <div className='flex items-end gap-1 font-sans font-bold'>
            <span className='leading-none text-primary'>{formatPrice(productVariant.price)}</span>
            <span className='text-sm leading-none line-through text-slate-600'>
              {formatPrice(productVariant.price)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCardPreview
