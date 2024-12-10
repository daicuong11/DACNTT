import { FC } from 'react'
import { listItems } from '../../datas'
import { useParams } from 'react-router-dom'
import { ConfigProvider, Rate } from 'antd'
import { getRating } from '../../utils/getRating'
import { Plus } from 'lucide-react'
import CarouselProductImages from './components/CarouselProductImages'
import { iphone16_hong } from '../../assets/images/iphone'
import PriceButton from './components/PriceButton'
import ColorPriceButton from './components/ColorPriceButton'

interface ProductDetailPageProps {}
const ProductDetailPage: FC<ProductDetailPageProps> = () => {
  const { productSlug } = useParams<{ productSlug: string }>()
  const product = listItems.find((item) => item.slug === productSlug)

  return (
    <div className='flex flex-col gap-4 my-4'>
      <div className='flex items-center gap-2'>
        <div className='text-xl font-semibold'>{product?.name}</div>
        <ConfigProvider
          theme={{
            token: {
              marginXS: 0
            }
          }}
        >
          <Rate
            value={product ? getRating(product.productId) : 5}
            allowHalf
            disabled
            className='text-base text-yellow-500'
          />
        </ConfigProvider>
        <div className='text-sm text-gray-500'>10 đánh giá</div>
        <button className='py-1 text-sm btn btn-outline'>
          <span>
            <Plus size={16} />
          </span>
          So sánh
        </button>
      </div>
      <div className='w-full h-0.5 bg-slate-100 bg-opacity-80'></div>
      <div className='grid w-full grid-cols-10 gap-6'>
        <div className='col-span-6'>
          <CarouselProductImages />
        </div>
        <div className='col-span-4'>
          <div className='flex gap-2.5'>
            <PriceButton isActive={false} disabled title='128GB' price={21990000} />
            <ColorPriceButton isActive={false} disabled title='Hồng' price={21990000} img={iphone16_hong} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
