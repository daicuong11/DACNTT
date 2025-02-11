import { setSpecifications } from '@/features/admin/create_product.slice'
import { useAppDispatch, useAppSelector, useDebounce } from '@/hooks'
import { SpecificationType } from '@/types/specification.type'
import { SpecificationGroupType } from '@/types/specification_group.type'
import TextArea from 'antd/es/input/TextArea'
import classNames from 'classnames'
import { useEffect, useState } from 'react'

const groupSpecifications: SpecificationGroupType[] = [
  {
    specificationGroupId: 0,
    groupName: 'Màn hình',
    displayOrder: 0,
    categoryId: 0
  },
  {
    specificationGroupId: 1,
    groupName: 'Camera sau',
    displayOrder: 1,
    categoryId: 0
  },
  {
    specificationGroupId: 2,
    groupName: 'Camera trước',
    displayOrder: 2,
    categoryId: 0
  },
  {
    specificationGroupId: 3,
    groupName: 'Vi xử lý & đồ họa',
    displayOrder: 3,
    categoryId: 0
  },
  {
    specificationGroupId: 4,
    groupName: 'Giao tiếp & kết nối',
    displayOrder: 4,
    categoryId: 0
  },
  {
    specificationGroupId: 5,
    groupName: 'RAM & lưu trữ',
    displayOrder: 5,
    categoryId: 0
  },
  {
    specificationGroupId: 6,
    groupName: 'Tính năng khác',
    displayOrder: 6,
    categoryId: 0
  },
  {
    specificationGroupId: 7,
    groupName: 'Bộ xử lý & đồ họa',
    displayOrder: 7,
    categoryId: 0
  },
  {
    specificationGroupId: 8,
    groupName: 'Kích thước & trọng lượng',
    displayOrder: 8,
    categoryId: 0
  },
  {
    specificationGroupId: 9,
    groupName: 'Thiết kế & trọng lượng',
    displayOrder: 9,
    categoryId: 0
  },
  {
    specificationGroupId: 10,
    groupName: 'Thông số khác',
    displayOrder: 10,
    categoryId: 0
  },
  {
    specificationGroupId: 11,
    groupName: 'Pin & công nghệ sạc',
    displayOrder: 11,
    categoryId: 0
  },
  {
    specificationGroupId: 12,
    groupName: 'Tiện ích khác',
    displayOrder: 12,
    categoryId: 0
  },
  {
    specificationGroupId: 13,
    groupName: 'Thông tin chung',
    displayOrder: 13,
    categoryId: 0
  }
]

const specifications: SpecificationType[] = [
  {
    specificationId: 0,
    productVariantId: -1,
    specificationGroupId: 0,
    key: 'Kích thước màn hình',
    value: '',
    displayOrder: 0,
    isSpecial: true
  },
  {
    specificationId: 1,
    productVariantId: -1,
    specificationGroupId: 0,
    key: 'Công nghệ màn hình',
    value: '',
    displayOrder: 1,
    isSpecial: true
  },
  {
    specificationId: 2,
    productVariantId: -1,
    specificationGroupId: 0,
    key: 'Độ phân giải màn hình',
    value: '',
    displayOrder: 2,
    isSpecial: true
  },
  {
    specificationId: 3,
    productVariantId: -1,
    specificationGroupId: 0,
    key: 'Tính năng màn hình',
    value: '',
    displayOrder: 3,
    isSpecial: true
  },
  {
    specificationId: 4,
    productVariantId: -1,
    specificationGroupId: 0,
    key: 'Tần số quét',
    value: '',
    displayOrder: 4,
    isSpecial: false
  },
  {
    specificationId: 5,
    productVariantId: -1,
    specificationGroupId: 0,
    key: 'Kiểu màn hình',
    value: '',
    displayOrder: 5,
    isSpecial: false
  },
  {
    specificationId: 6,
    productVariantId: -1,
    specificationGroupId: 1,
    key: 'Camera sau',
    value: '',
    displayOrder: 0,
    isSpecial: true
  },
  {
    specificationId: 7,
    productVariantId: -1,
    specificationGroupId: 1,
    key: 'Quay video',
    value: '',
    displayOrder: 1,
    isSpecial: false
  },
  {
    specificationId: 8,
    productVariantId: -1,
    specificationGroupId: 1,
    key: 'Tính năng camera',
    value: '',
    displayOrder: 2,
    isSpecial: false
  },
  {
    specificationId: 9,
    productVariantId: -1,
    specificationGroupId: 2,
    key: 'Camera trước',
    value: '',
    displayOrder: 0,
    isSpecial: true
  },
  {
    specificationId: 10,
    productVariantId: -1,
    specificationGroupId: 2,
    key: 'Quay video trước',
    value: '',
    displayOrder: 1,
    isSpecial: false
  },
  {
    specificationId: 11,
    productVariantId: -1,
    specificationGroupId: 3,
    key: 'Chipset',
    value: '',
    displayOrder: 0,
    isSpecial: true
  },
  {
    specificationId: 12,
    productVariantId: -1,
    specificationGroupId: 3,
    key: 'GPU',
    value: '',
    displayOrder: 1,
    isSpecial: false
  },
  {
    specificationId: 13,
    productVariantId: -1,
    specificationGroupId: 4,
    key: 'Công nghệ NFC',
    value: '',
    displayOrder: 0,
    isSpecial: true
  },
  {
    specificationId: 14,
    productVariantId: -1,
    specificationGroupId: 4,
    key: 'Thẻ SIM',
    value: '',
    displayOrder: 1,
    isSpecial: true
  },
  {
    specificationId: 15,
    productVariantId: -1,
    specificationGroupId: 4,
    key: 'Hỗ trợ mạng',
    value: '',
    displayOrder: 2,
    isSpecial: false
  },
  {
    specificationId: 16,
    productVariantId: -1,
    specificationGroupId: 4,
    key: 'GPS',
    value: '',
    displayOrder: 3,
    isSpecial: false
  },
  {
    specificationId: 17,
    productVariantId: -1,
    specificationGroupId: 5,
    key: 'Bộ nhớ trong',
    value: '',
    displayOrder: 0,
    isSpecial: true
  },
  {
    specificationId: 18,
    productVariantId: -1,
    specificationGroupId: 6,
    key: 'Hệ điều hành',
    value: '',
    displayOrder: 0,
    isSpecial: true
  },
  {
    specificationId: 19,
    productVariantId: -1,
    specificationGroupId: 7,
    key: 'Loại CPU',
    value: '',
    displayOrder: 0,
    isSpecial: true
  },
  {
    specificationId: 20,
    productVariantId: -1,
    specificationGroupId: 8,
    key: 'Kích thước',
    value: '',
    displayOrder: 0,
    isSpecial: false
  },
  {
    specificationId: 21,
    productVariantId: -1,
    specificationGroupId: 8,
    key: 'Trọng lượng',
    value: '',
    displayOrder: 1,
    isSpecial: false
  },
  {
    specificationId: 22,
    productVariantId: -1,
    specificationGroupId: 9,
    key: 'Chất liệu mặt lưng',
    value: '',
    displayOrder: 0,
    isSpecial: false
  },
  {
    specificationId: 23,
    productVariantId: -1,
    specificationGroupId: 9,
    key: 'Chất liệu khung viền',
    value: '',
    displayOrder: 1,
    isSpecial: false
  },
  {
    specificationId: 24,
    productVariantId: -1,
    specificationGroupId: 10,
    key: 'Tương thích',
    value: '',
    displayOrder: 0,
    isSpecial: true
  },
  {
    specificationId: 25,
    productVariantId: -1,
    specificationGroupId: 10,
    key: 'Chỉ số kháng nước, bụi',
    value: '',
    displayOrder: 1,
    isSpecial: false
  },
  {
    specificationId: 26,
    productVariantId: -1,
    specificationGroupId: 10,
    key: 'Công nghệ - Tiện ích',
    value: '',
    displayOrder: 2,
    isSpecial: false
  },
  {
    specificationId: 27,
    productVariantId: -1,
    specificationGroupId: 10,
    key: 'Tiện ích khác',
    value: '',
    displayOrder: 3,
    isSpecial: false
  },
  {
    specificationId: 28,
    productVariantId: -1,
    specificationGroupId: 10,
    key: 'Công nghệ âm thanh',
    value: '',
    displayOrder: 4,
    isSpecial: false
  },
  {
    specificationId: 29,
    productVariantId: -1,
    specificationGroupId: 11,
    key: 'Công nghệ sạc',
    value: '',
    displayOrder: 0,
    isSpecial: false
  },
  {
    specificationId: 30,
    productVariantId: -1,
    specificationGroupId: 11,
    key: 'Cổng sạc',
    value: '',
    displayOrder: 1,
    isSpecial: false
  },
  {
    specificationId: 31,
    productVariantId: -1,
    specificationGroupId: 12,
    key: 'Các loại cảm biến',
    value: '',
    displayOrder: 0,
    isSpecial: false
  },
  {
    specificationId: 32,
    productVariantId: -1,
    specificationGroupId: 12,
    key: 'Tính năng đặc biệt',
    value: '',
    displayOrder: 1,
    isSpecial: false
  },
  {
    specificationId: 33,
    productVariantId: -1,
    specificationGroupId: 13,
    key: 'Wi-Fi',
    value: '',
    displayOrder: 0,
    isSpecial: false
  },
  {
    specificationId: 34,
    productVariantId: -1,
    specificationGroupId: 13,
    key: 'Bluetooth',
    value: '',
    displayOrder: 1,
    isSpecial: false
  },
  {
    specificationId: 35,
    productVariantId: -1,
    specificationGroupId: 14,
    key: 'Thời điểm ra mắt',
    value: '',
    displayOrder: 0,
    isSpecial: false
  }
]

const AddSpecification = () => {
  const { specifications: initSpec } = useAppSelector((state) => state.createProduct)
  const dispatch = useAppDispatch()
  const [specificationInputs, setSpecificationInputs] = useState<SpecificationType[]>(
    initSpec.length > 0 ? initSpec : specifications
  )

  const debounceQuery = useDebounce(specificationInputs, 500)

  useEffect(() => {
    dispatch(setSpecifications(debounceQuery))
  }, [debounceQuery, dispatch])

  useEffect(() => {
    setSpecificationInputs(initSpec.length > 0 ? initSpec : specifications)
  }, [initSpec])

  const handleInputChange = (id: number, value: string) => {
    setSpecificationInputs((prev) =>
      prev.map((spec) => {
        if (spec.specificationId === id) {
          return { ...spec, value }
        }
        return spec
      })
    )
  }

  return (
    <div className='p-5 space-y-6 bg-white border border-gray-300 rounded-lg'>
      <div className='font-semibold'>Thông số kỹ thuật</div>
      <div className='flex flex-col gap-y-6'>
        {groupSpecifications.map((group) => (
          <div key={group.specificationGroupId} className='flex flex-col px-5'>
            <div className='font-bold'>{group.groupName}</div>
            <div className='mt-3 font-normal text-gray-700 bg-gray-100 border border-gray-200 rounded-lg'>
              {specificationInputs
                .filter((spec) => spec.specificationGroupId === group.specificationGroupId)
                .map((specification, index) => (
                  <div
                    key={index}
                    className={classNames('flex items-center gap-3 px-2 py-2.5 last:rounded-b-lg first:rounded-t-lg', {
                      'bg-white': index % 2 !== 0
                    })}
                  >
                    <span className='w-1/2 font-medium'>{specification.key}</span>
                    <span className='w-1/2'>
                      <TextArea
                        value={specification.value}
                        rows={1}
                        autoSize={{ minRows: 1, maxRows: 20 }}
                        placeholder={`Nhập ${specification.key.toLowerCase()}`}
                        variant='borderless'
                        onChange={(e) => handleInputChange(specification.specificationId, e.target.value)}
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
