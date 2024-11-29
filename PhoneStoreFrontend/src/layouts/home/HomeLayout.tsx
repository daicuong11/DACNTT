import { FC } from 'react'

interface HomeLayoutProps {
  children: React.ReactNode
}

const HomeLayout: FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div className=''>
      {/* <Header /> */}
      <div>{children}</div>
      {/* <Footer /> */}
    </div>
  )
}

export default HomeLayout
