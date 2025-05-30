import React, { useState, ReactNode } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

import '@/assets/css/style.css'
import 'jsvectormap/dist/css/jsvectormap.css'
import 'flatpickr/dist/flatpickr.min.css'
import { Outlet } from 'react-router-dom'
import { useCommentNotifications } from '@/hooks/useCommentNotifications'

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  useCommentNotifications(); // Kích hoạt lắng nghe SignalR
  return (
    <div className=''>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className='flex h-screen overflow-hidden'>
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className='relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto'>
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main >
            <div className='p-4 mx-auto max-w-screen-2xl md:p-6 2xl:p-10 bg-gray-200 min-h-screen'>
              <Outlet/>
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  )
}

export default AdminLayout
