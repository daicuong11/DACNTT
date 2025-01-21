import { FC, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearOrder } from '../features/order/order.slice'
import { useAppSelector } from '../hooks'

interface CartWatcherProps {
  children?: React.ReactNode
}
const CartWatcher: FC<CartWatcherProps> = ({ children }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const orderSlice = useAppSelector((state) => state.order)

  useEffect(() => {
    if (orderSlice.cartItems.length > 0) {
      if (!location.pathname.startsWith('/cart/')) {
        dispatch(clearOrder())
      }
    }
  }, [location, dispatch])

  return <>{children}</>
}

export default CartWatcher
