import classNames from 'classnames'
import { X } from 'lucide-react'
import React, { FC, ButtonHTMLAttributes } from 'react'

interface FilterButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  children?: React.ReactElement | string | number
  isShowCloseIcon?: boolean
}
const FilterButton: FC<FilterButtonProps> = ({ isActive = false, isShowCloseIcon = false, ...props }) => {
  return (
    <button
      {...props}
      className={classNames('py-1 text-[15px] box-border border border-transparent font-normal rounded-full btn ', {
        'bg-primary text-white': isActive,
        '!border-gray-300 text-black/80': !isActive
      })}
    >
      {props.children}
      {isShowCloseIcon && isActive && <X size={16} strokeWidth={2} />}
    </button>
  )
}

export default FilterButton
