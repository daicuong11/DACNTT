import { CheckSlug } from '../components'
import { CartLayout, HomeLayout } from '../layouts'
import AdminLayout from '../layouts/admin/AdminLayout'
import ProductList from '../pages/admin/products/ProductList'
import { CartPage } from '../pages/cart'
import { HomePage } from '../pages/home'
import { Login } from '../pages/login'
import { PaymentConfirmPage } from '../pages/payment_confirm'
import PaymentInfoPage from '../pages/payment_info/PaymentInfoPage'
import { ProductDetailPage } from '../pages/products'

interface RouteType<Props = {}> {
  title?: string
  path: string
  component: React.FC<Props>
  layout: React.FC<any> | null
}

const publicRoutes: RouteType[] = [
  {
    title: 'Đăng Nhập',
    path: '/signin',
    component: Login,
    layout: null
  },
  {
    title: 'Trang Chủ',
    path: '/',
    component: HomePage,
    layout: HomeLayout
  },
  {
    path: '/:category/:productSlug',
    component: ProductDetailPage,
    layout: HomeLayout
  },
  {
    title: 'Giỏ Hàng',
    path: '/cart',
    component: CartPage,
    layout: CartLayout
  },
  {
    title: 'Thông Tin Thanh Toán',
    path: '/cart/payment-info',
    component: PaymentInfoPage,
    layout: CartLayout
  },
  {
    title: 'Xác Nhận Thanh Toán',
    path: '/cart/payment',
    component: PaymentConfirmPage,
    layout: CartLayout
  },
  {
    title: 'Quản Trị Sản Phẩm',
    path: '/admin/products',
    component: ProductList,
    layout: AdminLayout
  }
]

const privateRoutes: Pick<RouteType, 'path' | 'component'>[] = [
  {
    path: '/dashboard',
    component: Login
  }
]

export { publicRoutes, privateRoutes }
