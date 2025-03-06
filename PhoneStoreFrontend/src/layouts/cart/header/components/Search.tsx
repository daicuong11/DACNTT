import { FC, useState, useEffect } from 'react'
import { useDebounce, useModal } from '../../../../hooks'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import { Clock, Trash2 } from 'lucide-react'
import { flame_img } from '@/assets/images'
import { iphone1 } from '@/assets/images/iphone'
import formatPrice from '@/utils/formatPrice'

interface SearchProps {}

const Search: FC<SearchProps> = ({}) => {
  const [query, setQuery] = useState('')
  const { isOpen, openModal, closeModal } = useModal()

  const [searchResults, setSearchResults] = useState([])

  const debouncedQuery = useDebounce(query, 400)

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

  return (
    <div className='w-full relative max-w-[420px] h-full group'>
      <Input
        value={query}
        placeholder='Bạn cần tìm gì?'
        allowClear
        onChange={handleInputChange}
        onClear={handleClear}
        onFocus={() => openModal()}
        onBlur={() => closeModal()}
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
          'absolute top-full left-0 text-base w-full xsm:min-w-[392px] max-h-[80vh] overflow-auto transition-all duration-300 ease-in-out bg-white border border-gray-100 shadow-md z-10 shadow-black/20 rounded-xl',
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
              <SearchOutlined />
              Kết quả cho '{query}'
            </div>
            <div className='mt-3'>
              <div className='px-4 mb-2 font-medium text-gray-800'>Sản phẩm</div>
              <div className='flex flex-col'>
                <div className='flex items-center p-2 rounded-md cursor-pointer gap-x-2 hover:bg-gray-100'>
                  <img className='object-contain w-14 h-14' src={iphone1} alt='' />
                  <div className='flex flex-col gap-y-0.5'>
                    <div className='text-sm font-medium text-black'>Iphone 16 Series</div>
                    <div className='flex items-end'>
                      <div className='text-sm font-bold font-roboto text-primary'>
                        {formatPrice(30000000).replace('đ', '')}
                      </div>
                      <div className='text-xs text-gray-500 line-through font-roboto'>
                        {formatPrice(30000000).replace('đ', '')}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex items-center p-2 rounded-md cursor-pointer gap-x-2 hover:bg-gray-100'>
                  <img className='object-contain w-14 h-14' src={iphone1} alt='' />
                  <div className='flex flex-col gap-y-0.5'>
                    <div className='text-sm font-medium text-black'>Iphone 16 Pro</div>
                    <div className='flex items-end'>
                      <div className='text-sm font-bold font-roboto text-primary'>
                        {formatPrice(25000000).replace('đ', '')}
                      </div>
                      <div className='text-xs text-gray-500 line-through font-roboto'>
                        {formatPrice(27000000).replace('đ', '')}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex items-center p-2 rounded-md cursor-pointer gap-x-2 hover:bg-gray-100'>
                  <img className='object-contain w-14 h-14' src={iphone1} alt='' />
                  <div className='flex flex-col gap-y-0.5'>
                    <div className='text-sm font-medium text-black'>Iphone 16</div>
                    <div className='flex items-end'>
                      <div className='text-sm font-bold font-roboto text-primary'>
                        {formatPrice(20000000).replace('đ', '')}
                      </div>
                      <div className='text-xs text-gray-500 line-through font-roboto'>
                        {formatPrice(22000000).replace('đ', '')}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex items-center p-2 rounded-md cursor-pointer gap-x-2 hover:bg-gray-100'>
                  <img className='object-contain w-14 h-14' src={iphone1} alt='' />
                  <div className='flex flex-col gap-y-0.5'>
                    <div className='text-sm font-medium text-black'>Iphone 16 Pro Max</div>
                    <div className='flex items-end'>
                      <div className='text-sm font-bold font-roboto text-primary'>
                        {formatPrice(35000000).replace('đ', '')}
                      </div>
                      <div className='text-xs text-gray-500 line-through font-roboto'>
                        {formatPrice(37000000).replace('đ', '')}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex items-center p-2 rounded-md cursor-pointer gap-x-2 hover:bg-gray-100'>
                  <img className='object-contain w-14 h-14' src={iphone1} alt='' />
                  <div className='flex flex-col gap-y-0.5'>
                    <div className='text-sm font-medium text-black'>Iphone 16 Mini</div>
                    <div className='flex items-end'>
                      <div className='text-sm font-bold font-roboto text-primary'>
                        {formatPrice(18000000).replace('đ', '')}
                      </div>
                      <div className='text-xs text-gray-500 line-through font-roboto'>
                        {formatPrice(20000000).replace('đ', '')}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex items-center p-2 rounded-md cursor-pointer gap-x-2 hover:bg-gray-100'>
                  <img className='object-contain w-14 h-14' src={iphone1} alt='' />
                  <div className='flex flex-col gap-y-0.5'>
                    <div className='text-sm font-medium text-black'>Iphone 16 Plus</div>
                    <div className='flex items-end'>
                      <div className='text-sm font-bold font-roboto text-primary'>
                        {formatPrice(28000000).replace('đ', '')}
                      </div>
                      <div className='text-xs text-gray-500 line-through font-roboto'>
                        {formatPrice(30000000).replace('đ', '')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {!query && (
          <div className='p-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-x-1.5 text-gray-800 font-medium'>
                Lịch sử tìm kiếm
                <Clock size={14} strokeWidth={2} />
              </div>
              <div className='flex items-center py-1 text-sm font-medium text-gray-500 cursor-pointer gap-x-1 hover:underline'>
                Xóa tất cả
                <Trash2 size={14} strokeWidth={2} />
              </div>
            </div>
            <div className='flex flex-col gap-y-2.5 leading-normal mt-2'>
              <div className='text-sm font-medium text-gray-500 cursor-pointer hover:underline'>Iphone 16 promax</div>
              <div className='text-sm font-medium text-gray-500 cursor-pointer hover:underline'>Iphone 16 promax</div>
              <div className='text-sm font-medium text-gray-500 cursor-pointer hover:underline'>Iphone 16 promax</div>
              <div className='text-sm font-medium text-gray-500 cursor-pointer hover:underline'>Iphone 16 promax</div>
            </div>
            <div className='mt-4'>
              <div className='flex items-center gap-x-1.5 text-gray-800 mb-4 font-medium'>
                Xu hướng tìm kiếm
                <img className='w-4 h-4' src={flame_img} alt='' />
              </div>
              <div className='grid grid-cols-2 gap-x-4 gap-y-5 font-roboto'>
                <div className='flex items-center cursor-pointer gap-x-2'>
                  <img className='object-contain w-10 h-10' src={iphone1} alt='' />
                  <div className='text-sm font-medium text-black'>Iphone 16 Series</div>
                </div>
                <div className='flex items-center cursor-pointer gap-x-2'>
                  <img className='object-contain w-10 h-10' src={iphone1} alt='' />
                  <div className='text-sm font-medium text-black'>Iphone 16 Pro</div>
                </div>
                <div className='flex items-center cursor-pointer gap-x-2'>
                  <img className='object-contain w-10 h-10' src={iphone1} alt='' />
                  <div className='text-sm font-medium text-black'>Iphone 16</div>
                </div>
                <div className='flex items-center cursor-pointer gap-x-2'>
                  <img className='object-contain w-10 h-10' src={iphone1} alt='' />
                  <div className='text-sm font-medium text-black'>Iphone 16 Pro Max</div>
                </div>
                <div className='flex items-center cursor-pointer gap-x-2'>
                  <img className='object-contain w-10 h-10' src={iphone1} alt='' />
                  <div className='text-sm font-medium text-black'>Iphone 16 Mini</div>
                </div>
                <div className='flex items-center cursor-pointer gap-x-2'>
                  <img className='object-contain w-10 h-10' src={iphone1} alt='' />
                  <div className='text-sm font-medium text-black'>Iphone 16 Plus</div>
                </div>
                <div className='flex items-center cursor-pointer gap-x-2'>
                  <img className='object-contain w-10 h-10' src={iphone1} alt='' />
                  <div className='text-sm font-medium text-black'>Iphone 16 Ultra</div>
                </div>
                <div className='flex items-center cursor-pointer gap-x-2'>
                  <img className='object-contain w-10 h-10' src={iphone1} alt='' />
                  <div className='text-sm font-medium text-black'>Iphone 16 SE</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
