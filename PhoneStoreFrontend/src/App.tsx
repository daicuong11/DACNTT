import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Loader from './components/Loader.tsx'
import MyRoutes from './routes'
import ScrollToTop from './utils/ScrollToTop.tsx'
import CartWatcher from './middlewares/CartWatcher.tsx'
import { LoadingOpacity } from './components/index.ts'

function App() {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // setTimeout(() => setLoading(false), 1000)
    setLoading(false)
  }, [])

  return (
    <>
      {loading && <LoadingOpacity />}
      <BrowserRouter>
        <ScrollToTop />
        <CartWatcher />
        <MyRoutes />
        <ToastContainer position='top-center' autoClose={2400} closeOnClick />
      </BrowserRouter>
    </>
  )
}

export default App
