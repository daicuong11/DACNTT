import { FC } from 'react'
import CarouselProduct from './CarouselProduct'
import { LoadingItem, SkeletonCarouselProduct } from '@/components'
import { useGet15ProductOfCategoryName, useGetAllProductOfLaptop } from '@/hooks/querys/product.query'
import { useGetBrands } from '@/hooks/querys/brand.query'
import { useNavigate } from 'react-router-dom'
import { categoriesUrlConfig } from '@/utils/getProductRoute'

const WatchCameraView: FC = () => {
  const { data: productWatch, isLoading: isLoadingWatch } = useGet15ProductOfCategoryName('đồng hồ')
  const { data: productCamera, isLoading: isLoadingCamera } = useGet15ProductOfCategoryName('camera')
  const { data: brandRes } = useGetBrands('Đồng hồ')
  const navigate = useNavigate()
  const products = [...(productWatch || []), ...(productCamera || [])]
  const isLoading = isLoadingWatch || isLoadingCamera

  return (productWatch && productWatch.length > 0) || (productCamera && productCamera.length > 0) ? (
    <div className='w-full'>
      <div className='flex flex-col gap-3 mb-2 lg:flex-row lg:items-center lg:justify-between'>
        <div className='text-base font-bold uppercase lg:text-xl text-black/70'>Đồng hồ & Camera</div>{' '}
        {/* Updated title for clarity */}
        <div className='flex items-center gap-2.5 flex-wrap'>
          {brandRes &&
            brandRes.data &&
            brandRes.data?.map((brand) => (
              <button
                onClick={() => navigate(`/${categoriesUrlConfig['Đồng hồ']}/${brand.name}`)}
                key={brand.brandId}
                className='btn btn-light rounded-md lg:rounded-lg border border-gray-100 !text-slate-600 text-[10px] py-1 lg:py-1.5 lg:!text-xs text-nowrap'
              >
                {brand.name}
              </button>
            ))}
        </div>
      </div>
      {isLoading ? <SkeletonCarouselProduct rows={1} /> : <CarouselProduct row={1} dataSource={products} />}
    </div>
  ) : null
}

export default WatchCameraView
