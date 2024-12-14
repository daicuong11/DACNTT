import { CircleUserRound, ShoppingBag, SquareMenu } from 'lucide-react'
import { GiaoHangIcon, logo } from '../../../assets/images'
import { ButtonHeader, Search } from './components'
import { CategoryModal } from '../../../components'
import { useModal } from '../../../hooks'
import { Link } from 'react-router-dom'

const Header = () => {
  const { isOpen, openModal, toggleModal, closeModal } = useModal()

  return (
    <div className='h-[64px] sticky top-0 z-[999] w-full bg-primary shadow-md px-4'>
      <div className='max-w-[1200px] flex items-center gap-x-3 mx-auto leading-[64px]'>
        <Link to={'/'} className='py-2 rounded'>
          <img className='object-cover w-40 h-[30px]' src={logo} alt='logo' />
        </Link>

        <ButtonHeader
          onClick={toggleModal}
          disPlayBackground
          icon={<SquareMenu strokeWidth={1.6} size={20} color='white' />}
          className='relative'
        >
          Danh mục
          <CategoryModal isOpen={isOpen} closeModal={closeModal} />
        </ButtonHeader>
        <div className='flex-1'>
          <Search />
        </div>
        <ButtonHeader icon={GiaoHangIcon}>
          <div className='flex flex-col gap-y-1'>
            <span className='text-wrap'>Tra cứu</span>
            <span className='line-clamp-1 text-wrap'>đơn hàng</span>
          </div>
        </ButtonHeader>
        <ButtonHeader icon={<ShoppingBag strokeWidth={1.6} size={26} color='white' />}>Giỏ hàng</ButtonHeader>
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
  )
}

export default Header
