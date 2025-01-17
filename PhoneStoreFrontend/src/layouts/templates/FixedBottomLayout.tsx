import { ArrowLeft } from 'lucide-react'
import React, { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { MyDivider } from '../../components'

interface FixedBottomLayoutProps {
  title: string
  body: ReactNode
  footer: ReactNode
}

const FixedBottomLayout: FC<FixedBottomLayoutProps> = ({ title, body, footer }) => {
  const navigate = useNavigate()
  return (
    <div className='w-full px-4 pt-2'>
      <div className='max-w-[600px] mx-auto min-h-screen'>
        <div className='relative font-semibold text-center py-1.5 text-lg'>
          {title}
          <button
            onClick={() => navigate(-1)}
            className='absolute left-0 p-1 -translate-y-1/2 top-1/2 text-black/70 hover:text-black'
          >
            <ArrowLeft size={28} strokeWidth={1.6} />
          </button>
        </div>
        <MyDivider className='mt-1 mb-3' />
        {body}
      </div>
      <div className='max-w-[600px] mx-auto sticky bottom-0 border border-x-gray-200 shadow bg-white p-2.5 rounded-t-lg pb-4'>
        {footer}
      </div>
    </div>
  )
}

export default FixedBottomLayout
