import classNames from 'classnames'
import { SquareAsterisk } from 'lucide-react'
import React, { FC } from 'react'

interface ContainerPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  title?: string
  titleClassName?: string
  children?: React.ReactNode
}

interface ContainerPanelItemProps extends React.HTMLAttributes<HTMLDivElement> {
  number?: number
  iconElement?: React.ReactElement
  text: string
  className?: string
}

const ContainerPanel: FC<ContainerPanelProps> & { Item: FC<ContainerPanelItemProps> } = ({
  className,
  title,
  titleClassName,
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      className={classNames(
        'font-bold text-black/70 border border-gray-200 bg-white drop-shadow-md rounded-lg shadow-sm shadow-black/5',
        className
      )}
    >
      {title && <div className={classNames('py-2.5 px-3', titleClassName)}>{title}</div>}
      <div className='font-normal px-3 pb-3 mt-1 flex flex-col gap-2.5'>{children}</div>
    </div>
  )
}

const ContainerPanelItem: FC<ContainerPanelItemProps> = ({ number, iconElement, text, className, ...props }) => {
  let icon = <SquareAsterisk size={24} strokeWidth={1.6} />

  return (
    <div {...props} className={classNames('flex gap-2.5', className)}>
      {number && (
        <div className='flex items-center justify-center flex-shrink-0 w-5 h-5 overflow-hidden text-xs font-bold text-white rounded-full bg-primary'>
          {number}
        </div>
      )}
      {!number && iconElement && <span className='flex-shrink-0 text-gray-600'>{iconElement}</span>}
      {!number && !iconElement && <span className='flex-shrink-0'>{icon}</span>}
      <p className='text-sm font-normal text-gray-600'>{text}</p>
    </div>
  )
}

ContainerPanel.Item = ContainerPanelItem
export default ContainerPanel
