import { FC, useEffect } from 'react'
import { listItems } from '../../datas'
import { useParams } from 'react-router-dom'
import { ConfigProvider, Rate } from 'antd'
import { getRating } from '../../utils/getRating'
import { BookmarkCheck, CalendarClock, Heart, PackageOpen, Plus, ShoppingCart, Smartphone } from 'lucide-react'
import CarouselProductImages from './components/CarouselProductImages'
import { iphone16_hong } from '../../assets/images/iphone'
import PriceButton from './components/PriceButton'
import ColorPriceButton from './components/ColorPriceButton'
import formatPrice from '../../utils/formatPrice'
import { GiftFilled } from '@ant-design/icons'
import { ContainerPanel } from '../../components'
import CarouselProduct from '../home/components/CarouselProduct'
import ProductSpecifications from './components/ProductSpecifications'
import ProductFeatures from './components/ProductFeatures'
import ProductReviews from './components/ProductReviews'

interface ProductDetailPageProps {}
const ProductDetailPage: FC<ProductDetailPageProps> = () => {
  const { productSlug } = useParams<{ productSlug: string }>()
  const product = listItems.find((item) => item.slug === productSlug)

  useEffect(() => {
    document.title = product?.name || 'Product Detail'
  }, [productSlug])

  return (
    <div className='flex flex-col my-4 gap-y-4'>
      <div className='flex flex-col gap-4'>
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
        <div className='w-full h-[1px] bg-slate-200'></div>
        <div className='grid w-full grid-cols-10 gap-6'>
          <div className='col-span-6 sticky top-[80px] h-max'>
            <CarouselProductImages />
            <div className='flex flex-col mt-6 gap-y-6'>
              <ContainerPanel title='Thông tin sản phẩm'>
                <ContainerPanel.Item
                  iconElement={<Smartphone size={22} strokeWidth={1.6} />}
                  text='CellphoneS hiện là đại lý bán lẻ uỷ quyền iPhone chính hãng VN/A của Apple Việt Nam'
                />

                <ContainerPanel.Item
                  iconElement={<PackageOpen size={22} strokeWidth={1.6} />}
                  text='iPhone sử dụng iOS 18, Cáp Sạc USB‑C (1m), Tài liệu'
                />

                <ContainerPanel.Item
                  iconElement={<CalendarClock size={22} strokeWidth={1.6} />}
                  text='1 ĐỔI 1 trong 30 ngày nếu có lỗi phần cứng nhà sản xuất. Bảo hành 12 tháng tại trung tâm bảo hành chính hãng Apple: CareS.vn(xem chi tiết)'
                />

                <ContainerPanel.Item
                  iconElement={<BookmarkCheck size={22} strokeWidth={1.6} />}
                  text='Giá sản phẩm đã bao gồm VAT'
                />
              </ContainerPanel>
            </div>
          </div>
          <div className='flex flex-col col-span-4 sticky top-[80px] h-max gap-y-3'>
            <div className='flex gap-2'>
              <PriceButton isActive={true} title='128GB' price={21990000} />
              <PriceButton isActive={false} title='256GB' price={21990000} />
              <PriceButton isActive={false} title='1TB' price={21990000} />
            </div>
            <div className='mt-2 text-sm font-bold text-black/70'>Chọn màu để xem giá</div>
            <div className='flex gap-2.5 flex-wrap'>
              <ColorPriceButton isActive={false} disabled title='Hồng' price={21990000} img={iphone16_hong} />
              <ColorPriceButton isActive={true} title='Đen' price={21990000} img={iphone16_hong} />
              <ColorPriceButton isActive={false} title='Trắng' price={21990000} img={iphone16_hong} />
              <ColorPriceButton isActive={false} disabled title='Xanh' price={21990000} img={iphone16_hong} />
              <ColorPriceButton isActive={false} title='Vàng' price={21990000} img={iphone16_hong} />
            </div>
            <div className='flex flex-col gap-2.5 mt-2'>
              <button className='flex flex-col items-center w-full gap-0 btn btn-danger'>
                <span className='text-lg font-bold uppercase'>Mua ngay</span>
                <div className='flex items-center gap-3'>
                  <span className='text-lg font-bold'>{formatPrice(21990000)}</span>
                  <span className='text-sm font-semibold line-through text-black/50'>{formatPrice(23990000)}</span>
                </div>
              </button>
              <button className='items-center w-full py-2 btn btn-warning'>
                <span>Thêm vào giỏ hàng</span>
                <span className=''>
                  <ShoppingCart size={24} strokeWidth={1.6} />
                </span>
              </button>
              <button className='btn btn-outline'>
                <span>Thêm vào yêu thích</span>
                <span>
                  <Heart size={24} strokeWidth={1.6} />
                </span>
              </button>
            </div>

            <div className='flex flex-col mt-2 border rounded-xl border-primary/10'>
              <div className='flex gap-2 px-3 py-3 bg-primary/15 text-primary rounded-t-xl'>
                <span>
                  <GiftFilled className='text-xl' />
                </span>
                <span className='font-bold'>Khuyến mãi</span>
              </div>
              <div className='flex flex-col gap-4 p-3'>
                <div className='flex items-start gap-2 cursor-pointer group'>
                  <div className='flex items-center justify-center flex-shrink-0 w-5 h-5 overflow-hidden text-xs font-bold text-white rounded-full bg-primary'>
                    1
                  </div>
                  <p className='text-sm font-normal text-gray-900 group-hover:underline'>
                    Nhập mã VNPAY5 giảm từ 50,000đ đến 200,000đ (áp dụng tùy giá trị đơn hàng) khi thanh toán qua
                    VNPAY-QR.
                  </p>
                </div>
                <div className='flex items-start gap-2 cursor-pointer group'>
                  <div className='flex items-center justify-center flex-shrink-0 w-5 h-5 overflow-hidden text-xs font-bold text-white rounded-full bg-primary'>
                    2
                  </div>
                  <p className='text-sm font-normal text-gray-900 group-hover:underline'>
                    Nhập mã MOMO5 giảm từ 50,000đ đến 200,000đ (áp dụng tùy giá trị đơn hàng) khi thanh toán qua
                    MOMO-QR.
                  </p>
                </div>
                <div className='flex items-start gap-2 cursor-pointer group'>
                  <div className='flex items-center justify-center flex-shrink-0 w-5 h-5 overflow-hidden text-xs font-bold text-white rounded-full bg-primary'>
                    3
                  </div>
                  <p className='text-sm font-normal text-gray-900 group-hover:underline'>
                    Nhập mã VNPAY5 giảm từ 50,000đ đến 200,000đ (áp dụng tùy giá trị đơn hàng) khi thanh toán qua
                    VNPAY-QR.
                  </p>
                </div>
                <div className='flex items-start gap-2 cursor-pointer group'>
                  <div className='flex items-center justify-center flex-shrink-0 w-5 h-5 overflow-hidden text-xs font-bold text-white rounded-full bg-primary'>
                    4
                  </div>
                  <p className='text-sm font-normal text-gray-900 group-hover:underline'>
                    Nhập mã MOMO5 giảm từ 50,000đ đến 200,000đ (áp dụng tùy giá trị đơn hàng) khi thanh toán qua
                    MOMO-QR.
                  </p>
                </div>
                <div className='flex items-start gap-2 cursor-pointer group'>
                  <div className='flex items-center justify-center flex-shrink-0 w-5 h-5 overflow-hidden text-xs font-bold text-white rounded-full bg-primary'>
                    5
                  </div>
                  <p className='text-sm font-normal text-gray-900 group-hover:underline'>
                    Liên hệ B2B để được tư vấn giá tốt nhất cho khách hàng doanh nghiệp khi mua số lượng nhiều
                  </p>
                </div>
                <div className='flex items-start gap-2 cursor-pointer group'>
                  <div className='flex items-center justify-center flex-shrink-0 w-5 h-5 overflow-hidden text-xs font-bold text-white rounded-full bg-primary'>
                    6
                  </div>
                  <p className='text-sm font-normal text-gray-900 group-hover:underline'>
                    Xem chính sách ưu đãi dành cho thành viên Smember
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full h-[1px] bg-slate-200'></div>
      </div>
      <div className='flex flex-col gap-y-4'>
        <div className='text-xl font-bold leading-none uppercase text-black/70'>Sản phẩm tương tự</div>
        <CarouselProduct autoPlay={false} dataSource={listItems} />

        <div className='w-full h-[1px] bg-slate-200'></div>

        <div className='grid grid-cols-10 gap-x-2.5'>
          <div className='flex flex-col col-span-7 gap-y-4'>
            <ProductFeatures product={product} />
            <ProductReviews product={product} />
          </div>
          <div className='col-span-3'>
            <ProductSpecifications />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
