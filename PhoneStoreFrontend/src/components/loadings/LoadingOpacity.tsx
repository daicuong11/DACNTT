import { FC, ReactElement } from 'react'

interface LoadingOpacityProps {
  title?: string | ReactElement
}
const LoadingOpacity: FC<LoadingOpacityProps> = ({ title }) => {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center bg-white bg-opacity-50 gap-y-3 z-999'>
      <div className='w-16 h-16 border-4 border-solid rounded-full animate-spin border-primary border-t-transparent'></div>
      {title && <div className='text-lg text-primary'>{title}</div>}
    </div>
  )
}

export default LoadingOpacity
