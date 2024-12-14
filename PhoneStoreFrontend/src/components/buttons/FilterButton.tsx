import classNames from 'classnames'
import React, { FC, ButtonHTMLAttributes } from 'react'

interface FilterButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  children?: React.ReactElement | string | number
}
const FilterButton: FC<FilterButtonProps> = ({ isActive = false, ...props }) => {
  return (
    <button
      {...props}
      className={classNames('py-1 text-[15px] box-border border border-transparent font-normal rounded-full btn ', {
        'bg-primary text-white': isActive,
        '!border-gray-300 text-black/80': !isActive
      })}
    >
      {props.children}
    </button>
  )
}

export default FilterButton
