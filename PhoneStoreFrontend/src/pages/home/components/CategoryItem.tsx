import classNames from 'classnames'
import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CategoryRenderType } from '../../../types/category.type'
import getUrlQuery from '../../../utils/getUrlQuery'
import { categoriesUrlConfig } from '@/utils/getProductRoute'

interface ICategoryItemProps {
  data: CategoryRenderType
  isFirst: boolean
  isLast: boolean
}

const CategoryItem: FC<ICategoryItemProps> = ({ isFirst, isLast, data }) => {
  const navigate = useNavigate()
  const handleOnClick = () => {
    const url = categoriesUrlConfig[data.name]
    navigate(`/${url}`)
  }
  return (
    <div
      onClick={handleOnClick}
      className={classNames(
        'flex items-center justify-between pl-3 pr-1.5 py-1 cursor-pointer hover:bg-slate-100 group',
        {
          'rounded-tl-md rounded-bl-md': !isFirst && !isLast,
          'rounded-tl-xl rounded-tr-xl rounded-bl-md': isFirst,
          'rounded-tl-md rounded-bl-xl rounded-br-xl': isLast
        }
      )}
    >
      <div className='flex items-center gap-x-1.5'>
        <span>{data.icon}</span>
        <span className='font-medium group-hover:text-primary'>{data.name}</span>
      </div>
      <span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-4 h-4'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
        </svg>
      </span>

      {data.options && (
        <div
          className={classNames(
            'absolute left-[calc(100%+16px)] shadow shadow-slate-900/20 top-0 bottom-0 rounded-xl invisible transition-all z-10',
            'bg-white w-[calc(100vw-(272px))] lg:w-[calc(1200px-(32px+440px))]',
            `p-5 h-fit grid gap-4 grid-flow-col`,
            {
              'group-hover:visible': data.options.length
            }
          )}
        >
          {data.options.map((item, index) => (
            <div onClick={(e) => e.stopPropagation()} key={index} className='flex flex-col items-start gap-y-1'>
              <div className='text-sm font-bold text-black/80'>{item.title}</div>
              <div className='font-normal flex flex-col items-start text-[13px] text-gray-500'>
                {item.listSelection.map((selection, index) => (
                  <Link key={index} to={getUrlQuery(item, selection)} className='hover:text-primary py-1.5'>
                    {selection.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <div
        className={classNames(
          'absolute invisible top-0 bottom-0 w-10 bg-transparent opacity-0 left-[95%]',
          'group-hover:visible'
        )}
      ></div>
    </div>
  )
}

export default CategoryItem
