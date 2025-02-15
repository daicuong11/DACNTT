import { useGet15ProductSimilar } from '@/hooks/querys/product.query'
import CarouselProduct from '@/pages/home/components/CarouselProduct'
import { ProductVariantType } from '@/types/product_variant.type'
import React, { FC } from 'react'

interface ListSimilarProductsProps {
  productVariant: ProductVariantType
}
const ListSimilarProducts: FC<ListSimilarProductsProps> = ({ productVariant }) => {
  const { data } = useGet15ProductSimilar(productVariant.productId)
  return (
    <div className=''>
      <div className='text-xl font-bold leading-none uppercase text-black/70'>Sản phẩm tương tự</div>
      <CarouselProduct autoPlay={false} dataSource={data || []} />

      <div className='w-full h-[1px] bg-slate-200'></div>
    </div>
  )
}

export default ListSimilarProducts
