import { LoadingItem } from '@/components'
import { groupSpecificationsData } from '@/datas/spec_group.data'
import { clearSpecifications, setSpecifications } from '@/features/admin/create_product.slice'
import { useAppDispatch, useAppSelector, useDebounce } from '@/hooks'
import { useGetCategoryById } from '@/hooks/querys/category.query'
import { CategoryType } from '@/types/category.type'
import { SpecificationGroupType } from '@/types/specification_group.type'
import TextArea from 'antd/es/input/TextArea'
import classNames from 'classnames'
import { useState, useCallback, useEffect } from 'react'

const getInputs = (category: CategoryType | undefined): SpecificationGroupType[] => {
  if (!category) return []

  const listGroup =
    category.name === 'Điện thoại'
      ? groupSpecificationsData[0]
      : category.name === 'Laptop'
        ? groupSpecificationsData[1]
        : []

  return category.productSpecificationGroups.map((group) => ({
    ...group,
    productSpecifications:
      listGroup
        .find((spec) => spec.groupName === group.groupName)
        ?.productSpecifications.map((spec, index) => ({
          ...spec,
          displayOrder: index,
          productSpecificationGroupId: group.productSpecificationGroupId,
          value: ''
        })) || []
  }))
}

const AddSpecification = () => {
  const { product, specificationGroups } = useAppSelector((state) => state.createProduct)
  const dispatch = useAppDispatch()

  const { data: category, isLoading, error } = useGetCategoryById(product?.categoryId || -1)

  const [inputs, setInputs] = useState<SpecificationGroupType[]>(specificationGroups)

  const debouncedQuery = useDebounce(inputs, 400)

  useEffect(() => {
    const fetchCategory = async () => {
      if (category) {
        if (specificationGroups.length === 0) {
          const newInputs = getInputs(category)
          setInputs(newInputs)
        } else {
          setInputs(specificationGroups)
        }
      }
    }
    fetchCategory()
  }, [product?.categoryId, category])

  useEffect(() => {
    if (specificationGroups.length > 0) {
      setInputs(specificationGroups)
    }
  }, [specificationGroups])

  useEffect(() => {
    dispatch(setSpecifications(inputs))
  }, [debouncedQuery])

  const handleInputChange = useCallback((specificationGroupId: number, specificationId: number, value: string) => {
    setInputs((prevInputs) =>
      prevInputs.map((group) =>
        group.productSpecificationGroupId === specificationGroupId
          ? {
              ...group,
              productSpecifications: group.productSpecifications.map((spec) =>
                spec.productSpecificationId === specificationId
                  ? { ...spec, value, productSpecificationGroupId: specificationGroupId }
                  : spec
              )
            }
          : group
      )
    )
  }, [])

  if (error) return <div>Đã có lỗi xảy ra</div>
  if (isLoading) return <LoadingItem />

  return (
    <div className='p-5 space-y-6 bg-white border border-gray-300 rounded-lg'>
      <div className='flex items-center justify-between'>
        <div className='font-semibold'>Thông số kỹ thuật</div>
        <button onClick={() => setInputs(getInputs(category))} className='text-xs border border-gray-100 btn btn-light'>
          Clear
        </button>
      </div>
      <div className='flex flex-col gap-y-6'>
        {inputs.map((group, index) => (
          <div key={index} className='flex flex-col px-5'>
            <div className='font-bold'>{group.groupName}</div>
            <div className='mt-3 font-normal text-gray-700 bg-gray-100 border border-gray-200 rounded-lg'>
              {group.productSpecifications.map((spec, index) => (
                <div
                  key={index}
                  className={classNames('flex items-center gap-3 px-2 py-2.5 last:rounded-b-lg first:rounded-t-lg', {
                    'bg-white': index % 2 !== 0
                  })}
                >
                  <span className='w-1/2 font-medium'>{spec.key}</span>
                  <span className='w-1/2'>
                    <TextArea
                      value={spec.value}
                      rows={1}
                      autoSize={{ minRows: 1, maxRows: 20 }}
                      placeholder={`Nhập ${spec.key.toLowerCase()}`}
                      variant='borderless'
                      onChange={(e) =>
                        handleInputChange(
                          group.productSpecificationGroupId,
                          spec.productSpecificationId,
                          e.target.value
                        )
                      }
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AddSpecification
