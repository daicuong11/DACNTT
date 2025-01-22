import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Fragment } from 'react/jsx-runtime'
import PageTitle from './components/PageTitle.tsx'
import HomeLayout from './layouts/home/HomeLayout.tsx'
import CartWatcher from './middlewares/CartWatcher.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import { publicRoutes } from './routes/index.ts'
import Loader from './components/Loader.tsx'

function App() {
  const appName: string = import.meta.env.VITE_APP_NAME || 'BC DACNTT';

  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    // Cuộn trang về đầu mỗi khi pathname thay đổi (chuyển sang trang mới)
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        {publicRoutes.map((route, index) => {
          let Layout = HomeLayout
          if (route.layout) {
            Layout = route.layout
          } else if (route.layout === null) {
            Layout = Fragment
          }
          const Page = route.component

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <CartWatcher>
                  <Layout>
                    <PageTitle title={`${route.title} | ${appName}`} />
                    <Page />
                  </Layout>
                </CartWatcher>
              }
            />
          )
        })}
        {/* {privateRoutes.map((route, index) => {
            let Layout = AdminLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            const Page = route.component;
            return <Route key={index} path={route.path}
              element={
                <PrivateRoute
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              }
            />
          })} */}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <ToastContainer position='top-center' autoClose={2400} closeOnClick />
    </>
  )
}

export default App
