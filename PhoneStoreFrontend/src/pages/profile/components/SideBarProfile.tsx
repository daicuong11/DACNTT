import React, { FC, ReactElement } from 'react'
import SideBarItem from './SideBarItem'
import { Headset, LogOut, Shield } from 'lucide-react'
import { MyDivider } from '@/components'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { clearAuth } from '@/features/auth/auth.slice'
import { RoleEnum } from '@/types/user.type'
import { clearCart } from '@/features/cart/cart.slice'

interface SideBarProfileProps {
  children?: ReactElement | ReactElement[]
}

const SideBarProfile: FC<SideBarProfileProps> = ({ children }) => {
  const navigate = useNavigate()
  const pathName = useLocation().pathname
  const currentUser = useAppSelector((state) => state.auth.user)

  const dispatch = useAppDispatch()

  const handleLogout = (): void => {
    dispatch(clearAuth())
    dispatch(clearCart())
  }

  return (
    <div className='w-[254px] flex-shrink-0 bg-white rounded-md px-2 py-6 h-[calc(100vh-84px)] sticky top-[84px] flex flex-col gap-y-3 mt-4'>
      {children}
      {currentUser?.role === RoleEnum.ADMIN && <MyDivider className='opacity-60 !h-[0.5px]' />}
      {currentUser?.role === RoleEnum.ADMIN && (
        <SideBarItem
          onClick={() => navigate('/admin/products')}
          isActive={false}
          sufixIcon={<Shield size={24} strokeWidth={1.6} />}
          title={'Trang quản trị'}
        />
      )}
      <MyDivider className='opacity-60 !h-[0.5px]' />
      <SideBarItem
        onClick={() => navigate('support')}
        isActive={pathName === '/profile/support'}
        sufixIcon={<Headset size={24} strokeWidth={1.6} />}
        title={'Hỗ trợ'}
      />
      <SideBarItem
        onClick={handleLogout}
        isActive={false}
        sufixIcon={<LogOut size={24} strokeWidth={1.6} />}
        title={'Thoát tài khoản'}
      />
    </div>
  )
}

export default SideBarProfile
