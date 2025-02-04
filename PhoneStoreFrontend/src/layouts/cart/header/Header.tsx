import { CircleUserRound, ShoppingBag, SquareMenu } from 'lucide-react'
import { GiaoHangIcon, logo } from '../../../assets/images'
import { ButtonHeader, Search } from './components'
import { CategoryModal } from '../../../components'
import { useModal } from '../../../hooks'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const { isOpen, toggleModal, closeModal } = useModal()

  const navigate = useNavigate()

  return (
    <div className='h-[64px] z-[999] w-full bg-primary shadow-md px-2.5'>
      <div className='max-w-[1200px] grid grid-cols-3 mx-auto gap-x-3 leading-[64px]'>
        <div className='flex items-center gap-x-3'>
          <Link to={'/'} className='py-2 rounded'>
            <img className='object-cover w-40 h-[30px]' src={logo} alt='logo' />
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
            direction='vertical'
            iconPosition='top'
            disPlayBackground
            icon={<CircleUserRound strokeWidth={1.6} size={24} color='white' />}
            className='font-medium transition-all duration-300 ease-in-out hover:scale-95'
          >
            Đại Cương
          </ButtonHeader>
        </div>
      </div>
    </div>
  )
}

export default Header
