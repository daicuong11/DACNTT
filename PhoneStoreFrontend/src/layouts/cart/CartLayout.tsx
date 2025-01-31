import { Outlet } from 'react-router-dom'
import Header from './header'

const CartLayout: React.FC = () => {
  return (
    <div className=''>
      <Header />
      <div>
        <div className='w-full min-h-screen mx-auto bg-[#f4f6f8] px-2.5'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default CartLayout
