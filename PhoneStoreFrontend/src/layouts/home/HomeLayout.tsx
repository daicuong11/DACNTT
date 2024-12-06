import { FC } from 'react'
import Header from './header'
import Footer from './footer'

interface HomeLayoutProps {
  children: React.ReactNode
}

const HomeLayout: FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div className=''>
      <Header />
      <div className='px-4'>
        <div className='min-h-screen max-w-[1200px] mx-auto'>{children}</div>
      </div>
      <Footer />
    </div>
  )
}

export default HomeLayout
