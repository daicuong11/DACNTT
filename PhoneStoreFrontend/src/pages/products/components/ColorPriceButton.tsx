import classNames from 'classnames'
import { FC } from 'react'
import formatPrice from '../../../utils/formatPrice'
import { Check } from 'lucide-react'

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
      className={classNames('flex gap-x-1 relative py-1.5 px-1.5 justify-start items-center rounded-lg', {
        'border border-primary bg-red-100 bg-opacity-10': isActive,
        'border border-slate-400 text-black bg-white hover:bg-slate-50': !isActive,
        'cursor-not-allowed opacity-55 hover:bg-white': disabled
      })}
    >
      <div className='w-[30px] h-[30px]'>
        <img className='w-full h-full' src={img} alt={title} />
      </div>
      <div className='flex flex-col items-start gap-0.5'>
        <div className='text-xs font-bold text-black/70'>{title}</div>
        <div className='text-xs font-medium text-gray-600'>{formatPrice(price)}</div>
      </div>
      {isActive && (
        <div className='absolute top-0 right-0 px-1 py-0.5 rounded-tr-lg rounded-bl-xl bg-primary'>
          <Check size={12} color='white' />
        </div>
      )}
    </button>
  )
}

export default ColorPriceButton
