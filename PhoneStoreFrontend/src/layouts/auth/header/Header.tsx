import { CircleUserRound, ShoppingBag, SquareMenu } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { GiaoHangIcon } from '../../../assets/images'
import { CategoryModal } from '../../../components'
import { useAppSelector, useModal } from '../../../hooks'
import { ButtonHeader, Search } from './components'
import Breadcrumbs from './components/Breadcrumbs'
import { FC } from 'react'
import getLastWordOrTwoWithLimit from '@/utils/getLastWordOrTwoWithLimit'

interface HeaderProps {
  showBreadcrumb?: boolean
}
const Header: FC<HeaderProps> = ({ showBreadcrumb = true }) => {
  const { isOpen, toggleModal, closeModal } = useModal()

  const currentUser = useAppSelector((state) => state.auth.user)

  const navigate = useNavigate()

  const handleProfileClick = () => {
    navigate(currentUser ? '/profile' : '/signin')
  }

  return (
    <header className='sticky top-0 z-[999] w-full bg-white'>
      <div className='h-[64px] bg-primary px-2.5'>
        <div className='max-w-[1200px] grid grid-cols-3 mx-auto gap-x-3 leading-[64px]'>
          <div className='flex items-center gap-x-3'>
            <Link to={'/'} className='py-2 rounded'>
              <img className='object-cover w-30 h-[40px]' src={'/logo.png'} alt='logo' />
            </Link>

            <ButtonHeader
              onClick={toggleModal}
              disPlayBackground
              icon={<SquareMenu strokeWidth={1.6} size={20} color='white' />}
              className='relative hidden sm:flex'
            >
              Danh mục
              <CategoryModal isOpen={isOpen} closeModal={closeModal} />
            </ButtonHeader>
          </div>

          <div className='flex items-center justify-center flex-1'>
            <Search />
          </div>
          <div className='flex items-center justify-end gap-x-3'>
            <ButtonHeader className='hidden sm:flex' icon={GiaoHangIcon}>
              <div className='flex flex-col gap-y-1'>
                <span className='text-wrap'>Tra cứu</span>
                <span className='line-clamp-1 text-wrap'>đơn hàng</span>
              </div>
            </ButtonHeader>
            <ButtonHeader
              className='relative hidden sm:flex'
              onClick={() => navigate('/cart')}
              icon={<ShoppingBag strokeWidth={1.6} size={26} color='white' />}
            >
              Giỏ hàng
              <span className='absolute flex w-[16px] h-[15px] items-center justify-center text-sm font-semibold text-center leading-none text-white -translate-y-1/2 bg-primary left-[12.5px] top-[55%]'>
                3
              </span>
            </ButtonHeader>
            <ButtonHeader
              onClick={handleProfileClick}
              direction='vertical'
              iconPosition='top'
              disPlayBackground
              icon={<CircleUserRound strokeWidth={1.6} size={24} color='white' />}
              className='font-medium transition-all duration-300 ease-in-out hover:scale-95'
            >
              {currentUser ? getLastWordOrTwoWithLimit(currentUser.name) : 'Đăng nhập'}
            </ButtonHeader>
          </div>
        </div>
      </div>
      {showBreadcrumb && <Breadcrumbs />}
    </header>
  )
}

export default Header
