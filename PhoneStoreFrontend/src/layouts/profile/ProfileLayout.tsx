import { Outlet } from 'react-router-dom'
import { FC } from 'react'
import Header from '../home/header'
import { ClipboardList, Home, LogOut, MapPinHouse, Ticket, UserRound } from 'lucide-react'
import SideBarProfile from '@/pages/profile/components/SideBarProfile'
import SideBarItem from '@/pages/profile/components/SideBarItem'
import { useLocation, useNavigate } from 'react-router-dom'

const listSidebarItems = [
  {
    id: 1,
    href: '/profile',
    title: 'Trang chủ',
    icon: <Home size={24} strokeWidth={1.6} />
  },
  {
    id: 2,
    href: '/profile/order',
    title: 'Lịch sử mua hàng',
    icon: <ClipboardList size={24} strokeWidth={1.6} />
  },
  {
    id: 3,
    href: '/profile/coupon',
    title: 'Mã giảm giá',
    icon: <Ticket size={24} strokeWidth={1.6} />
  },
  {
    id: 4,
    href: '/profile/user-info/address-info',
    title: 'Sổ địa chỉ',
    icon: <MapPinHouse size={24} strokeWidth={1.6} />
  },
  {
    id: 5,
    href: '/profile/user-info',
    title: 'Tài khoản của bạn',
    icon: <UserRound size={24} strokeWidth={1.6} />
  }
]

const ProfileLayout: FC = () => {
  const pathName = useLocation().pathname
  const navigate = useNavigate()

  return (
    <div className=''>
      <Header showBreadcrumb={false} />
      <div className='w-full bg-[#f4f6f8] px-2.5'>
        <div className='min-h-screen max-w-[1200px] mx-auto'>
          <div className='flex gap-x-5'>
            <SideBarProfile>
              {listSidebarItems.map((item) => (
                <SideBarItem
                  key={item.id}
                  onClick={() => navigate(item.href)}
                  isActive={pathName === item.href}
                  sufixIcon={item.icon}
                  title={item.title}
                />
              ))}
            </SideBarProfile>

            <div className='flex-1 min-h-screen py-4'>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileLayout
