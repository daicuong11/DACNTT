import classNames from 'classnames'
import { FC } from 'react'
import formatPrice from '../../../utils/formatPrice'

interface ColorPriceButtonProps {
  title: string
  price: number
  img: string
  isActive?: boolean
  disabled?: boolean
  onClick?: () => void
}
const ColorPriceButton: FC<ColorPriceButtonProps> = ({ title, price, img, isActive = false, disabled, onClick }) => {
  return (
    <button
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={classNames('flex gap-x-1 py-1.5 px-1.5 min-w-[146px] justify-start items-center rounded-lg', {
        'border border-[#d70018]': isActive,
        'border border-slate-400 text-black bg-white hover:bg-slate-50': !isActive,
        'cursor-not-allowed opacity-40 hover:bg-white': disabled
      })}
    >
      <div className='w-[30px] h-[30px]'>
        <img className='w-full h-full' src={img} alt={title} />
      </div>
      <div className='flex flex-col items-start gap-0.5'>
        <div className='text-xs font-bold'>{title}</div>
        <div className='text-xs text-gray-600'>{formatPrice(price)} đ</div>
      </div>
    </button>
  )
}

export default ColorPriceButton
