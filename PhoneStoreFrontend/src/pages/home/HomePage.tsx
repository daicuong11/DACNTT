import CarouselBanner from './components/CarouselBanner'
import CategoryContainer from './components/CategoryContainer'
import FlashSaleView from './components/FlashSaleView'
import LaptopSaleView from './components/LaptopSaleView'
import MobileSaleView from './components/MobileSaleView'
import RightBanner from './components/RightBanner'

const HomePage = () => {
  return (
    <div className='w-full py-4'>
      <div className='flex items-start justify-between gap-x-4'>
        <CategoryContainer />
        <div className='flex flex-1 w-[calc(100%-(472px))] h-[352px] bg-white shadow rounded-bl-xl rounded-br-xl shadow-slate-900/20'>
          <CarouselBanner />
        </div>
        <div className='flex-shrink-0 bg-white w-[220px] h-[352px] text-xs'>
          <RightBanner />
        </div>
      </div>

      <div className='flex flex-col mt-4 gap-y-4'>
        <FlashSaleView />
        <MobileSaleView />
        <LaptopSaleView />
      </div>
    </div>
  )
}

export default HomePage
