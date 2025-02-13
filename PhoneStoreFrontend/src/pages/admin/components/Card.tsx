import React from 'react'

interface CardProps {
  title: string
  children: React.ReactNode
  button?: React.ReactNode
}

const Card: React.FC<CardProps> = ({ title, children, button }) => {
  return (
    <div className='mx-auto max-w'>
      <div className='bg-white border rounded-lg shadow-lg'>
        <div className='flex justify-between py-3 mx-4 border-b rounded-t-lg cursor-pointer'>
          <div className='flex items-center text-lg font-bold text-black'>
            <span className='capitalize'>{title}</span>
          </div>
          {button && <div onClick={(e) => e.stopPropagation()}>{button}</div>}
        </div>
        <div className='p-4 text-gray-700'>{children}</div>
      </div>
    </div>
  )
}

export default Card
