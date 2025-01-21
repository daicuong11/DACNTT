import { FC } from 'react'
import CarouselProduct from './CarouselProduct'
import { exampleProductVariant } from '../../../datas'

interface LaptopSaleViewProps {}
const LaptopSaleView: FC<LaptopSaleViewProps> = () => {
  return (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-2'>
        <div className='text-xl font-bold uppercase text-black/70'>Laptop</div>
        <div className='flex items-center gap-2.5'>
          <button className='btn btn-light !text-slate-600 !text-xs'>Macbook</button>
          <button className='btn btn-light !text-slate-600 !text-xs'>Dell</button>
          <button className='btn btn-light !text-slate-600 !text-xs'>HP</button>
          <button className='btn btn-light !text-slate-600 !text-xs'>Lenovo</button>
          <button className='btn btn-light !text-slate-600 !text-xs'>Asus</button>
          <button className='btn btn-light !text-slate-600 !text-xs'>Acer</button>
          <button className='btn btn-light !text-slate-600 !text-xs'>MSI</button>
        </div>
      </div>
      <CarouselProduct row={2} autoPlay={false} dataSource={exampleProductVariant} />
    </div>
  )
}

export default LaptopSaleView
