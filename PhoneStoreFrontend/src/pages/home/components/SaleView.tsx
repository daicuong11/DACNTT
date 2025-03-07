import { FC } from 'react'
import CarouselProduct from './CarouselProduct'
import { LoadingItem, SkeletonCarouselProduct } from '@/components'
import { useGet15ProductOfCategoryName, useGetAllProductOfLaptop } from '@/hooks/querys/product.query'
import { useGetBrands } from '@/hooks/querys/brand.query'
import { useNavigate } from 'react-router-dom'
import { categoriesUrlConfig } from '@/utils/getProductRoute'

interface SaleViewProps {
  categoryName: string
}
const SaleView: FC<SaleViewProps> = ({ categoryName }) => {
  const { data: products, isLoading } = useGet15ProductOfCategoryName(categoryName)
  const { data: brandRes } = useGetBrands(categoryName)
  const navigate = useNavigate()

  return products && products.length > 0 ? (
    <div className='w-full'>
      <div className='flex flex-col gap-3 mb-2 lg:flex-row lg:items-center lg:justify-between'>
        <div className='text-base font-bold uppercase lg:text-xl text-black/70'>{categoryName}</div>
        <div className='flex items-center gap-2.5 flex-wrap'>
          {brandRes &&
            brandRes.data &&
            brandRes.data?.map((brand) => (
              <button
                onClick={() => navigate(`/${categoriesUrlConfig[categoryName]}/${brand.name}`)}
                key={brand.brandId}
                className='btn btn-light rounded-md lg:rounded-lg border border-gray-100 !text-slate-600 text-[10px] py-1 lg:py-1.5 lg:!text-xs text-nowrap'
              >
                {brand.name}
              </button>
            ))}
        </div>
      </div>
      {isLoading ? <SkeletonCarouselProduct rows={1} /> : <CarouselProduct row={1} dataSource={products || []} />}
    </div>
  ) : null
}

export default SaleView
