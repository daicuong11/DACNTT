import useSetDocTitle from '../../hooks/useSetDocTitle'
import CarouselBanner from './components/CarouselBanner'
import CategoryContainer from './components/CategoryContainer'
import FlashSaleView from './components/FlashSaleView'
import LaptopSaleView from './components/LaptopSaleView'
import MobileSaleView from './components/MobileSaleView'
import RightBanner from './components/RightBanner'
import SaleView from './components/SaleView'
import WatchCameraView from './components/WatchCameraView'

const initPage = ['Máy tính bảng', 'Âm thanh', 'Phụ kiện', 'Tivi', 'PC', 'Màn hình', 'Máy in']

const HomePage = () => {
  useSetDocTitle('BC Mobile')

  return (
    <div className='w-full py-4'>
      <div className='flex items-start justify-between gap-x-4 h-[352px]'>
        <CategoryContainer />
        <div className='flex flex-1 w-[calc(100%-(472px))] h-full bg-white shadow overflow-hidden rounded-b-xl shadow-black/25'>
          <CarouselBanner />
        </div>
        <div className='flex-shrink-0 bg-white w-[220px] h-full text-xs lg:block hidden'>
          <RightBanner />
        </div>
      </div>

      <div className='flex flex-col mt-4 gap-y-4'>
        <FlashSaleView />
        <MobileSaleView />
        <LaptopSaleView />
        <WatchCameraView />
        {initPage.map((categoryName, index) => (
          <SaleView key={index} categoryName={categoryName} />
        ))}
        {/* {[
          'bg-gradient-luxury-2',
          'bg-gradient-gold',
          'bg-gradient-romantic',
          'bg-gradient-magic',
          'bg-gradient-luxury',
          'bg-gradient-luxury-1'
        ].map((css, index) => (
          <div className={classNames('mt-4 bg-cover  rounded-xl ', css)} key={index}>
            <div className='flex items-end p-4 text-white'>
              <span className='mr-2 border-2 border-white rounded-full'>
                <Sparkles size={34} strokeWidth={1.6} />
              </span>
              <span className='text-[24px] font-bold uppercase mr-4'>Sản phẩm nổi bật</span>
            </div>

            <CarouselProduct autoPlay={false} dataSource={exampleProductVariant} />
          </div>
        ))} */}
      </div>
    </div>
  )
}

export default HomePage
