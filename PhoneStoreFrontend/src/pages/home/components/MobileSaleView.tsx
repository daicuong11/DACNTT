import { FC } from 'react'
import CarouselProduct from './CarouselProduct'
import { SkeletonCarouselProduct } from '@/components'
import { useGetAllProductOfMobile } from '@/hooks/querys/product.query'
import { useGetBrands } from '@/hooks/querys/brand.query'
import { useNavigate } from 'react-router-dom'

interface MobileSaleView {}
const MobileSaleView: FC<MobileSaleView> = () => {
  const navigate = useNavigate()
  const { data: products, isLoading } = useGetAllProductOfMobile()
  const { data: brandRes } = useGetBrands('điện thoại')

  return (
    <div className='w-full'>
      <div className='flex flex-col gap-3 mb-2 lg:flex-row lg:items-center lg:justify-between'>
        <div className='text-base font-bold uppercase lg:text-xl text-black/70'>Điện thoại nổi bật nhất</div>
        <div className='flex items-center gap-2.5 flex-wrap'>
          {brandRes &&
            brandRes.data &&
            brandRes.data?.map((brand) => (
              <button
                onClick={() => navigate(`/mobile/${brand.name}`)}
                key={brand.brandId}
                className='btn btn-light rounded-md lg:rounded-lg border border-gray-100 !text-slate-600 text-[10px] py-1 lg:py-1.5 lg:!text-xs text-nowrap'
              >
                {brand.name}
              </button>
            ))}
        </div>
      </div>
      {isLoading ? <SkeletonCarouselProduct /> : <CarouselProduct dataSource={products!} row={2} autoPlay={false} />}
    </div>
  )
}

export default MobileSaleView
