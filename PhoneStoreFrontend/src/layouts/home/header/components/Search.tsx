import { flame_img } from '@/assets/images'
import { iphone1 } from '@/assets/images/iphone'
import formatPrice from '@/utils/formatPrice'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import classNames from 'classnames'
import { Clock, Loader, Trash2 } from 'lucide-react'
import { FC, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector, useDebounce, useModal } from '../../../../hooks'
import { useGetAllProductOfMobile, useSearchProducts } from '@/hooks/querys/product.query'
import { getProductRoute } from '@/utils/getProductRoute'
import getPriceAfterDiscount from '@/utils/getPriceAfterDiscount'
import { addSearchTerm, clearSearchHistory } from '@/features/search/search_history.slice'

interface SearchProps {}

const Search: FC<SearchProps> = ({}) => {
  const searchHistory = useAppSelector((state) => state.search.history)
  const dispatch = useAppDispatch()
  const [query, setQuery] = useState('')
  const { isOpen, openModal, closeModal } = useModal()

  const searchRef = useRef<HTMLDivElement>(null)

  const navigate = useNavigate()

  const debouncedQuery = useDebounce(query, 400)

  const { data, isLoading, error } = useSearchProducts(debouncedQuery)
  const { data: products } = useGetAllProductOfMobile()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        closeModal()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleClear = () => {
    setQuery('')
  }

  const handleSearch = (searchQuery: string) => {
    console.log('Searching for:', searchQuery)
  }

  useEffect(() => {
    if (debouncedQuery) {
      handleSearch(debouncedQuery)
    }
  }, [debouncedQuery])

  const handleOnClickHistory = (searchQuery: string) => {
    setQuery(searchQuery)
    dispatch(addSearchTerm(searchQuery))
    navigate(`/catalogsearch/result/?q=${searchQuery}`)
    closeModal()
  }

  const handleProductClick = (categoryName: string, slug: string) => {
    navigate(getProductRoute(categoryName || '', slug))
    handleClear()
    closeModal()
  }

  return (
    <div ref={searchRef} className='w-full relative max-w-[420px] h-full group'>
      <Input
        value={query}
        placeholder='Bạn cần tìm gì?'
        allowClear
        onChange={handleInputChange}
        onClear={handleClear}
        onFocus={() => openModal()}
        // onBlur={() => closeModal()}
        onPressEnter={() => handleOnClickHistory(query)}
        prefix={
          <SearchOutlined
            className={classNames({
              'text-gray-400': !query,
              'text-gray-800': query
            })}
          />
        }
        style={{
          outline: 'none',
          boxShadow: 'none',
          border: '1px solid #d9d9d9',
          borderRadius: '8px',
          fontSize: '16px'
        }}
      />
      <div
        className={classNames(
          'absolute top-full left-1/2 -translate-x-1/2 text-base w-full min-w-[392px] max-h-[80vh] overflow-auto transition-all duration-300 ease-in-out bg-white border border-gray-100 shadow-md z-10 shadow-black/20 rounded-xl',
          {
            'opacity-0 invisible -translate-y-6 scale-95': !isOpen,
            'opacity-100 visible translate-y-0 scale-100 delay-150': isOpen
          }
          // 'group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:delay-150'
        )}
      >
        {query && (
          <div className='py-4'>
            <div className='flex items-center gap-x-1.5 text-sm text-gray-500 px-4'>
              {isLoading ? <Loader strokeWidth={1.6} size={16} className='animate-spin' /> : <SearchOutlined />}
              {data && data.length > 0 ? `Kết quả cho '${query}'` : "Không tìm thấy kết quả cho '" + query + "'"}
            </div>
            {data && data.length > 0 && (
              <div className='mt-3'>
                <div className='px-4 mb-2 font-medium text-gray-800'>Sản phẩm</div>
                <div className='flex flex-col'>
                  {data.map((p) => (
                    <div
                      onClick={() => handleProductClick(p.categoryName, p.slug)}
                      className='flex items-center p-2 rounded-md cursor-pointer gap-x-2 hover:bg-gray-100'
                    >
                      <img className='object-contain w-14 h-14' src={p.imageUrl} alt='' />
                      <div className='flex flex-col gap-y-0.5'>
                        <div className='text-sm font-medium text-black'>{p.variantName}</div>
                        <div className='flex items-end'>
                          <div className='text-sm font-bold font-roboto text-primary'>
                            {formatPrice(getPriceAfterDiscount(p.price, p.discountPercentage)).replace('đ', '')}
                          </div>
                          <div className='text-xs text-gray-500 line-through font-roboto'>
                            {formatPrice(p.price).replace('đ', '')}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {!query && (
          <div className='p-4'>
            {searchHistory.length > 0 && (
              <div className=''>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-x-1.5 text-gray-800 font-medium'>
                    Lịch sử tìm kiếm
                    <Clock size={14} strokeWidth={2} />
                  </div>
                  <button
                    onClick={() => dispatch(clearSearchHistory())}
                    className='flex items-center py-1 text-sm font-medium text-gray-500 cursor-pointer gap-x-1 hover:underline'
                  >
                    Xóa tất cả
                    <Trash2 size={14} strokeWidth={2} />
                  </button>
                </div>
                <div className='flex flex-col gap-y-2.5 leading-normal mt-2'>
                  {searchHistory.map((searchQuery) => (
                    <button
                      key={searchQuery}
                      onClick={() => handleOnClickHistory(searchQuery)}
                      className='flex items-center gap-x-2.5 text-sm text-gray-800 cursor-pointer hover:underline'
                    >
                      <SearchOutlined />
                      <span>{searchQuery}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className='mt-4'>
              <div className='flex items-center gap-x-1.5 text-gray-800 mb-4 font-medium'>
                Xu hướng tìm kiếm
                <img className='w-4 h-4' src={flame_img} alt='' />
              </div>
              <div className='grid grid-cols-2 gap-x-4 gap-y-5 font-roboto'>
                {products &&
                  products.slice(0, 8).map((p) => (
                    <button
                      key={p.productId}
                      onClick={() => getProductRoute(p.category.name, p.productVariants[0].slug)}
                      className='flex items-center cursor-pointer gap-x-2 hover:bg-gray-100 p-1 rounded-md'
                    >
                      <img
                        className='object-contain w-10 h-10'
                        src={p.productVariants[0].imageUrl}
                        alt='product image'
                      />
                      <div className='text-sm text-start font-medium text-black'>
                        {p.productVariants[0].variantName}
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
