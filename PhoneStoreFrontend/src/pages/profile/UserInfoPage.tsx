import { robot_hello } from '@/assets/images'
import { LoadingOpacity } from '@/components'
import CustomInput from '@/components/inputs/CustomInput'
import { useAppSelector, useModal } from '@/hooks'
import { useGetOrdersByStatus } from '@/hooks/querys/order.query'
import { useGetUserById } from '@/hooks/querys/user.query'
import formatPrice from '@/utils/formatPrice'
import getAddressString from '@/utils/getAddressString'
import { EditIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const UserInfoPage = () => {
  const currentUser = useAppSelector((state) => state.auth.user)
  const { data: user, isLoading, error } = useGetUserById(currentUser?.id || 0)
  const { data: ordersAll } = useGetOrdersByStatus(currentUser?.id || 0, 'all')

  const [name, setName] = useState(user?.name || '')

  const navigate = useNavigate()

  if (!currentUser) {
    return <Navigate to='/signin' />
  }

  if (error) {
    return <div className='items-center justify-center py-20 text-primary'>Error: {error.message}</div>
  }

  const handleUpdate = () => {
    // Call API update user
    if (name.includes(':') || name.trim() === '') {
      return
    } else {
      console.log('Update user', name)
    }
  }

  const totalPay = useMemo(() => {
    return ordersAll?.reduce((total, order) => {
      if (order.status === 'delivered') {
        return total + order.totalAmount
      }
      return total
    }, 0)
  }, [ordersAll])

  const getMainAddress = useMemo(() => {
    return user?.addresses?.find((address) => address.isDefault)
  }, [user?.addresses])

  return (
    <div className='flex flex-col min-h-screen mt-1 bg-white rounded-md gap-y-4'>
      {isLoading && <LoadingOpacity />}
      <div className='flex flex-col items-center justify-center py-5 mt-5 md:py-10 gap-y-2'>
        <img className='object-contain w-20' src={robot_hello} alt='User Profile' />
        <div className='text-lg font-semibold text-center'>{user?.name || currentUser.name}</div>
      </div>
      {user && (
        <div className='flex flex-col gap-y-5 w-full max-w-[600px] mx-auto px-2.5 md:px-0'>
          <CustomInput
            value={name}
            onChange={(value) => setName(value)}
            title='Họ và tên'
            defaultValue={'Họ và tên: ' + user?.name}
          />
          <CustomInput isShowIconRight={false} defaultValue={'Email: ' + user?.email} />
          <CustomInput defaultValue={'Số điện thoại: ' + user?.phoneNumber} isShowIconRight={false} />
          <CustomInput defaultValue={'Tổng tiền mua sắm: ' + formatPrice(totalPay || 0)} isShowIconRight={false} />

          <CustomInput
            defaultValue={getMainAddress ? 'Địa chỉ: ' + getAddressString(getMainAddress) : 'Địa chỉ: Chưa cập nhật'}
            iconRightOnClick={() => navigate('/profile/user-info/address-info')}
            iconRight={<EditIcon size={16} strokeWidth={1.6} />}
          />
          <CustomInput
            onClick={() => navigate('change-password')}
            defaultValue={'Đổi mật khẩu'}
            isShowIconRight={false}
          />
          <button onClick={handleUpdate} className='mt-5 rounded-md btn btn-danger'>
            Cập nhật thông tin
          </button>
        </div>
      )}
    </div>
  )
}

export default UserInfoPage
