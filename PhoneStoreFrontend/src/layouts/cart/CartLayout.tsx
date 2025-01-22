import { FC } from 'react'
import Header from './header'

interface CartLayoutProps {
  children: React.ReactNode
}

const CartLayout: FC<CartLayoutProps> = ({ children }) => {
  return (
    <div className=''>
      <Header />
      <div>
        <div className='w-full min-h-screen mx-auto bg-[#f4f6f8] px-2.5'>{children}</div>
      </div>
    </div>
  )
}

export default CartLayout
