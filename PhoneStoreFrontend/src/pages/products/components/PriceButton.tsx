import classNames from 'classnames'
import React, { FC } from 'react'
import formatPrice from '../../../utils/formatPrice'

interface PriceButtonProps {
  title: string
  price: number
  isActive?: boolean
  disabled?: boolean
  onClick?: () => void
}

const PriceButton: FC<PriceButtonProps> = ({ title, price, isActive = false, disabled, onClick }) => {
  return (
    <button
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={classNames('flex gap-x-1 py-1.5 px-3 bg-white min-w-[146px] justify-center items-center rounded-lg', {
        'border border-[#d70018]': isActive,
        'border border-slate-400 text-black hover:bg-slate-50': !isActive,
        'cursor-not-allowed opacity-40 hover:bg-white': disabled
      })}
    >
      <div className='flex flex-col items-center gap-0.5'>
        <div className='text-xs font-bold'>{title}</div>
        <div className='text-xs text-gray-600'>{formatPrice(price)} đ</div>
      </div>
    </button>
  )
}

export default PriceButton
