import { FC } from 'react'
import Header from '../../pages/home/header'
import Footer from '../../pages/home/footer'

interface HomeLayoutProps {
  children: React.ReactNode
}

const HomeLayout: FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div className=''>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  )
}

export default HomeLayout
