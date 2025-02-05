import { Links, useNavigate } from 'react-router-dom'
import { useBreadcrumbs } from '../../../../hooks'
import { Breadcrumb } from 'antd'
import { HomeFilled, RightOutlined } from '@ant-design/icons'
import classNames from 'classnames'

const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs()
  const navigate = useNavigate()

  return (
    <div className={classNames('py-1 px-2.5 shadow-md', { hidden: breadcrumbs.length === 1 })}>
      <Breadcrumb
        separator={<RightOutlined style={{ fontSize: '10px', height: '100%' }} />}
        items={breadcrumbs}
        className='text-[12px] w-[1200px] mx-auto'
        itemRender={(route, params, routes, paths) => {
          return (
            <div
              onClick={() => {
                if (route.title !== routes[routes.length - 1].title) {
                  navigate(route.href || '/')
                }
              }}
              className={classNames('py-0.5', {
                'cursor-pointer ': route.title !== routes[routes.length - 1].title
              })}
            >
              {route.href === '/' ? <HomeFilled style={{ fontSize: '12px' }} className='mr-2 text-primary' /> : ''}
              {route.title}
            </div>
          )
        }}
      />
    </div>
  )
}

export default Breadcrumbs
