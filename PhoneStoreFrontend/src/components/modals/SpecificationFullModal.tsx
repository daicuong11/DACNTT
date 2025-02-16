import { useGetSpecificationGroupsByVariantId } from '@/hooks/querys/spec_group.query'
import { Modal } from 'antd'
import classNames from 'classnames'
import React, { FC } from 'react'

interface SpecificationFullModalProps {
  productVariantId: number
  isOpen: boolean
  onClose: () => void
}
const SpecificationFullModal: FC<SpecificationFullModalProps> = ({ productVariantId, isOpen, onClose }) => {
  const { data: groups, isLoading, error } = useGetSpecificationGroupsByVariantId(productVariantId)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  return (
    <Modal
      title={<div className='text-lg text-center uppercase border-b pb-3'>Thông số kỹ thuật</div>}
      centered
      open={isOpen}
      onOk={onClose}
      onCancel={onClose}
      width={500}
      footer={
        <div onClick={onClose} className='btn btn-danger'>
          Đóng
        </div>
      }
    >
      <div className='mt-4 text-sm font-normal text-gray-700 rounded-md flex flex-col gap-y-3 scrollbar-hide max-h-[70vh] overflow-y-scroll '>
        {groups &&
          groups.map((group, index) => (
            <div key={index} className='flex flex-col'>
              <div className='font-bold'>{group.groupName}</div>
              <div className='mt-3 font-normal text-gray-700 bg-gray-100 border border-gray-200 rounded-lg'>
                {group.productSpecifications &&
                  group.productSpecifications.map((spec, index) => (
                    <div
                      key={index}
                      className={classNames(
                        'flex items-center gap-3 px-2 py-2.5 last:rounded-b-lg first:rounded-t-lg',
                        {
                          'bg-white': index % 2 !== 0
                        }
                      )}
                    >
                      <span className='w-1/2 font-medium'>{spec.key}</span>
                      <span className='w-1/2'>{spec.value}</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </Modal>
  )
}

export default SpecificationFullModal
