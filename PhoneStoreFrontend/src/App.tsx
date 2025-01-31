import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Loader from './components/Loader.tsx'
import MyRoutes from './routes'
import ScrollToTop from './utils/ScrollToTop.tsx'

function App() {
  const appName: string = import.meta.env.VITE_APP_NAME || 'BC DACNTT';

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <MyRoutes />
        <ToastContainer position="top-center" autoClose={2400} closeOnClick />
      </BrowserRouter>
    </>
  )
}

export default App
