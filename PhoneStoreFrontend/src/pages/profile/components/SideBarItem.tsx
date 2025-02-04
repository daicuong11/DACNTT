import classNames from 'classnames'
import React, { FC, ReactElement } from 'react'

interface SideBarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive: boolean
  title: string
  sufixIcon: ReactElement
}
const SideBarItem: FC<SideBarItemProps> = ({ isActive, sufixIcon, title, ...props }) => {
  return (
    <div
      {...props}
      className={classNames(
        'flex transition-all duration-100 items-center border rounded-lg justify-start box-border py-1.5 text-[15px] font-medium font-roboto gap-x-2 px-3 cursor-pointer',
        {
          'border-primary bg-red-50 text-primary': isActive,
          'border-transparent hover:bg-slate-200': !isActive
        }
      )}
    >
      {sufixIcon && sufixIcon}
      <span
        className={classNames('text-gray-600', {
          'text-red': isActive
        })}
      >
        {title}
      </span>
    </div>
  )
}

export default SideBarItem
