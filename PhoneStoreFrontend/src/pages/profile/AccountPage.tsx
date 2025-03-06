import { maskPhoneNumber } from '@/utils/maskPhoneNumber'
import { EyeFilled, EyeInvisibleFilled, UserOutlined } from '@ant-design/icons'
import { Avatar, Tag } from 'antd'
import React, { FC, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/hooks'
import { AvatarCustom } from '@/components'
import { ChevronRight, ClipboardList, Headset, LogOut, MapPinHouse, RefreshCcw, Shield, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { clearAuth } from '@/features/auth/auth.slice'
import { clearCart } from '@/features/cart/cart.slice'

interface AccountPageProps {}

const AccountPage: FC<AccountPageProps> = () => {
  const currentUser = useAppSelector((state) => state.auth.user)
  const [isShowPhoneNumber, setIsShowPhoneNumber] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogout = (): void => {
    dispatch(clearAuth())
    dispatch(clearCart())
  }
  return (
    <div className='py-4'>
      <div className='flex px-2 gap-x-2'>
        <AvatarCustom size={72} name={currentUser?.name || ''} role={currentUser?.role} />

        <div className='flex flex-col gap-y-0.5'>
          <h1 className='text-base md:text-[19px] font-semibold text-pink-600 uppercase leading-none'>
            {currentUser?.name}
          </h1>
          <div className='flex items-center text-xs font-medium text-gray-500 md:text-sm gap-x-2'>
            {isShowPhoneNumber ? currentUser?.phoneNumber : maskPhoneNumber(currentUser?.phoneNumber || '')}
            {isShowPhoneNumber ? (
              <EyeInvisibleFilled onClick={() => setIsShowPhoneNumber(false)} className='p-1 text-lg cursor-pointer' />
            ) : (
              <EyeFilled onClick={() => setIsShowPhoneNumber(true)} className='p-1 text-lg cursor-pointer' />
            )}
          </div>
          <span>
            <Tag color='red'>{currentUser?.role}</Tag>
          </span>
        </div>
      </div>

      <div className='mt-10 bg-white rounded-lg p-4 flex flex-col gap-y-1.5'>
        <div
          onClick={() => navigate('/profile/user-info')}
          className='flex items-center justify-between text-sm text-gray-600 cursor-pointer rounded-md gap-x-2 px-2.5 py-3'
        >
          <div className='flex gap-x-2.5'>
            <User size={20} strokeWidth={1.5} />
            <span className='text-sm font-semibold'>Thông tin tài khoản</span>
          </div>
          <ChevronRight size={20} strokeWidth={1.5} />
        </div>
        <div
          onClick={() => navigate('/profile/user-info/address-info')}
          className='flex items-center justify-between text-sm text-gray-600 cursor-pointer rounded-md gap-x-2 px-2.5 py-3'
        >
          <div className='flex gap-x-2.5'>
            <MapPinHouse size={20} strokeWidth={1.5} />
            <span className='text-sm font-semibold'>Sổ địa chỉ</span>
          </div>
          <ChevronRight size={20} strokeWidth={1.5} />
        </div>

        <div
          onClick={() => navigate('/profile/order')}
          className='flex items-center justify-between text-sm text-gray-600 cursor-pointer rounded-md gap-x-2 px-2.5 py-3'
        >
          <div className='flex gap-x-2.5'>
            <ClipboardList size={20} strokeWidth={1.5} />
            <span className='text-sm font-semibold'>Lịch sử mua hàng</span>
          </div>
          <ChevronRight size={20} strokeWidth={1.5} />
        </div>
      </div>

      <div className='mt-6 bg-white rounded-lg p-4 flex flex-col gap-y-1.5'>
        {currentUser?.role.toLocaleLowerCase() === 'admin' ||
          (currentUser?.role.toLocaleLowerCase() == 'staff' && (
            <div
              onClick={() => navigate('/admin/dashboard')}
              className='flex items-center justify-between text-sm text-gray-600 cursor-pointer rounded-md gap-x-2 px-2.5 py-3'
            >
              <div className='flex gap-x-2.5'>
                <Shield size={20} strokeWidth={1.5} />
                <span className='text-sm font-semibold'>Trang quản trị</span>
              </div>
              <ChevronRight size={20} strokeWidth={1.5} />
            </div>
          ))}
        <div
          onClick={() => navigate('/profile/support')}
          className='flex items-center justify-between text-sm text-gray-600 cursor-pointer rounded-md gap-x-2 px-2.5 py-3'
        >
          <div className='flex gap-x-2.5'>
            <Headset size={20} strokeWidth={1.5} />
            <span className='text-sm font-semibold'>Hỗ trợ</span>
          </div>
          <ChevronRight size={20} strokeWidth={1.5} />
        </div>
      </div>

      <div className='mt-6 bg-white rounded-lg p-4 flex flex-col gap-y-1.5'>
        <div
          onClick={() => navigate('/profile/user-info/change-password')}
          className='flex items-center justify-between text-sm text-gray-600 cursor-pointer rounded-md gap-x-2 px-2.5 py-3'
        >
          <div className='flex gap-x-2.5'>
            <RefreshCcw size={20} strokeWidth={1.5} />
            <span className='text-sm font-semibold'>Đổi mật khẩu</span>
          </div>
          <ChevronRight size={20} strokeWidth={1.5} />
        </div>
        <div
          onClick={() => handleLogout()}
          className='flex items-center justify-between text-sm text-gray-600 cursor-pointer rounded-md gap-x-2 px-2.5 py-3'
        >
          <div className='flex gap-x-2.5'>
            <LogOut size={20} strokeWidth={1.5} />
            <span className='text-sm font-semibold'>Thoát tài khoản</span>
          </div>
          <ChevronRight size={20} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  )
}

export default AccountPage
