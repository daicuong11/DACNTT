import CarouselBanner from './components/CarouselBanner'
import CategoryContainer from './components/CategoryContainer'
import FlashSaleView from './components/FlashSaleView'
import RightBanner from './components/RightBanner'

const HomePage = () => {
  return (
    <div className='w-full my-4'>
      <div className='flex items-start justify-between gap-x-4'>
        <CategoryContainer />
        <div className='flex flex-1 w-[calc(100%-(472px))] h-[352px] bg-white shadow rounded-bl-xl rounded-br-xl shadow-slate-900/20'>
          <CarouselBanner />
        </div>
        <div className='flex-shrink-0 bg-white w-[220px] h-[352px] text-xs'>
          <RightBanner />
        </div>
      </div>

      {/* hot sale */}
      <div className='mt-4'>
        <FlashSaleView startTime='2024-12-07T09:00:00' endTime='2024-12-09T00:00:00' />
      </div>
    </div>
  )
}

export default HomePage
