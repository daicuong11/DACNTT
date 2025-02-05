import { Outlet } from 'react-router-dom'
import Header from './header'

const AuthLayout: React.FC = () => {
  return (
    <div className=''>
      <Header showBreadcrumb={false} />
      <div>
        <div className='w-full min-h-screen mx-auto bg-white px-2.5'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
