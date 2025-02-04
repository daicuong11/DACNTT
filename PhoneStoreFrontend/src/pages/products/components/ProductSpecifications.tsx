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
      <div className='my-2'>
        <button className='items-center font-roboto mx-auto text-[15px] w-full text-nowrap px-20 font-medium border border-gray-200 shadow-md btn btn-light hover:border-primary hover:text-primary hover:!bg-red-50 drop-shadow-sm'>
          Xem thêm
          <span>
            <ChevronDown size={18} strokeWidth={2} />
          </span>
        </button>
      </div>
    </ContainerPanel>
  )
}

export default ProductSpecifications
