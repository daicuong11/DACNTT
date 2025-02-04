import React, { FC, ReactElement } from 'react'
import SideBarItem from './SideBarItem'
import { Headset, LogOut, Shield } from 'lucide-react'
import { MyDivider } from '@/components'
import { useLocation, useNavigate } from 'react-router-dom'

interface SideBarProfileProps {
  children?: ReactElement | ReactElement[]
}

const SideBarProfile: FC<SideBarProfileProps> = ({ children }) => {
  const naviagate = useNavigate()
  const pathName = useLocation().pathname

  return (
    <div className='w-[254px] bg-white rounded-md px-2 py-6 h-[calc(100vh-84px)] sticky top-[84px] flex flex-col gap-y-3 mt-4'>
      {children}
      <MyDivider className='opacity-60 !h-[0.5px]' />
      <SideBarItem
        onClick={() => naviagate('/admin/products')}
        isActive={false}
        sufixIcon={<Shield size={24} strokeWidth={1.6} />}
        title={'Trang quản trị'}
      />
      <MyDivider className='opacity-60 !h-[0.5px]' />
      <SideBarItem
        onClick={() => naviagate('support')}
        isActive={pathName === '/profile/support'}
        sufixIcon={<Headset size={24} strokeWidth={1.6} />}
        title={'Hỗ trợ'}
      />
      <SideBarItem isActive={false} sufixIcon={<LogOut size={24} strokeWidth={1.6} />} title={'Thoát tài khoản'} />
    </div>
  )
}

export default SideBarProfile
