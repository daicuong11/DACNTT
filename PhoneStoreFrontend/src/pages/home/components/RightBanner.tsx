import React, { FC } from 'react'
import { listQCBanner } from '../../../assets/images'
import { Link } from 'react-router-dom'

const RightBanner: FC = () => {
  return (
    <div className='grid h-full grid-rows-3 gap-y-4'>
      {listQCBanner.map((item, index) => (
        <Link to={''} key={index} className='w-full h-full'>
          <img src={item.imageUrl} alt='' className='object-center w-full h-full rounded-xl' />
        </Link>
      ))}
    </div>
  )
}

export default RightBanner
