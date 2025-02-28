import { FC } from 'react'
import CarouselProduct from './CarouselProduct'
import { LoadingItem } from '@/components'
import { useGetAllProductOfMobile } from '@/hooks/querys/product.query'

interface MobileSaleView {}
const MobileSaleView: FC<MobileSaleView> = () => {
  const { data: products, isLoading } = useGetAllProductOfMobile()

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-2'>
        <div className='text-xl font-bold uppercase text-black/70'>Điện thoại nổi bật nhất</div>
        <div className='flex items-center gap-2.5'>
          <button className='btn btn-light  border border-gray-100 !text-slate-600 !text-xs'>Apple</button>
          <button className='btn btn-light  border border-gray-100 !text-slate-600 !text-xs'>Samsung</button>
          <button className='btn btn-light  border border-gray-100 !text-slate-600 !text-xs'>Xiaomi</button>
          <button className='btn btn-light  border border-gray-100 !text-slate-600 !text-xs'>Oppo</button>
          <button className='btn btn-light  border border-gray-100 !text-slate-600 !text-xs'>Vivo</button>
          <button className='btn btn-light  border border-gray-100 !text-slate-600 !text-xs'>Realme</button>
          <button className='btn btn-light  border border-gray-100 !text-slate-600 !text-xs'>OnePlus</button>
          <button className='btn btn-light  border border-gray-100 !text-slate-600 !text-xs'>Nokia</button>
          <button className='btn btn-light  border border-gray-100 !text-slate-600 !text-xs'>Sony</button>
          <button className='btn btn-light  border border-gray-100 !text-slate-600 !text-xs'>LG</button>
          <button className='btn btn-light  border border-gray-100 !text-slate-600 !text-xs'>Asus</button>
          <button className='btn btn-light  border border-gray-100 !text-slate-600 !text-xs'>Google</button>
        </div>
      </div>
      {isLoading ? <LoadingItem /> : <CarouselProduct dataSource={products!} row={2} autoPlay={false} />}
    </div>
  )
}

export default MobileSaleView
