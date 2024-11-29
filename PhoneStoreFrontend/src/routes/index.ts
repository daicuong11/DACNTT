import { Login } from '../pages/login'

interface RouteType {
  path: string
  component: React.FC
  layout: React.FC | null
}

const publicRoutes: RouteType[] = [
  {
    path: '/',
    component: Login,
    layout: null
  }
]

const privateRoutes: Pick<RouteType, 'path' | 'component'>[] = [
  {
    path: '/dashboard',
    component: Login
  }
]

export { publicRoutes, privateRoutes }
