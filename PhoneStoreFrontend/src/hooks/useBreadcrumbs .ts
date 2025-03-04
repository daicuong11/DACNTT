import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Mặc định map category sang tên dễ đọc
const defaultCategoryMap: Record<string, string> = {
  mobile: 'Điện thoại',
  laptop: 'Laptop'
}

const useBreadcrumbs = (slugTitle?: string, customMap?: Record<string, string>) => {
  const location = useLocation()
  const [breadcrumbs, setBreadcrumbs] = useState<{ href: string; title: string }[]>([])

  useEffect(() => {
    const pathnames = location.pathname.split('/').filter((x) => x)
    const searchParams = new URLSearchParams(location.search)

    let newBreadcrumbs: { href: string; title: string }[] = [{ href: '/', title: 'Trang chủ' }]

    // Nếu là trang tìm kiếm
    if (location.pathname.startsWith('/catalogsearch/result')) {
      const query = searchParams.get('q') || 'Không xác định'
      newBreadcrumbs.push({
        href: location.pathname + location.search,
        title: `Kết quả tìm kiếm cho: '${decodeURIComponent(query)}'`
      })
    } else {
      // Lặp qua từng segment trong URL để tạo breadcrumbs
      pathnames.forEach((segment, index) => {
        const href = `/${pathnames.slice(0, index + 1).join('/')}`
        const title =
          customMap?.[segment] ||
          defaultCategoryMap[segment] ||
          (slugTitle && index === pathnames.length - 1 ? slugTitle : segment)

        newBreadcrumbs.push({ href, title })
      })
    }

    setBreadcrumbs(newBreadcrumbs)
  }, [location.pathname, location.search, slugTitle, customMap]) // Cập nhật khi URL hoặc slug thay đổi

  return breadcrumbs
}

export default useBreadcrumbs
