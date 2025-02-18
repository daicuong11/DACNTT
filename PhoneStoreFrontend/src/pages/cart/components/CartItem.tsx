import { Minus, Plus, Trash2 } from 'lucide-react'
import formatPrice from '../../../utils/formatPrice'
import { Link } from 'react-router-dom'
import { AppCheckBox } from '../../../components'
import { FC } from 'react'
import { CartItemRequestType, CartItemResponse } from '../../../types/cart_item.type'
import { useAppDispatch, useAppSelector } from '@/hooks'
import getPriceAfterDiscount from '@/utils/getPriceAfterDiscount'
import { Tag } from 'antd'
import { removeCartItem, updateCartItem } from '@/features/cart/cartThunks'

interface CartItemProps {
  checked?: boolean
  cartItem: CartItemResponse
  handleSelect?: () => void
}

const CartItem: FC<CartItemProps> = ({ cartItem, checked, handleSelect }) => {
  const userId = useAppSelector((state) => state.auth.user?.id)
  const dispatch = useAppDispatch()

  const handleUpQuality = () => {
    const newCartItemReq: CartItemRequestType = {
      productVariantId: cartItem.productVariant.productVariantId,
      quantity: cartItem.quantity + 1
    }
    if (userId) {
      dispatch(updateCartItem({ userId, itemId: cartItem.cartItemId, cartItem: newCartItemReq }))
    }
  }

  const handleDownQuality = () => {
    if (cartItem.quantity > 1) {
      const newCartItemReq: CartItemRequestType = {
        productVariantId: cartItem.productVariant.productVariantId,
        quantity: cartItem.quantity - 1
      }
      if (userId) {
        dispatch(updateCartItem({ userId, itemId: cartItem.cartItemId, cartItem: newCartItemReq }))
      }
    }
  }

  const handleRemoveItem = () => {
    if (userId) {
      dispatch(removeCartItem({ userId, itemId: cartItem.cartItemId }))
    }
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
          handleRemoveItem()
        }}
        className='absolute p-2 rounded hover:bg-gray-100 right-2 top-4'
      >
        <Trash2 size={16} strokeWidth={1.6} />
      </button>
      <div className='flex gap-x-4'>
        <div className='w-[100px] h-[100px] flex-shrink-0'>
          <img src={cartItem.productVariant.imageUrl} className='object-contain w-full h-full' />
        </div>
        <div className='flex flex-col w-full gap-y-2'>
          <Link
            onClick={(e) => e.stopPropagation()}
            to={''}
            className='w-[70%] line-clamp-2 text-[#3a3a3a] text-[17px] hover:underline'
          >
            {cartItem.productVariant.fullNameVariant}
          </Link>
          <div className='flex flex-col'>
            <div className=''>
              <Tag color='default' className='text-[10px] md:text-[12px] text-gray-500 font-medium'>
                {cartItem.productVariant.color}
              </Tag>
            </div>
            <div className='flex flex-col justify-between w-full gap-2 sm:items-end sm:flex-row'>
              <div className='flex items-end gap-x-2'>
                <span className='text-lg font-medium leading-none text-primary'>
                  {formatPrice(
                    getPriceAfterDiscount(cartItem.productVariant.price, cartItem.productVariant.discountPercentage)
                  )}
                </span>
                <span className='font-medium text-[#707070] text-sm leading-none line-through'>
                  {formatPrice(cartItem.productVariant.price)}
                </span>
              </div>
              <div onClick={(e) => e.stopPropagation()} className='flex gap-x-0.5 justify-end'>
                <button
                  onClick={handleDownQuality}
                  className='flex items-center justify-center p-2 bg-gray-100 rounded hover:bg-gray-200'
                >
                  <Minus size={14} strokeWidth={2} />
                </button>
                <div className='w-[30px] h-[30px] flex items-center justify-center'>{cartItem.quantity}</div>
                <button
                  onClick={handleUpQuality}
                  className='flex items-center justify-center p-2 bg-gray-100 rounded hover:bg-gray-200'
                >
                  <Plus size={14} strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
