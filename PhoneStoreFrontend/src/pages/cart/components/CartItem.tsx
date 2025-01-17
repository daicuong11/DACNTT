import { Minus, Plus, Trash2 } from 'lucide-react'
import formatPrice from '../../../utils/formatPrice'
import { Link } from 'react-router-dom'
import { AppCheckBox } from '../../../components'
import { iphone1 } from '../../../assets/images/iphone'
import { FC, useState } from 'react'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { ProductType } from '../../../types/product.type'

interface CartItemProps {
  checked?: boolean
  onChange?: (e: CheckboxChangeEvent) => void
  product: ProductType
  onClick?: () => void
}

const CartItem: FC<CartItemProps> = ({ product, checked, onChange, onClick }) => {
  const [quantity, setQuantity] = useState<number>(1)

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1)
  }

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1))
  }

  return (
    <div
      className='max-w-[600px] relative px-2 py-4 pl-8 shadow-sm border rounded-lg border-gray-200 bg-white min-h-10'
      onClick={onClick}
    >
      <button className='absolute left-3 top-4 '>
        <AppCheckBox value={checked} onChange={onChange} />
      </button>
      <button onClick={(e) => e.stopPropagation()} className='absolute p-2 rounded hover:bg-gray-100 right-2 top-4'>
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
            className='w-[70%] line-clamp-2 text-[#3a3a3a] text-[17px]'
          >
            {product.name}
          </Link>
          <div className='flex items-end justify-between w-full'>
            <div className='flex items-end gap-x-2'>
              <span className='text-lg font-medium leading-none text-primary'>{formatPrice(product.price)}</span>
              <span className='font-medium text-[#707070] text-sm leading-none line-through'>
                {formatPrice(product.price)}
              </span>
            </div>
            <div onClick={(e) => e.stopPropagation()} className='flex gap-x-0.5 '>
              <button
                onClick={handleDecrease}
                className='flex items-center justify-center p-2 bg-gray-100 rounded hover:bg-gray-200'
              >
                <Minus size={14} strokeWidth={2} />
              </button>
              <div className='w-[30px] h-[30px] flex items-center justify-center'>{quantity}</div>
              <button
                onClick={handleIncrease}
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
