import { FC, HTMLAttributes } from 'react'
import { ProductType } from '../../types/product.type'
import { ConfigProvider, Flex, Rate, Tag } from 'antd'
import FavoriteButton from '../buttons/FavoriteButton'
import { WishlistType } from '../../types/wishlist.type'
import { toast } from 'react-toastify'
import { ReviewResponseType } from '../../types/response.type'
import classNames from 'classnames'

interface ProductCardType extends HTMLAttributes<HTMLDivElement> {
  item: ProductType
}

const myFavorite: WishlistType = {
  wishListId: 1,
  userId: 1,
  wishListItems: [
    {
      wishListItemId: 1,
      wishListId: 1,
      productId: 1
    },
    {
      wishListItemId: 2,
      wishListId: 1,
      productId: 2
    }
  ]
}

const exampleReview = [
  {
    reviewId: 1,
    productId: 1,
    rating: 5
  },
  {
    reviewId: 2,
    productId: 2,
    rating: 4.8
  },
  {
    reviewId: 3,
    productId: 3,
    rating: 3.5
  },
  {
    reviewId: 4,
    productId: 0,
    rating: 5
  },
  {
    reviewId: 5,
    productId: 6,
    rating: 4.7
  }
] as { reviewId: number; productId: number; rating: number }[]

const ProductCard: FC<ProductCardType> = ({ item, ...props }) => {
  const checkWishList = (productId: number): boolean => {
    return myFavorite.wishListItems.some((item) => item.productId === productId)
  }

  const getRating = (productId: number): any => {
    return exampleReview.find((item) => item.productId === productId)?.rating || -1
  }

  const handleSetWishList = (productId: number) => {
    const isExist = checkWishList(productId)
    if (isExist) {
      myFavorite.wishListItems = myFavorite.wishListItems.filter((item) => item.productId !== productId)
      toast.success('Đã xóa khỏi yêu thích')
    } else {
      myFavorite.wishListItems.push({
        wishListItemId: myFavorite.wishListItems.length + 1,
        wishListId: myFavorite.wishListId,
        productId
      })
      toast.success('Đã thêm vào yêu thích')
    }
  }

  return (
    <div
      {...props}
      onClick={() => console.log('ProductCard')}
      className='relative h-[392px] min-w-[224px] cursor-pointer rounded-xl bg-white p-[10px] flex flex-col shadow shadow-slate-900/20'
    >
      <div className='flex-[5] flex items-center justify-center'>
        <img
          src='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-tecno-spark-go-1.png'
          alt={item.name}
          className='w-[160px] h-[160px] object-center mt-3'
        />
      </div>
      <div className='flex-[6] flex flex-col'>
        <div className='flex flex-col gap-3 mt-2'>
          <h2 className='h-[60px] text-sm font-bold text-black/80 line-clamp-3'>{item.name}</h2>
          <div className='flex items-end gap-1 font-sans font-bold'>
            <span className='leading-none text-primary'>12.790.000đ</span>
            <span className='text-sm leading-none line-through text-slate-600'>12.790.000đ</span>
          </div>
          <Flex gap='4px 0' wrap>
            <Tag color='green'>Fre ship</Tag>
            <Tag color='cyan'>Trả góp 0%</Tag>
            <Tag color='volcano'>Đang bán chạy</Tag>
            <Tag color='purple'>Rẻ vô địch</Tag>
          </Flex>
        </div>
        <div className='flex flex-col justify-end flex-1 mt-2'>
          <div className='flex items-center justify-between'>
            <div className={classNames({ invisible: getRating(item.productId) === -1 })}>
              <ConfigProvider
                theme={{
                  token: {
                    marginXS: 0
                  }
                }}
              >
                <Rate value={getRating(item.productId)} allowHalf disabled className='text-base' />
              </ConfigProvider>
            </div>
            <div onClick={(e) => e.stopPropagation()} className='flex items-center'>
              <span className='text-xs text-gray-500'>Yêu thích</span>
              <FavoriteButton
                isLove={checkWishList(item.productId)}
                onClick={() => handleSetWishList(item.productId)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='absolute top-0 flex items-center justify-center w-20 py-1.5 rounded-r-full -left-1 bg-primary'>
        <p className='text-xs font-bold text-white'>Giảm 10%</p>
        <div className='absolute left-0 flex items-center justify-center w-1 h-1 rounded-b-full -bottom-1 bg-[#c2181a]'></div>
      </div>
    </div>
  )
}

export default ProductCard
