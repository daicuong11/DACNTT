import { CartLayout, HomeLayout } from '@/layouts'
import AdminLayout from '@/layouts/admin/AdminLayout'
import { AuthLayout } from '@/layouts/auth'
import { ProfileLayout } from '@/layouts/profile'
import CategoryWatch from '@/middlewares/CategoryWatch'
import BrandList from '@/pages/admin/brands/BrandList'
import CategoryList from '@/pages/admin/categories/CategoryList'
import AddProduct from '@/pages/admin/products/AddProduct'
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
import { RouteObject, useRoutes } from 'react-router-dom'

const MyRoutes = () => {
  const user = true

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
        },
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
    },
    {
      path: 'not-found',
      element: <NotFoundPage />
    }
  ]

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly: RouteObject[] = [
    {
      path: '/',
      element: null,
      children: [
        {
          path: 'bien',
          element: <div>User Home Page</div>
        },
        {
          path: 'profile',
          element: <div>User Profile</div>
        },
        {
          path: 'logout',
          element: <div>Logout</div>
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
          element: <Login />
        },
        {
          path: 'register',
          element: <RegisterPage />
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

  // Tạo danh sách route dựa trên trạng thái đăng nhập
  const routing = useRoutes([
    ...routesForPublic,
    ...(!user ? [] : routesForAuthenticatedOnly),
    ...routesForNotAuthenticatedOnly,
    ...routesForNotFound,
    ...routesForAdmin
  ])

  return routing // Trả về routes đã xử lý
}

export default MyRoutes
