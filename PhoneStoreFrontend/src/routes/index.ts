import { CheckSlug } from '../components'
import { CartLayout, HomeLayout } from '../layouts'
import { CartPage } from '../pages/cart'
import { HomePage } from '../pages/home'
import { Login } from '../pages/login'
import { PaymentConfirmPage } from '../pages/payment_confirm'
import PaymentInfoPage from '../pages/payment_info/PaymentInfoPage'
import { ProductDetailPage } from '../pages/products'

interface RouteType<Props = {}> {
  path: string
  component: React.FC<Props>
  layout: React.FC<any> | null
}

const publicRoutes: RouteType[] = [
  {
    path: '/signin',
    component: Login,
    layout: null
  },
  {
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
    path: '/cart',
    component: CartPage,
    layout: CartLayout
  },
  {
    path: '/cart/payment-info',
    component: PaymentInfoPage,
    layout: CartLayout
  },
  {
    path: '/cart/payment',
    component: PaymentConfirmPage,
    layout: CartLayout
  }
]

const privateRoutes: Pick<RouteType, 'path' | 'component'>[] = [
  {
    path: '/dashboard',
    component: Login
  }
]

export { publicRoutes, privateRoutes }
