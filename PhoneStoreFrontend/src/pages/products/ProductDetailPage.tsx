import { FC, useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { ConfigProvider, Rate } from 'antd'
import { BookmarkCheck, CalendarClock, Check, PackageOpen, Plus, ShoppingCart, Smartphone } from 'lucide-react'
import CarouselProductImages from './components/CarouselProductImages'
import PriceButton from './components/PriceButton'
import ColorPriceButton from './components/ColorPriceButton'
import formatPrice from '../../utils/formatPrice'
import { GiftFilled } from '@ant-design/icons'
import { ContainerPanel, LoadingOpacity } from '../../components'
import ProductSpecifications from './components/ProductSpecifications'
import ProductFeatures from './components/ProductFeatures'
import ProductReviews from './components/ProductReviews'
import ProductComments from './components/ProductComments'
import useSetDocTitle from '@/hooks/useSetDocTitle'
import { useGetVariantByProductId, useGetVariantBySlug } from '@/hooks/querys/product_variant.query'
import getPriceAfterDiscount from '@/utils/getPriceAfterDiscount'
import { getProductRoute } from '@/utils/getProductRoute'
import { getMainImage } from '@/utils/getMainImage'
import ListSimilarProducts from './components/ListSimilarProducts'
import { CartItemRequestType } from '@/types/cart_item.type'
import { useAppDispatch, useAppSelector, useModal } from '@/hooks'
import LoginOfRegisterModal from '@/components/modals/LoginOrRegisterModal'
import { toast } from 'react-toastify'
import classNames from 'classnames'
import { addCartItem } from '@/features/cart/cartThunks'
import { setListSelected } from '@/features/cart/cart.slice'

interface ProductDetailPageProps {}
const ProductDetailPage: FC<ProductDetailPageProps> = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { productSlug } = useParams<{ productSlug: string }>()
  const { data: productVariant, isLoading, error } = useGetVariantBySlug(productSlug || '')
  const { data: listVariants, isLoading: isLoadingVariants } = useGetVariantByProductId(productVariant?.productId || 0)

  useSetDocTitle(productVariant?.product.name || 'Product Detail')

  const [selectedStorage, setSelectedStorage] = useState<string>(productVariant?.storage || '')
  const userId = useAppSelector((state) => state.auth.user?.id)
  const { isOpen, openModal, closeModal } = useModal()
  const [isLoadingAddToCart, setIsLoadingAddToCart] = useState<boolean>(false)

  useEffect(() => {
    if (listVariants && productVariant) {
      setSelectedStorage(productVariant.storage)
    }
  }, [listVariants, productVariant])

  const handleAddToCart = async () => {
    if (userId) {
      if (productVariant) {
        const cartItem: CartItemRequestType = {
          productVariantId: productVariant.productVariantId,
          quantity: 1
        }
        setIsLoadingAddToCart(true)
        await dispatch(addCartItem({ userId, cartItem }))
        setIsLoadingAddToCart(false)
        toast('Thêm vào giỏ hàng thành công')
      }
    } else {
      openModal()
    }
  }

  const handleBuyNow = async () => {
    if (userId) {
      if (productVariant) {
        const cartItem: CartItemRequestType = {
          productVariantId: productVariant.productVariantId,
          quantity: 1
        }
        setIsLoadingAddToCart(true)
        await dispatch(addCartItem({ userId, cartItem }))
        dispatch(setListSelected([cartItem.productVariantId]))
        setIsLoadingAddToCart(false)
        navigate('/cart')
      }
    } else {
      openModal()
    }
  }

  if (error) return <Navigate to={'/not-found'} />

  return (
    <div className='flex flex-col my-4 gap-y-4'>
      <LoginOfRegisterModal isOpen={isOpen} onClose={closeModal} />
      {/* {isLoading && <LoadingOpacity />} */}
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-2'>
          <div className='text-xl font-semibold'>
            {productVariant?.product.name + ' ' + productVariant?.variantName}
          </div>
          <ConfigProvider
            theme={{
              token: {
                marginXS: 0
              }
            }}
          >
            <Rate value={5} allowHalf disabled className='text-base text-yellow-500' />
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
          <div className='col-span-6 sticky top-[108px] h-max'>
            {productVariant && (
              <CarouselProductImages
                productVariantId={productVariant.productVariantId}
                dataSources={productVariant.productImages}
              />
            )}
            <div className='flex flex-col mt-6 gap-y-6'>
              <ContainerPanel title='Thông tin sản phẩm'>
                <ContainerPanel.Item
                  iconElement={<Smartphone size={22} strokeWidth={1.6} />}
                  text='Mới, đầy đủ phụ kiện từ nhà sản xuất'
                />

                {productVariant && (
                  <ContainerPanel.Item
                    iconElement={<PackageOpen size={22} strokeWidth={1.6} />}
                    text={`${productVariant.product.category.name} ${productVariant.product.name} ${productVariant.variantName}`}
                  />
                )}

                <ContainerPanel.Item
                  iconElement={<CalendarClock size={22} strokeWidth={1.6} />}
                  text='1 ĐỔI 1 trong 30 ngày nếu có lỗi phần cứng nhà sản xuất'
                />

                <ContainerPanel.Item
                  iconElement={<BookmarkCheck size={22} strokeWidth={1.6} />}
                  text='Giá sản phẩm đã bao gồm VAT'
                />
              </ContainerPanel>
            </div>
          </div>
          <div className='flex flex-col col-span-4 sticky top-[80px] h-max gap-y-3'>
            <div className='grid grid-cols-3 gap-2.5'>
              {productVariant && isLoadingVariants && (
                <PriceButton
                  title={productVariant.storage}
                  price={getPriceAfterDiscount(productVariant.price, productVariant.discount?.percentage || 0)}
                />
              )}
              {listVariants &&
                listVariants
                  .filter((variant, index, self) => index === self.findIndex((v) => v.storage === variant.storage))
                  .map((variant) => (
                    <PriceButton
                      onClick={() =>
                        navigate(getProductRoute(productVariant?.product.category.name || '', variant.slug))
                      }
                      isActive={variant.storage === selectedStorage}
                      key={variant.slug}
                      title={variant.storage}
                      price={getPriceAfterDiscount(variant.price, variant.discountPercentage)}
                    />
                  ))}
            </div>
            <div className='mt-2 text-sm font-bold text-black/70'>Chọn màu để xem giá</div>
            <div className='grid gap-2.5 grid-cols-3'>
              {productVariant && isLoadingVariants && (
                <ColorPriceButton
                  onClick={() =>
                    navigate(getProductRoute(productVariant.product.category.name || '', productVariant.slug))
                  }
                  isActive={true}
                  disabled={false}
                  title={productVariant.color}
                  price={getPriceAfterDiscount(productVariant.price, productVariant.discount?.percentage || 0)}
                  img={getMainImage(productVariant.productImages)?.imageUrl || ''}
                />
              )}
              {listVariants &&
                productVariant &&
                listVariants
                  .filter((v) => v.storage === productVariant?.storage)
                  .map((variant) => (
                    <ColorPriceButton
                      onClick={() =>
                        navigate(getProductRoute(productVariant.product.category.name || '', variant.slug))
                      }
                      key={variant.slug}
                      isActive={variant.slug === productVariant.slug}
                      disabled={false}
                      title={variant.color}
                      price={getPriceAfterDiscount(variant.price, variant.discountPercentage)}
                      img={variant.imageUrl}
                    />
                  ))}
            </div>
            <div className='flex flex-col gap-2.5 mt-2'>
              {productVariant && (
                <div className='flex items-center justify-center px-2 py-0.5 border rounded-lg border-primary'>
                  <div className='flex flex-col items-center'>
                    <span className='text-xl font-bold text-primary'>
                      {formatPrice(
                        getPriceAfterDiscount(productVariant.price, productVariant.discount?.percentage || 0)
                      )}
                    </span>
                    <span className='text-sm font-semibold text-gray-800 line-through'>
                      {formatPrice(productVariant ? productVariant.price : 0)}
                    </span>
                  </div>
                </div>
              )}
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
                      Xem chính sách ưu đãi dành cho thành viên Smember
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex gap-2.5'>
                <button
                  onClick={handleBuyNow}
                  disabled={isLoadingAddToCart}
                  className={classNames('flex items-center w-full flex-1 btn btn-danger h-[60px]', {
                    'opacity-50 cursor-not-allowed': isLoadingAddToCart
                  })}
                >
                  <span className='text-lg font-bold leading-none uppercase'>Mua ngay</span>
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={isLoadingAddToCart}
                  className={classNames('items-center p-0 gap-1 btn btn-outline flex-col w-[60px] flex-shrink-0', {
                    'opacity-50 cursor-not-allowed': isLoadingAddToCart
                  })}
                >
                  <span className=''>
                    <ShoppingCart size={28} strokeWidth={1.6} />
                  </span>
                  <span className='text-[8px] font-medium text-nowrap'>Thêm vào giỏ</span>
                </button>
              </div>
            </div>

            <div className='flex flex-col mt-2 border rounded-xl border-primary/10'>
              <div className='flex gap-2 px-3 py-3 text-black bg-gray-300 rounded-t-xl'>
                <span className='font-bold uppercase'>Ưu đãi thêm</span>
              </div>
              <div className='flex flex-col gap-4 p-3'>
                <div className='flex items-start gap-2 cursor-pointer group'>
                  <div className='flex items-center justify-center flex-shrink-0 w-4 h-4 overflow-hidden text-xs font-bold text-white bg-green-500 rounded-full'>
                    <Check size={12} strokeWidth={2} />
                  </div>
                  <p className='text-sm font-normal text-gray-900 group-hover:underline'>
                    Nhập mã VNPAY5 giảm từ 50,000đ đến 200,000đ (áp dụng tùy giá trị đơn hàng) khi thanh toán qua
                    VNPAY-QR.
                  </p>
                </div>
                <div className='flex items-start gap-2 cursor-pointer group'>
                  <div className='flex items-center justify-center flex-shrink-0 w-4 h-4 overflow-hidden text-xs font-bold text-white bg-green-500 rounded-full'>
                    <Check size={12} strokeWidth={2} />
                  </div>
                  <p className='text-sm font-normal text-gray-900 group-hover:underline'>
                    Nhập mã MOMO5 giảm từ 50,000đ đến 200,000đ (áp dụng tùy giá trị đơn hàng) khi thanh toán qua
                    MOMO-QR.
                  </p>
                </div>
                <div className='flex items-start gap-2 cursor-pointer group'>
                  <div className='flex items-center justify-center flex-shrink-0 w-4 h-4 overflow-hidden text-xs font-bold text-white bg-green-500 rounded-full'>
                    <Check size={12} strokeWidth={2} />
                  </div>
                  <p className='text-sm font-normal text-gray-900 group-hover:underline'>
                    Nhập mã VNPAY5 giảm từ 50,000đ đến 200,000đ (áp dụng tùy giá trị đơn hàng) khi thanh toán qua
                    VNPAY-QR.
                  </p>
                </div>
                <div className='flex items-start gap-2 cursor-pointer group'>
                  <div className='flex items-center justify-center flex-shrink-0 w-4 h-4 overflow-hidden text-xs font-bold text-white bg-green-500 rounded-full'>
                    <Check size={12} strokeWidth={2} />
                  </div>
                  <p className='text-sm font-normal text-gray-900 group-hover:underline'>
                    Nhập mã MOMO5 giảm từ 50,000đ đến 200,000đ (áp dụng tùy giá trị đơn hàng) khi thanh toán qua
                    MOMO-QR.
                  </p>
                </div>
                <div className='flex items-start gap-2 cursor-pointer group'>
                  <div className='flex items-center justify-center flex-shrink-0 w-4 h-4 overflow-hidden text-xs font-bold text-white bg-green-500 rounded-full'>
                    <Check size={12} strokeWidth={2} />
                  </div>
                  <p className='text-sm font-normal text-gray-900 group-hover:underline'>
                    Liên hệ B2B để được tư vấn giá tốt nhất cho khách hàng doanh nghiệp khi mua số lượng nhiều
                  </p>
                </div>
                <div className='flex items-start gap-2 cursor-pointer group'>
                  <div className='flex items-center justify-center flex-shrink-0 w-4 h-4 overflow-hidden text-xs font-bold text-white bg-green-500 rounded-full'>
                    <Check size={12} strokeWidth={2} />
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
        {productVariant && <ListSimilarProducts productVariant={productVariant} />}

        <div className='grid grid-cols-10 gap-x-2.5'>
          {productVariant && (
            <div className='flex flex-col col-span-7 gap-y-4'>
              <ProductFeatures productVariant={productVariant} />
              <ProductReviews productVariant={productVariant} />
              <ProductComments productVariant={productVariant} />
            </div>
          )}
          <div className='col-span-3'>
            {productVariant && <ProductSpecifications productVariantId={productVariant?.productVariantId} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
