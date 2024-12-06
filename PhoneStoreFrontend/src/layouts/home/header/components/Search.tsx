import { SearchIcon, X } from 'lucide-react'
import { FC, useState, useEffect } from 'react'
import { useDebounce } from '../../../../hooks'

interface SearchProps {}

const Search: FC<SearchProps> = ({}) => {
  const [query, setQuery] = useState('')
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
    <div className='relative w-full h-full'>
      <input
        value={query}
        onChange={handleInputChange}
        className='px-8 py-[5px] text-base font-[490] rounded-lg outline-none w-full min-w-[320px]'
        placeholder='Bạn cần tìm gì?'
      />
      <div className='absolute text-gray-600 -translate-y-1/2 top-1/2 left-1.5'>
        <SearchIcon size={20} className='' />
      </div>
      {query && (
        <div
          onClick={handleClear}
          className='absolute p-2 font-semibold -translate-y-1/2 cursor-pointer top-1/2 right-1'
        >
          <X size={16} className='text-black/70 hover:text-black/100' />
        </div>
      )}
    </div>
  )
}

export default Search
