import { Spin, SpinProps } from 'antd'
import { FC } from 'react'

interface AppLoadingProps extends SpinProps {}

const AppLoading: FC<AppLoadingProps> = (props) => {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-white/70'>
      <Spin {...props} />
    </div>
  )
}

export default AppLoading
