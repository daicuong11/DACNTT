import { robot_hello } from '@/assets/images'
import { LoadingOpacity } from '@/components'
import CustomInput from '@/components/inputs/CustomInput'
import { useAppSelector, useModal } from '@/hooks'
import { useGetOrdersByStatus } from '@/hooks/querys/order.query'
import { useGetUserById } from '@/hooks/querys/user.query'
import formatPrice from '@/utils/formatPrice'
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
    return <div className='text-primary items-center justify-center py-20'>Error: {error.message}</div>
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

  return (
    <div className='flex flex-col gap-y-4 bg-white mt-1 rounded-md min-h-screen'>
      {isLoading && <LoadingOpacity />}
      <div className='flex justify-center py-10 mt-5 flex-col items-center gap-y-2'>
        <img className='w-20 object-contain' src={robot_hello} alt='User Profile' />
        <div className='font-semibold text-lg text-center'>{user?.name || currentUser.name}</div>
      </div>
      {user && (
        <div className='flex flex-col gap-y-5 w-[600px] mx-auto'>
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
            defaultValue={'Địa chỉ: ' + user?.address}
            iconRightOnClick={() => navigate('/profile/user-info/address-info')}
            iconRight={<EditIcon size={16} strokeWidth={1.6} />}
          />
          <CustomInput
            onClick={() => navigate('change-password')}
            defaultValue={'Đổi mật khẩu'}
            isShowIconRight={false}
          />
          <button onClick={handleUpdate} className='btn btn-danger rounded-md mt-5'>
            Cập nhật thông tin
          </button>
        </div>
      )}
    </div>
  )
}

export default UserInfoPage
