import { Minus, Plus, Trash2 } from 'lucide-react'
import formatPrice from '../../../utils/formatPrice'
import { Link } from 'react-router-dom'
import { AppCheckBox } from '../../../components'
import { iphone1 } from '../../../assets/images/iphone'
import { FC } from 'react'
import { CartItemPayloadType, CartItemType } from '../../../types/cart_item.type'
import { useAppDispatch } from '@/hooks'
import { updateCartItem } from '@/features/cart/cart.slice'
import { removeCartItem } from '@/features/order/order.slice'

interface CartItemProps {
  checked?: boolean
  cartItem: CartItemType
  handleSelect?: () => void
}

const CartItem: FC<CartItemProps> = ({ cartItem, checked, handleSelect }) => {
  const dispatch = useAppDispatch()

  const handleUpdateItem = (itemId: number) => {
    const updatedItem = { productVariantId: 1, quantity: 2 }
    // dispatch(updateCartItem({ userId: 1, itemId, cartItem: updatedItem }))
  }

  const handleRemoveItem = (itemId: number) => {
    // dispatch(removeCartItem({ userId: 1, itemId }))
  }

  return (
    <div
      className='max-w-[600px] relative px-3 py-4 pl-8 shadow-sm border rounded-lg cursor-pointer border-gray-200 bg-white min-h-10'
      onClick={handleSelect}
    >
      <button className='absolute left-3 top-4 '>
        <AppCheckBox value={checked} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleRemoveItem(cartItem.cartItemId)
        }}
        className='absolute p-2 rounded hover:bg-gray-100 right-2 top-4'
      >
        <Trash2 size={16} strokeWidth={1.6} />
      </button>
      <div className='flex gap-x-4'>
        <div className='w-[100px] h-[100px] flex-shrink-0'>
          <img src={iphone1} className='object-contain w-full h-full' />
        </div>
        <div className='flex flex-col w-full gap-y-2'>
          <Link
            onClick={(e) => e.stopPropagation()}
            to={''}
            className='w-[70%] line-clamp-2 text-[#3a3a3a] text-[17px] hover:underline'
          >
            {cartItem.productVariant.product.name}
          </Link>
          <div className='flex flex-col justify-between w-full gap-2 sm:items-end sm:flex-row'>
            <div className='flex items-end gap-x-2'>
              <span className='text-lg font-medium leading-none text-primary'>
                {formatPrice(cartItem.productVariant.price)}
              </span>
              <span className='font-medium text-[#707070] text-sm leading-none line-through'>
                {formatPrice(cartItem.productVariant.price)}
              </span>
            </div>
            <div onClick={(e) => e.stopPropagation()} className='flex gap-x-0.5 justify-end'>
              <button
                onClick={(e) => handleUpdateItem(cartItem.cartItemId)}
                className='flex items-center justify-center p-2 bg-gray-100 rounded hover:bg-gray-200'
              >
                <Minus size={14} strokeWidth={2} />
              </button>
              <div className='w-[30px] h-[30px] flex items-center justify-center'>{cartItem.quantity}</div>
              <button
                onClick={(e) => handleUpdateItem(cartItem.cartItemId)}
                className='flex items-center justify-center p-2 bg-gray-100 rounded hover:bg-gray-200'
              >
                <Plus size={14} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
