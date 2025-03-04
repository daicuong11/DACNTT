import { AppleOutlined, DashboardOutlined, ProductOutlined, ShoppingCartOutlined, UngroupOutlined, UserOutlined } from '@ant-design/icons'
import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import SidebarLinkGroup from './SidebarLinkGroup'

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (arg: boolean) => void
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation()
  const { pathname } = location

  const trigger = useRef<any>(null)
  const sidebar = useRef<any>(null)

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded')
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  )

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return
      setSidebarOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return
      setSidebarOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString())
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded')
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded')
    }
  }, [sidebarExpanded])

  return (
    <aside
      ref={sidebar}
      className={`absolute z-50 left-0 top-0 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className='flex items-center justify-between gap-2 px-6 py-4'>
        <NavLink to='/'>
          <img className='ml-4 object-cover w-40 h-[55px]' src={'/logo3.png'} alt='Logo' />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls='sidebar'
          aria-expanded={sidebarOpen}
          className='block lg:hidden'
        >
          <svg
            className='fill-current'
            width='20'
            height='18'
            viewBox='0 0 20 18'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z'
              fill=''
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className='flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar'>
        {/* <!-- Sidebar Menu --> */}
        <nav className='px-4 py-4 lg:px-6'>
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className='mb-4 ml-4 text-sm font-semibold uppercase'>Quản Lý Sản Phẩm</h3>

            <ul className='mb-6 flex flex-col gap-1.5'>
              {/* <!--Start Menu Item Dashboard --> */}
              <li>
                <NavLink
                  to='/admin/dashboard'
                  className={`capitalize group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium  duration-300 ease-in-out hover:bg-gray-200 ${pathname.includes('dashboard') && 'bg-gray-200'
                    }`}
                >
                  <DashboardOutlined />
                  Dashboard
                </NavLink>
              </li>
              {/* <!--End Menu Item Dashboard --> */}

              {/* <!-- Menu Item Product --> */}
              <li>
                <NavLink
                  to='/admin/products'
                  className={`capitalize group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium  duration-300 ease-in-out hover:bg-gray-200 ${pathname.includes('product') && 'bg-gray-200'
                    }`}
                >
                  <ProductOutlined />
                  Quản lý sản phẩm
                </NavLink>
              </li>

              {/* <!-- Menu Item Product --> */}

              {/* <!-- Menu Item Brand --> */}
              <li>
                <NavLink
                  to='/admin/brands'
                  className={`capitalize group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium  duration-300 ease-in-out hover:bg-gray-200 ${pathname.includes('brand') && 'bg-gray-200'
                    }`}
                >
                  <AppleOutlined />
                  Quản lý thương hiệu
                </NavLink>
              </li>
              {/* <!-- Menu Item Brand --> */}

              {/* <!-- Menu Item Category --> */}
              <li>
                <NavLink
                  to='/admin/categories'
                  className={`capitalize group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium  duration-300 ease-in-out hover:bg-gray-200 ${pathname.includes('categories') && 'bg-gray-200'
                    }`}
                >
                  <UngroupOutlined />
                  Quản lý danh mục
                </NavLink>
              </li>
              {/* <!-- Menu Item Category --> */}

              {/* <!-- Menu Item Profile --> */}
              <li>
                <NavLink
                  to='/admin/orders'
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium  duration-300 ease-in-out hover:bg-gray-200 ${pathname.includes('order') && 'bg-gray-200'
                    }`}
                >
                  <ShoppingCartOutlined />
                  Quản Lý Đơn Hàng
                </NavLink>
              </li>
              {/* <!-- Menu Item Profile --> */}

            </ul>
          </div>

          {/* <!-- Others Group --> */}
          <div>
            <h3 className='mb-4 ml-4 text-sm font-semibold'>OTHERS</h3>

            <ul className='mb-6 flex flex-col gap-1.5'>


              {/* <!-- End Menu Item User --> */}
              <li>
                <NavLink
                  to='/admin/users'
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium  duration-300 ease-in-out hover:bg-gray-200 ${pathname.includes('user') && 'bg-gray-200'
                    }`}
                >
                  <UserOutlined/>
                  Quản Lý Người Dùng
                </NavLink>
              </li>
              {/* <!-- End Menu Item User --> */}

            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  )
}

export default Sidebar
