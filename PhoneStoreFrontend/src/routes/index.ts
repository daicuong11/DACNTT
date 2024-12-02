import HomeLayout from '../layouts/home'
import { HomePage } from '../pages/home'
import { Login } from '../pages/login'

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
  }
]

const privateRoutes: Pick<RouteType, 'path' | 'component'>[] = [
  {
    path: '/dashboard',
    component: Login
  }
]

export { publicRoutes, privateRoutes }
