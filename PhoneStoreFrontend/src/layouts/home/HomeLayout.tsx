import { Outlet } from 'react-router-dom'
import Footer from './footer'
import Header from './header'
import FooterMobile, { FooterMobileDataType } from './footer/FooterMobile'
import { useModal } from '@/hooks'
import CategoryMobileModal from './header/components/CategoryMobileModal'
import classNames from 'classnames'
import { Box, CircleUserRound, House, RectangleEllipsis, Rows3 } from 'lucide-react'

const listAction: FooterMobileDataType = [
  {
    isAuthenticated: false,
    icon: <House size={20} strokeWidth={1.5} />,
    label: 'Trang chủ',
    href: '/'
  },
  // {
  //   isAuthenticated: false,
  //   icon: <Rows3 size={20} strokeWidth={1.5} />,
  //   label: 'Danh mục',
  //   href: '#'
  // },
  {
    isAuthenticated: true,
    icon: <Box size={20} strokeWidth={1.5} />,
    label: 'Đơn hàng',
    href: '/profile/order'
  },
  {
    isAuthenticated: true,
    icon: <CircleUserRound size={20} strokeWidth={1.5} />,
    label: 'Tài khoản',
    href: '/profile'
  }
]
const HomeLayout: React.FC = () => {
  const { isOpen, toggleModal, closeModal } = useModal()
  return (
    <div className='pb-28 md:pb-0'>
      <Header />
      <div className='px-2.5 relative'>
        <div
          className={classNames('min-h-screen max-w-[1200px] mx-auto bg-white ', {
            hidden: isOpen
          })}
        >
          <Outlet />
        </div>
        {isOpen && <CategoryMobileModal />}
      </div>
      <div className='hidden md:block'>
        <Footer />
      </div>
      <div className='md:hidden'>
        <FooterMobile dataSource={listAction} openModal={toggleModal} onClose={closeModal} />
      </div>
    </div>
  )
}

export default HomeLayout
