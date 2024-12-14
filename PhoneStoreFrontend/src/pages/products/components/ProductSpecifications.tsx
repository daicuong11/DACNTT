import classNames from 'classnames'
import { ChevronDown } from 'lucide-react'
import { productSpecificationsArray } from '../../../datas'
import { ContainerPanel } from '../../../components'

const ProductSpecifications = () => {
  return (
    <ContainerPanel title='Thông số kỹ thuật'>
      <div className='mt-2 text-sm font-normal text-gray-700 bg-gray-100 border border-gray-200 rounded-md'>
        {productSpecificationsArray.map((specification, index) => (
          <div
            key={index}
            className={classNames('flex items-center gap-3 px-2 py-2.5', {
              'bg-white': index % 2 !== 0
            })}
          >
            <span className='w-1/2 font-medium'>{specification.name}</span>
            <span className='w-1/2'>{specification.value}</span>
          </div>
        ))}
      </div>
      <button className='items-end text-[15px] font-medium border border-gray-100 shadow-md btn btn-light drop-shadow-sm'>
        Xem chi tiết{' '}
        <span>
          <ChevronDown size={18} strokeWidth={2} />
        </span>
      </button>
    </ContainerPanel>
  )
}

export default ProductSpecifications
