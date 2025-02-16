import { FC } from 'react'
import CarouselProduct from './CarouselProduct'
import { LoadingItem } from '@/components'
import { useGetAllProductOfLaptop } from '@/hooks/querys/product.query'

interface LaptopSaleViewProps {}
const LaptopSaleView: FC<LaptopSaleViewProps> = () => {
  const { data: products, isLoading } = useGetAllProductOfLaptop()

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-2'>
        <div className='text-xl font-bold uppercase text-black/70'>Laptop</div>
        <div className='flex items-center gap-2.5'>
          <button className='btn btn-light !text-slate-600 border border-gray-100 !text-xs'>Macbook</button>
          <button className='btn btn-light !text-slate-600 border border-gray-100 !text-xs'>Dell</button>
          <button className='btn btn-light !text-slate-600 border border-gray-100 !text-xs'>HP</button>
          <button className='btn btn-light !text-slate-600 border border-gray-100 !text-xs'>Lenovo</button>
          <button className='btn btn-light !text-slate-600 border border-gray-100 !text-xs'>Asus</button>
          <button className='btn btn-light !text-slate-600 border border-gray-100 !text-xs'>Acer</button>
          <button className='btn btn-light !text-slate-600 border border-gray-100 !text-xs'>MSI</button>
        </div>
      </div>
      {isLoading ? <LoadingItem /> : <CarouselProduct dataSource={products || []} />}
    </div>
  )
}

export default LaptopSaleView
