import { useLocation } from 'react-router-dom'

// Map tĩnh cho category
const categoryMap: Record<string, string> = {
  mobile: 'Điện thoại',
  laptop: 'Laptop'
}

const useBreadcrumbs = (slugTitle?: string) => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)
  const searchParams = new URLSearchParams(location.search)

  // Kiểm tra nếu là trang tìm kiếm
  if (location.pathname.startsWith('/catalogsearch/result')) {
    const query = searchParams.get('q') || 'Không xác định'
    return [
      { href: '/', title: 'Trang chủ' },
      { href: location.pathname + location.search, title: `Kết quả tìm kiếm cho: '${decodeURIComponent(query)}'` }
    ]
  }

  // Xử lý breadcrumb cho các trang thông thường
  const breadcrumbs = pathnames.map((segment, index) => {
    const href = `/${pathnames.slice(0, index + 1).join('/')}`

    // Nếu là category, dùng map để lấy tên đẹp hơn
    const title = categoryMap[segment] || slugTitle || segment

    return { href, title }
  })

  return [{ href: '/', title: 'Trang chủ' }, ...breadcrumbs]
}

export default useBreadcrumbs
