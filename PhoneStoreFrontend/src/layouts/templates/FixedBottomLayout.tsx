import { ArrowLeft } from 'lucide-react'
import React, { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { MyDivider } from '../../components'

interface FixedBottomLayoutProps {
  title: string
  body: ReactNode
  footer: ReactNode
  navigateTo?: () => void
}

const FixedBottomLayout: FC<FixedBottomLayoutProps> = ({ title, body, footer, navigateTo }) => {
  const navigate = useNavigate()
  return (
    <div className='w-full pt-2'>
      <div className='max-w-[600px] mx-auto'>
        <div className='relative font-semibold text-center py-1.5 text-lg'>
          {title}
          <button
            onClick={navigateTo ? navigateTo : () => navigate(-1)}
            className='absolute left-0 p-1 -translate-y-1/2 top-1/2 text-black/70 hover:text-black'
          >
            <ArrowLeft size={28} strokeWidth={1.6} />
          </button>
        </div>
        <MyDivider className='mt-1 mb-3' />
        {body}
      </div>
      <div className='fixed bottom-0 left-0 right-0 w-full mx-auto bg-transparent px-2.5 flex justify-center'>
        <div className='max-w-[600px] border w-full border-x-gray-200 shadow bg-white p-5 rounded-t-lg pb-4'>
          {footer}
        </div>
      </div>
    </div>
  )
}

export default FixedBottomLayout
