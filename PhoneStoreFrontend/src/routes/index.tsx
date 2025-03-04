import { useAppSelector } from '@/hooks'
import { CartLayout, HomeLayout } from '@/layouts'
import AdminLayout from '@/layouts/admin/AdminLayout'
import { AuthLayout } from '@/layouts/auth'
import { ProfileLayout } from '@/layouts/profile'
import { BrandWatch } from '@/middlewares'
import CategoryWatch from '@/middlewares/CategoryWatch'
import BrandList from '@/pages/admin/brands/BrandList'
import CategoryList from '@/pages/admin/categories/CategoryList'
import Dashboard from '@/pages/admin/dashboard'
import Orders from '@/pages/admin/orders'
import AddProduct from '@/pages/admin/products/AddProduct'
import Details from '@/pages/admin/products/Details'
import ProductList from '@/pages/admin/products/ProductList'
import UserList from '@/pages/admin/users/UserList'
import BrandPage from '@/pages/brand/BrandPage'
import { CartPage } from '@/pages/cart'
import { CategoryPage } from '@/pages/category'
import { HomePage } from '@/pages/home'
import { Login } from '@/pages/login'
import NotFoundPage from '@/pages/NotFoundPage'
import { PaymentConfirmPage } from '@/pages/payment_confirm'
import { PaymentInfoPage } from '@/pages/payment_info'
import PaymentResultPage from '@/pages/payment_result/PaymentResultPage'
import VnpayPaymentResultPage from '@/pages/payment_result/VnpayPaymentResultPage'
import { ProductDetailPage } from '@/pages/products'
import {
  AddAddressPage,
  AddressInfoPage,
  ChangePasswordPage,
  OrderDetailPage,
  OrderHistoryPage,
  ProfilePage,
  SupportPage,
  UserInfoPage
} from '@/pages/profile'
import EditAddressPage from '@/pages/profile/EditAddressPage'
import { RegisterPage } from '@/pages/register'
import { SearchResultPage } from '@/pages/search'
import { RoleEnum } from '@/types/user.type'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

const MyRoutes = () => {
  const auth = useAppSelector((state) => state.auth)

  const isAuthenticated = !!auth.user
  const currentUser = auth.user
  const isAdmin = currentUser?.role === RoleEnum.ADMIN

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
      path: 'payment',
      element: <CartLayout />,
      children: [
        {
          path: 'result/:orderId',
          element: <PaymentResultPage />
        },
        {
          path: 'vnpay-result',
          element: <VnpayPaymentResultPage />
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
              path: ':brand',
              element: <BrandWatch />,
              children: [
                {
                  path: '',
                  element: <BrandPage />
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
          path: 'order/',
          element: <OrderHistoryPage />
        },
        {
          path: 'order/order-detail/:orderId',
          element: <OrderDetailPage />
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
          path: 'user-info/address-info/add',
          element: <AddAddressPage />
        },
        {
          path: 'user-info/address-info/edit/:addressId',
          element: <EditAddressPage />
        },
        {
          path: 'user-info',
          element: <UserInfoPage />
        },
        {
          path: 'user-info/change-password',
          element: <ChangePasswordPage />
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
          element: !isAuthenticated ? <Login /> : <Navigate to='/' />
        },
        {
          path: 'register',
          element: !isAuthenticated ? <RegisterPage /> : <Navigate to='/' />
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
          path: 'dashboard',
          element: <Dashboard />
        },
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
              element: <Details />
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
        },
        {
          path: 'orders',
          children: [
            {
              path: '',
              element: <Orders />
            },
            {
              path: 'details/:orderId',
              element: <OrderDetailPage />
            }
          ]
        },
        {
          path: 'users',
          children: [
            {
              path: '',
              element: <UserList />
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
      path: '/profile/:something',
      element: <Navigate to='/signin' />
    }
  ]

  // Tạo danh sách route dựa trên trạng thái đăng nhập
  const routing = useRoutes([
    ...routesForPublic,
    ...(!isAuthenticated ? routesLogout : routesForAuthenticatedOnly),
    ...routesForNotAuthenticatedOnly,
    ...(isAdmin ? routesForAdmin : []),
    ...routesPublicButNeedMiddleware,
    ...routesForNotFound
  ])

  return routing // Trả về routes đã xử lý
}

export default MyRoutes
