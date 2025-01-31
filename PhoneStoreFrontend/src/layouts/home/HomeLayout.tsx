import { Outlet } from 'react-router-dom'
import Footer from './footer'
import Header from './header'

const HomeLayout: React.FC = () => {
  return (
    <div className=''>
      <Header />
      <div className='px-4'>
        <div className='min-h-screen max-w-[1200px] mx-auto bg-white'>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default HomeLayout
