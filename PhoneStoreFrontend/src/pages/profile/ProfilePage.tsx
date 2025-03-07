import { rightBannerImages } from '@/assets/images'
import { AvatarCustom, LoadingItem, ProductCardSimple } from '@/components'
import { useAppSelector } from '@/hooks'
import { maskPhoneNumber } from '@/utils/maskPhoneNumber'
import { EyeFilled, EyeInvisibleFilled, UserOutlined } from '@ant-design/icons'
import { Avatar, Empty, Tag } from 'antd'
import { ChevronDown, ClipboardList, MapPinHouse, Ticket, UserRound } from 'lucide-react'
import { FC, useMemo, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { RoleEnum } from '@/types/user.type'
import { useGetOrdersByStatus } from '@/hooks/querys/order.query'
import formatPrice from '@/utils/formatPrice'
import classNames from 'classnames'
import { useGetMyWishlist } from '@/hooks/querys/wishlist.query'

interface ProfilePageProps {}

const ProfilePage: FC<ProfilePageProps> = () => {
  const [isShowPhoneNumber, setIsShowPhoneNumber] = useState(false)
  const navigate = useNavigate()
  const currentUser = useAppSelector((state) => state.auth.user)

  const { data: ordersAll, isLoading: isLoadingOrderAll } = useGetOrdersByStatus(currentUser?.id || 0, 'all')
  const { data: wishlist, isLoading: isLoadingWishlist } = useGetMyWishlist(currentUser?.id || 0)

  const totalPay = useMemo(() => {
    return ordersAll?.reduce((total, order) => {
      if (order.status === 'delivered') {
        return total + order.totalAmount
      }
      return total
    }, 0)
  }, [ordersAll])

  if (!currentUser) {
    return <Navigate to='/signin' />
  }

  return (
    <div className='py-4'>
      <div className='flex px-2 gap-x-2'>
        <AvatarCustom size={72} name={currentUser.name} role={currentUser.role} />
        <div className='flex flex-col gap-y-0.5'>
          <h1 className='text-[19px] font-semibold text-pink-600 uppercase leading-none'>{currentUser.name}</h1>
          <div className='flex items-center text-sm font-medium text-gray-500 gap-x-2'>
            {isShowPhoneNumber ? currentUser.phoneNumber : maskPhoneNumber(currentUser.phoneNumber)}
            {isShowPhoneNumber ? (
              <EyeInvisibleFilled onClick={() => setIsShowPhoneNumber(false)} className='p-1 text-lg cursor-pointer' />
            ) : (
              <EyeFilled onClick={() => setIsShowPhoneNumber(true)} className='p-1 text-lg cursor-pointer' />
            )}
          </div>
          <span>
            {currentUser?.role === RoleEnum.ADMIN ? (
              <Tag color='red'>Quản trị viên</Tag>
            ) : (
              <Tag color='blue'>Khách hàng</Tag>
            )}
          </span>
        </div>
      </div>
      <div className='grid grid-cols-10 mt-6 gap-x-3'>
        <div className='flex flex-col col-span-full lg:col-span-7 xl:col-span-8 gap-y-3'>
          <div
            className={classNames(
              'flex items-center flex-1 justify-between p-3 text-black bg-white border rounded-lg',
              {
                'animate-pulse': isLoadingOrderAll
              }
            )}
          >
            <div className='flex flex-col items-center justify-center flex-1 gap-y-4'>
              <h1 className='text-xl font-bold sm:text-3xl'>{ordersAll?.length}</h1>
              <h5 className='text-[11px] sm:text-[13px]'>đơn hàng</h5>
            </div>
            <div className='w-[1px] bg-black-2 h-20'></div>
            <div className='flex flex-col items-center justify-center flex-1 gap-y-4'>
              <h1 className='text-xl font-bold sm:text-3xl'>{formatPrice(totalPay || 0)}</h1>
              <h5 className='text-[11px] sm:text-[13px]'>Tổng tiền tích lũy mua sắm</h5>
            </div>
          </div>

          <div className='grid grid-cols-2 flex-1 p-3 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 text-black bg-white border rounded-lg'>
            <div
              onClick={() => navigate('coupon')}
              className='flex flex-col items-center justify-center px-2 cursor-pointer gap-y-1'
            >
              <span className='flex items-center justify-center w-12 h-12 rounded-full bg-blue-100/60'>
                <Ticket size={24} strokeWidth={1.6} />
              </span>
              <span className='text-xs font-medium leading-4 text-center sm:text-sm font-roboto text-nowrap text-black-2'>
                Mã giảm giá
              </span>
            </div>
            <div
              onClick={() => navigate('order')}
              className='flex flex-col items-center justify-center px-2 cursor-pointer gap-y-1'
            >
              <span className='flex items-center justify-center w-12 h-12 rounded-full bg-blue-100/60'>
                <ClipboardList size={24} strokeWidth={1.6} />
              </span>
              <span className='text-xs font-medium leading-4 text-center sm:text-sm font-roboto text-nowrap text-black-2'>
                Lịch sử mua hàng
              </span>
            </div>
            <div
              onClick={() => navigate('user-info/address-info')}
              className='flex flex-col items-center justify-center px-2 cursor-pointer gap-y-1'
            >
              <span className='flex items-center justify-center w-12 h-12 rounded-full bg-blue-100/60'>
                <MapPinHouse size={24} strokeWidth={1.6} />
              </span>
              <span className='text-xs font-medium leading-4 text-center sm:text-sm font-roboto text-nowrap text-black-2'>
                Sổ địa chỉ
              </span>
            </div>
            <div
              onClick={() => navigate('user-info')}
              className='flex flex-col items-center justify-center px-2 cursor-pointer gap-y-1'
            >
              <span className='flex items-center justify-center w-12 h-12 rounded-full bg-blue-100/60'>
                <UserRound size={24} strokeWidth={1.6} />
              </span>
              <span className='text-xs font-medium leading-4 text-center sm:text-sm font-roboto text-nowrap text-black-2'>
                Cập nhật thông tin
              </span>
            </div>
          </div>
        </div>
        <div className='flex-col hidden col-span-3 xl:col-span-2 lg:flex gap-y-3 '>
          {rightBannerImages.map((image, index) => (
            <img key={index} src={image.image} className='object-cover border rounded-lg flex-1 min-h-[105.6px]' />
          ))}
        </div>
      </div>

      <div className='mt-5'>
        <div className='mb-3 text-lg font-medium to-black-2'>Sản phẩm bạn yêu thích</div>
        {wishlist?.length === 0 && (
          <div className='flex items-center justify-center w-full py-20 text-center'>
            <Empty description='Bạn chưa có sản phẩm yêu thích nào' />
          </div>
        )}
        <div className='grid gap-2.5 grid-cols-2 min-[600px]:grid-cols-3 md:grid-cols-2 min-[1000px]:grid-cols-3 min-[1220px]:grid-cols-4'>
          {isLoadingWishlist ? (
            <div className='flex items-center justify-center'>
              <LoadingItem />
            </div>
          ) : (
            wishlist?.map((productVariant, index) => (
              <ProductCardSimple key={index} className='' productVariantId={productVariant.productVariantId} />
            ))
          )}
        </div>
        {wishlist && wishlist?.length > 8 && (
          <div className='mt-2.5'>
            <button className='items-center font-roboto mx-auto text-[15px] w-min text-nowrap px-20 font-medium border border-gray-200 shadow-md btn btn-light hover:border-primary hover:text-primary hover:!bg-red-50 drop-shadow-sm'>
              Xem thêm
              <span>
                <ChevronDown size={18} strokeWidth={2} />
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
