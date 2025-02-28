import { rightBannerImages } from '@/assets/images'
import { LoadingItem, ProductCardSimple } from '@/components'
import { useAppSelector } from '@/hooks'
import { maskPhoneNumber } from '@/utils/maskPhoneNumber'
import { EyeFilled, EyeInvisibleFilled, UserOutlined } from '@ant-design/icons'
import { Avatar, Tag } from 'antd'
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
        <Avatar size={72} icon={<UserOutlined />} />
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
      <div className='flex mt-3 gap-x-3'>
        <div className='flex flex-col flex-1 gap-y-3'>
          <div
            className={classNames(
              'flex items-center justify-between mt-3 p-3 text-black bg-white border rounded-lg h-[114px]',
              {
                'animate-pulse': isLoadingOrderAll
              }
            )}
          >
            <div className='flex flex-col items-center justify-center flex-1 gap-y-4'>
              <h1 className='text-3xl font-bold'>{ordersAll?.length}</h1>
              <h5 className='text-[13px]'>đơn hàng</h5>
            </div>
            <div className='w-[1px] bg-black-2 h-20'></div>
            <div className='flex flex-col items-center justify-center flex-1 gap-y-4'>
              <h1 className='text-3xl font-bold'>{formatPrice(totalPay || 0)}</h1>
              <h5 className='text-[13px]'>Tổng tiền tích lũy mua sắm</h5>
            </div>
          </div>

          <div className='flex items-center justify-around text-black bg-white border rounded-lg gap-x-4 h-[114px]'>
            <div
              onClick={() => navigate('coupon')}
              className='flex flex-col items-center justify-center px-2 cursor-pointer gap-y-1'
            >
              <span className='flex items-center justify-center w-12 h-12 rounded-full bg-blue-100/60'>
                <Ticket size={24} strokeWidth={1.6} />
              </span>
              <span className='w-20 text-sm font-medium leading-4 text-center font-roboto text-wrap text-black-2'>
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
              <span className='w-20 text-sm font-medium leading-4 text-center font-roboto text-wrap text-black-2'>
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
              <span className='w-20 text-sm font-medium leading-4 text-center font-roboto text-wrap text-black-2'>
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
              <span className='w-20 text-sm font-medium leading-4 text-center font-roboto text-wrap text-black-2'>
                Cập nhật thông tin
              </span>
            </div>
          </div>
        </div>
        <div className='w-[220px] grid grid-rows-2 gap-y-3'>
          {rightBannerImages.map((image, index) => (
            <img key={index} src={image.image} className='object-cover border rounded-lg h-[114px]' />
          ))}
        </div>
      </div>

      <div className='mt-5'>
        <div className='mb-3 text-lg font-medium to-black-2'>Sản phẩm bạn yêu thích</div>
        <div className='grid gap-2.5 grid-cols-4'>
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
