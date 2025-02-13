import React, { FC } from 'react'
import { Link, Outlet } from 'react-router-dom'

interface ShowReturnBackLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  hrefBack: string
  buttonClassNames?: string
}
const ShowReturnBackLayout: FC<ShowReturnBackLayoutProps> = ({ hrefBack, buttonClassNames, ...rest }) => {
  return (
    <div className='flex flex-col w-full bg-transparent gap-y-3' {...rest}>
      <Link to={hrefBack} className={`flex items-center text-black/70 hover:text-black group ${buttonClassNames}`}>
        <svg
          className='w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M15 19l-7-7 7-7'></path>
        </svg>
        Trở lại
      </Link>
      <div>{rest.children}</div>
    </div>
  )
}

export default ShowReturnBackLayout
