import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from './routes/index.ts'
import HomeLayout from './layouts/home/HomeLayout.tsx'
import { Fragment } from 'react/jsx-runtime'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <BrowserRouter>
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
                  <Layout>
                    <Page />
                  </Layout>
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
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
