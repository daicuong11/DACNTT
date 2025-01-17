import React from 'react'

import classNames from 'classnames'

interface MyDividerProps {
  className?: string
}

const MyDivider: React.FC<MyDividerProps> = ({ className }) => {
  return <div className={classNames('w-full h-[1px] bg-slate-200', className)}></div>
}

export default MyDivider
