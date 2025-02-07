import { useAppSelector } from '@/hooks'
import { CartLayout, HomeLayout } from '@/layouts'
import AdminLayout from '@/layouts/admin/AdminLayout'
import { AuthLayout } from '@/layouts/auth'
import { ProfileLayout } from '@/layouts/profile'
import CategoryWatch from '@/middlewares/CategoryWatch'
import BrandList from '@/pages/admin/brands/BrandList'
import CategoryList from '@/pages/admin/categories/CategoryList'
import AddProduct from '@/pages/admin/products/AddProduct'
import Details from '@/pages/admin/products/Details'
import ProductList from '@/pages/admin/products/ProductList'
import { CartPage } from '@/pages/cart'
import { CategoryPage } from '@/pages/category'
import { HomePage } from '@/pages/home'
import { Login } from '@/pages/login'
import NotFoundPage from '@/pages/NotFoundPage'
import { PaymentConfirmPage } from '@/pages/payment_confirm'
import { PaymentInfoPage } from '@/pages/payment_info'
import { ProductDetailPage } from '@/pages/products'
import { AddressInfoPage, OrderHistoryPage, ProfilePage, SupportPage, UserInfoPage } from '@/pages/profile'
import { RegisterPage } from '@/pages/register'
import { SearchResultPage } from '@/pages/search'
import { RoleEnum } from '@/types/user.type'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

const MyRoutes = () => {
  const user = useAppSelector((state) => state.auth.token) ? true : false
  const currentUser = useAppSelector((state) => state.auth.token)?.user;
  const isAdmin = currentUser?.role === RoleEnum.ADMIN;

  // Define public routes accessible to all users
  const routesForPublic: RouteObject[] = [
    {
      path: '/',
      element: <HomeLayout />,
      children: [
        {
          path: '',
          element: <HomePage />
        },
        {
          path: 'catalogsearch/result',
          element: <SearchResultPage />
        }
      ]
    },
    {
      path: '/cart',
      element: <CartLayout />,
      children: [
        {
          path: '',
          element: <CartPage />
        },
        {
          path: 'payment-info',
          element: <PaymentInfoPage />
        },
        {
          path: 'payment',
          element: <PaymentConfirmPage />
        }
      ]
    },

    {
      path: 'not-found',
      element: <NotFoundPage />
    }
  ]

  // Define routes that are public but need middleware
  const routesPublicButNeedMiddleware: RouteObject[] = [
    {
      path: '/',
      element: <HomeLayout />,
      children: [
        {
          path: ':category',
          element: <CategoryWatch />,
          children: [
            {
              path: '',
              element: <CategoryPage />
            },
            {
              path: ':productSlug',
              element: <ProductDetailPage />
            }
          ]
        }
      ]
    }
  ]

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly: RouteObject[] = [
    {
      path: '/profile',
      element: <ProfileLayout />,
      children: [
        {
          path: '',
          element: <ProfilePage />
        },
        {
          path: 'order',
          element: <OrderHistoryPage />
        },
        {
          path: 'coupon',
          element: <OrderHistoryPage />
        },
        {
          path: 'user-info/address-info',
          element: <AddressInfoPage />
        },
        {
          path: 'user-info',
          element: <UserInfoPage />
        },
        {
          path: 'support',
          element: <SupportPage />
        }
      ]
    }
  ]

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly: RouteObject[] = [
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        {
          path: 'signin',
          element: !user ? <Login /> : <Navigate to='/' />
        },
        {
          path: 'register',
          element: !user ? <RegisterPage /> : <Navigate to='/' />
        }
      ]
    }
  ]

  const routesForAdmin: RouteObject[] = [
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        {
          path: 'products',
          children: [
            {
              path: '',
              element: <ProductList />
            },
            {
              path: 'add',
              element: <AddProduct />
            },
            {
              path: 'details/:productId',
              element: <Details/>
            }
          ]
        },
        {
          path: 'brands',
          children: [
            {
              path: '',
              element: <BrandList />
            }
          ]
        },
        {
          path: 'categories',
          children: [
            {
              path: '',
              element: <CategoryList />
            }
          ]
        }
      ]
    }
  ]

  const routesForNotFound: RouteObject[] = [
    {
      path: '*',
      element: <NotFoundPage />
    }
  ]

  const routesLogout: RouteObject[] = [
    {
      path: '/profile',
      element: <Navigate to='/signin' />
    }
  ]

  // Tạo danh sách route dựa trên trạng thái đăng nhập
  const routing = useRoutes([
    ...routesForPublic,
    ...(!user ? routesLogout : routesForAuthenticatedOnly),
    ...routesForNotAuthenticatedOnly,
    ...(isAdmin ? routesForAdmin : []),
    ...routesPublicButNeedMiddleware,
    ...routesForNotFound
  ])

  return routing // Trả về routes đã xử lý
}

export default MyRoutes
