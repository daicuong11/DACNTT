import { FC } from 'react'
import CarouselProduct from './CarouselProduct'
import { LoadingItem, SkeletonCarouselProduct } from '@/components'
import { useGetAllProductOfLaptop } from '@/hooks/querys/product.query'
import { useGetBrands } from '@/hooks/querys/brand.query'
import { useNavigate } from 'react-router-dom'

interface LaptopSaleViewProps {}
const LaptopSaleView: FC<LaptopSaleViewProps> = () => {
  const { data: products, isLoading } = useGetAllProductOfLaptop()
  const { data: brandRes } = useGetBrands('laptop')
  const navigate = useNavigate()

  return (
    <div className='w-full'>
      <div className='flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between mb-2'>
        <div className='text-base lg:text-xl font-bold uppercase text-black/70'>Laptop</div>
        <div className='flex items-center gap-2.5 flex-wrap'>
          {brandRes &&
            brandRes.data &&
            brandRes.data?.map((brand) => (
              <button
                onClick={() => navigate(`/laptop/${brand.name}`)}
                key={brand.brandId}
                className='btn btn-light rounded-md lg:rounded-lg border border-gray-100 !text-slate-600 text-[10px] py-1 lg:py-1.5 lg:!text-xs text-nowrap'
              >
                {brand.name}
              </button>
            ))}
        </div>
      </div>
      {isLoading ? <SkeletonCarouselProduct /> : <CarouselProduct dataSource={products || []} />}
    </div>
  )
}

export default LaptopSaleView
