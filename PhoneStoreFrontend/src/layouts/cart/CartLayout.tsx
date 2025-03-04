import { Outlet } from 'react-router-dom'
import Header from './header'

const CartLayout: React.FC = () => {
  return (
    <div className='overflow-x-hidden'>
      <Header />
      <div>
        <div className='w-full min-h-[calc(100vh-64px)] mx-auto bg-[#f4f6f8] px-2.5'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default CartLayout
