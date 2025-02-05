import classNames from 'classnames'
import React, { FC } from 'react'

interface LoadingItemProps {
  className?: string
}
const LoadingItem: FC<LoadingItemProps> = ({ className }) => {
  return (
    <div
      className={classNames(
        'h-6 w-6 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent ',
        className
      )}
    ></div>
  )
}

export default LoadingItem
