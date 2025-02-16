import classNames from 'classnames'
import { ChevronDown } from 'lucide-react'
import { ContainerPanel } from '../../../components'
import { FC } from 'react'
import { useGetSpecificationIsSpecialByVariantId } from '@/hooks/querys/spec_group.query'
import SpecificationFullModal from '@/components/modals/SpecificationFullModal'
import { useModal } from '@/hooks'

interface ProductSpecificationsProps {
  productVariantId: number
}
const ProductSpecifications: FC<ProductSpecificationsProps> = ({ productVariantId }) => {
  const { data: specs, isLoading, error } = useGetSpecificationIsSpecialByVariantId(productVariantId)
  const { isOpen, closeModal, openModal } = useModal()
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <ContainerPanel title='Thông số kỹ thuật'>
      <div className='mt-2 text-sm font-normal text-gray-700 bg-gray-100 border border-gray-200 rounded-md'>
        {specs &&
          specs.map((specification, index) => (
            <div
              key={index}
              className={classNames('flex items-center gap-3 px-2 py-2.5', {
                'bg-white': index % 2 !== 0,
                'rounded-t-md': index === 0,
                'rounded-b-md': index === specs.length - 1
              })}
            >
              <span className='w-1/2 font-medium'>{specification.key}</span>
              <span className='w-1/2'>{specification.value}</span>
            </div>
          ))}
      </div>
      <SpecificationFullModal isOpen={isOpen} onClose={closeModal} productVariantId={productVariantId} />
      <div className='my-2'>
        <button
          onClick={openModal}
          className='items-center font-roboto mx-auto text-[15px] w-full text-nowrap px-20 font-medium border border-gray-200 shadow-md btn btn-light hover:border-primary hover:text-primary hover:!bg-red-50 drop-shadow-sm'
        >
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
