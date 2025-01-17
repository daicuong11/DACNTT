import classNames from 'classnames'
import { on } from 'events'
import React, { FC } from 'react'

type IconPositionType = 'left' | 'right' | 'top' | 'bottom'
type DirectionType = 'horizontal' | 'vertical'

interface ButtonHeaderProps {
  className?: string
  children?: React.ReactNode
  icon?: React.ReactNode | FC
  iconPosition?: IconPositionType
  disPlayBackground?: boolean
  direction?: DirectionType
  onClick?: () => void
}

const ButtonHeader: FC<ButtonHeaderProps> = ({
  className,
  children,
  icon,
  iconPosition = 'left',
  disPlayBackground = false,
  direction = 'horizontal',
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'flex items-center text-wrap leading-none justify-center font-medium cursor-pointer px-2 text-xs text-white rounded-lg',
        {
          'bg-gray-100 bg-opacity-20': disPlayBackground,
          'bg-transparent hover:bg-gray-100/20 transition-all duration-100': !disPlayBackground,
          'flex-col gap-y-1 py-1.5': direction === 'vertical',
          'gap-x-1 h-[42px] py-2.5': direction === 'horizontal'
        },
        className
      )}
    >
      {icon && (iconPosition === 'left' || iconPosition === 'top') && (
        <span>{typeof icon === 'function' ? React.createElement(icon) : icon}</span>
      )}
      {children}
      {icon && (iconPosition === 'right' || iconPosition === 'bottom') && (
        <span>{typeof icon === 'function' ? React.createElement(icon) : icon}</span>
      )}
    </button>
  )
}

export default ButtonHeader
