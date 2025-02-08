import React, { useRef, useState } from 'react'
import Card from '../components/Card'
import {
  Button,
  Divider,
  GetProp,
  Image,
  Input,
  InputNumber,
  InputNumberProps,
  InputRef,
  Select,
  Space,
  Upload,
  UploadFile,
  UploadProps
} from 'antd'
import { Pencil } from 'lucide-react'
import { useModal } from '@/hooks'
import CreateProductDescription from '@/components/modals/CreateProductDescription'
import { set } from 'react-hook-form'
import { PlusOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import { MyDivider } from '@/components'
import { SpecificationGroupType } from '@/types/specification_group.type'
import { SpecificationType } from '@/types/specification.type'
import classNames from 'classnames'
import TextArea from 'antd/es/input/TextArea'

const exampleCategory = [
  {
    id: 1,
    name: 'Điện thoại'
  },
  {
    id: 2,
    name: 'Laptop'
  },
  {
    id: 3,
    name: 'Tivi'
  },
  {
    id: 4,
    name: 'Đồng hồ'
  }
]

const exampleBrand = [
  {
    id: 1,
    name: 'Apple'
  },
  {
    id: 2,
    name: 'Samsung'
  },
  {
    id: 3,
    name: 'Xiaomi'
  },
  {
    id: 4,
    name: 'Huawei'
  }
]

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

const specifications: Omit<SpecificationType, 'productVariantId'>[] = [
  {
    specificationId: 0,
    specificationGroupId: 0,
    key: 'Kích thước màn hình',
    value: '',
    displayOrder: 0,
    isSpecial: true
  },
  {
    specificationId: 1,
    specificationGroupId: 0,
    key: 'Công nghệ màn hình',
    value: '',
    displayOrder: 1,
    isSpecial: true
  },
  {
    specificationId: 2,
    specificationGroupId: 0,
    key: 'Độ phân giải màn hình',
    value: '',
    displayOrder: 2,
    isSpecial: true
  },
  {
    specificationId: 3,
    specificationGroupId: 0,
    key: 'Tính năng màn hình',
    value: '',
    displayOrder: 3,
    isSpecial: true
  },
  {
    specificationId: 4,
    specificationGroupId: 0,
    key: 'Tần số quét',
    value: '',
    displayOrder: 4,
    isSpecial: false
  },
  {
    specificationId: 5,
    specificationGroupId: 0,
    key: 'Kiểu màn hình',
    value: '',
    displayOrder: 5,
    isSpecial: false
  },
  {
    specificationId: 6,
    specificationGroupId: 1,
    key: 'Camera sau',
    value: '',
    displayOrder: 0,
    isSpecial: true
  },
  {
    specificationId: 7,
    specificationGroupId: 1,
    key: 'Quay video',
    value: '',
    displayOrder: 1,
    isSpecial: false
  },
  {
    specificationId: 8,
    specificationGroupId: 1,
    key: 'Tính năng camera',
    value: '',
    displayOrder: 2,
    isSpecial: false
  },
  {
    specificationId: 9,
    specificationGroupId: 2,
    key: 'Camera trước',
    value: '',
    displayOrder: 0,
    isSpecial: true
  },
  {
    specificationId: 10,
    specificationGroupId: 2,
    key: 'Quay video trước',
    value: '',
    displayOrder: 1,
    isSpecial: false
  },
  {
    specificationId: 11,
    specificationGroupId: 3,
    key: 'Chipset',
    value: '',
    displayOrder: 0,
    isSpecial: true
  },
  {
    specificationId: 12,
    specificationGroupId: 3,
    key: 'GPU',
    value: '',
    displayOrder: 1,
    isSpecial: false
  },
  {
    specificationId: 13,
    specificationGroupId: 4,
    key: 'Công nghệ NFC',
    value: '',
    displayOrder: 0,
    isSpecial: true
  },
  {
    specificationId: 14,
    specificationGroupId: 4,
    key: 'Thẻ SIM',
    value: '',
    displayOrder: 1,
    isSpecial: true
  },
  {
    specificationId: 15,
    specificationGroupId: 4,
    key: 'Hỗ trợ mạng',
    value: '',
    displayOrder: 2,
    isSpecial: false
  },
  {
    specificationId: 16,
    specificationGroupId: 4,
    key: 'GPS',
    value: '',
    displayOrder: 3,
    isSpecial: false
  },
  {
    specificationId: 17,
    specificationGroupId: 5,
    key: 'Bộ nhớ trong',
    value: '',
    displayOrder: 0,
    isSpecial: true
  },
  {
    specificationId: 18,
    specificationGroupId: 6,
    key: 'Hệ điều hành',
    value: '',
    displayOrder: 0,
    isSpecial: true
  },
  {
    specificationId: 19,
    specificationGroupId: 7,
    key: 'Loại CPU',
    value: '',
    displayOrder: 0,
    isSpecial: true
  },
  {
    specificationId: 20,
    specificationGroupId: 8,
    key: 'Kích thước',
    value: '',
    displayOrder: 0,
    isSpecial: false
  },
  {
    specificationId: 21,
    specificationGroupId: 8,
    key: 'Trọng lượng',
    value: '',
    displayOrder: 1,
    isSpecial: false
  },
  {
    specificationId: 22,
    specificationGroupId: 9,
    key: 'Chất liệu mặt lưng',
    value: '',
    displayOrder: 0,
    isSpecial: false
  },
  {
    specificationId: 23,
    specificationGroupId: 9,
    key: 'Chất liệu khung viền',
    value: '',
    displayOrder: 1,
    isSpecial: false
  },
  {
    specificationId: 24,
    specificationGroupId: 10,
    key: 'Tương thích',
    value: '',
    displayOrder: 0,
    isSpecial: true
  },
  {
    specificationId: 25,
    specificationGroupId: 10,
    key: 'Chỉ số kháng nước, bụi',
    value: '',
    displayOrder: 1,
    isSpecial: false
  },
  {
    specificationId: 26,
    specificationGroupId: 10,
    key: 'Công nghệ - Tiện ích',
    value: '',
    displayOrder: 2,
    isSpecial: false
  },
  {
    specificationId: 27,
    specificationGroupId: 10,
    key: 'Tiện ích khác',
    value: '',
    displayOrder: 3,
    isSpecial: false
  },
  {
    specificationId: 28,
    specificationGroupId: 10,
    key: 'Công nghệ âm thanh',
    value: '',
    displayOrder: 4,
    isSpecial: false
  },
  {
    specificationId: 29,
    specificationGroupId: 11,
    key: 'Công nghệ sạc',
    value: '',
    displayOrder: 0,
    isSpecial: false
  },
  {
    specificationId: 30,
    specificationGroupId: 11,
    key: 'Cổng sạc',
    value: '',
    displayOrder: 1,
    isSpecial: false
  },
  {
    specificationId: 31,
    specificationGroupId: 12,
    key: 'Các loại cảm biến',
    value: '',
    displayOrder: 0,
    isSpecial: false
  },
  {
    specificationId: 32,
    specificationGroupId: 12,
    key: 'Tính năng đặc biệt',
    value: '',
    displayOrder: 1,
    isSpecial: false
  },
  {
    specificationId: 33,
    specificationGroupId: 13,
    key: 'Wi-Fi',
    value: '',
    displayOrder: 0,
    isSpecial: false
  },
  {
    specificationId: 34,
    specificationGroupId: 13,
    key: 'Bluetooth',
    value: '',
    displayOrder: 1,
    isSpecial: false
  },
  {
    specificationId: 35,
    specificationGroupId: 14,
    key: 'Thời điểm ra mắt',
    value: '',
    displayOrder: 0,
    isSpecial: false
  }
]

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const AddProduct = () => {
  const useModalCreateDescription = useModal()
  const [description, setDescription] = React.useState<string>('')
  const [colorItems, setColorItems] = React.useState<string[]>(['Đỏ', 'Xanh', 'Vàng', 'Trắng', 'Đen'])
  const [storageItems, setStorageItems] = React.useState<number[]>([32, 64, 128, 256, 512])
  const [discountItems, setDiscountItems] = React.useState<number[]>([0, 5, 10, 15, 20])
  const [newDiscount, setNewDiscount] = React.useState<number>(0)
  const [newStorage, setNewStorage] = React.useState<number>(0)
  const [newColor, setNewColor] = React.useState<string>('')
  const inputColorRef = useRef<InputRef>(null)
  const inputStorageRef = useRef<InputRef>(null)
  const inputDiscountRef = useRef<InputRef>(null)

  // Upload image
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-xxx',
      percent: 50,
      name: 'image.png',
      status: 'uploading',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error'
    }
  ])

  const onNameColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewColor(event.target.value)
  }

  const addColorItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault()
    if (!newColor) {
      toast.error('Màu sắc không được để trống')
      return
    }
    if (colorItems.includes(newColor)) {
      toast.error('Màu sắc đã tồn tại')
      return
    }
    setColorItems([...colorItems, newColor])
    setNewColor('')
    setTimeout(() => {
      inputColorRef.current?.focus()
    }, 0)
  }

  const onNameStorageChange: InputNumberProps['onChange'] = (value) => {
    setNewStorage(value as number)
  }

  const addStorageItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault()
    if (newStorage === 0) {
      toast.error('Dung lượng không được để trống')
      return
    }
    if (storageItems.includes(newStorage)) {
      toast.error('Dung lượng đã tồn tại')
      return
    }
    setStorageItems([...storageItems, newStorage])
    setNewStorage(0)
    setTimeout(() => {
      inputStorageRef.current?.focus()
    }, 0)
  }

  const onNameDiscountChange: InputNumberProps['onChange'] = (value) => {
    setNewDiscount(value as number)
  }

  const addDiscountItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault()
    if (discountItems.includes(newDiscount)) {
      toast.error('Giảm giá đã tồn tại')
      return
    }
    setDiscountItems([...discountItems, newDiscount])
    setNewDiscount(0)
    setTimeout(() => {
      inputDiscountRef.current?.focus()
    }, 0)
  }

  // handle upload and preview image
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList)

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type='button'>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </button>
  )

  return (
    <Card title='Thêm Sản Phẩm'>
      <div className='flex flex-col gap-y-6'>
        <div className='space-y-3'>
          <div className='uppercase'>Thông tin sản phẩm</div>
          <div className='p-5 space-y-6 bg-white border border-gray-300 rounded-lg'>
            <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
              <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Tên sản phẩm</div>
              <Input
                value={''}
                type='email'
                variant='borderless'
                placeholder='Nhập tên sản phẩm'
                allowClear
                className='text-base'
              />
            </div>
            <div className='flex flex-col sm:grid sm:grid-cols-2 gap-x-3 gap-y-5'>
              <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
                <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Danh mục</div>
                <Select
                  showSearch
                  value={undefined}
                  placeholder={'Chọn danh mục'}
                  variant='borderless'
                  options={exampleCategory.map((category) => ({ value: category.id, label: category.name }))}
                  className='text-base'
                />
              </div>
              <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
                <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Nhãn hàng</div>
                <Select
                  showSearch
                  value={undefined}
                  placeholder={'Chọn nhãn hàng'}
                  variant='borderless'
                  options={exampleBrand.map((brand) => ({ value: brand.id, label: brand.name }))}
                  className='text-base'
                />
              </div>
            </div>

            <div className='flex flex-col gap-y-2.5 transition-all group'>
              <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Mô tả sản phẩm</div>
              <div className='flex items-center gap-x-5'>
                <div
                  dangerouslySetInnerHTML={{ __html: description || 'Chưa có mô tả' }}
                  className='line-clamp-1 w-52'
                ></div>
                <CreateProductDescription
                  value={description}
                  onChange={(value) => setDescription(value)}
                  isOpen={useModalCreateDescription.isOpen}
                  closeModal={useModalCreateDescription.closeModal}
                />
                <button
                  onClick={() => useModalCreateDescription.openModal()}
                  className='text-sm border border-gray-100 btn btn-light w-44'
                >
                  <Pencil size={16} strokeWidth={1.6} />
                  {description ? 'Chỉnh sửa' : 'Thêm mô tả'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='space-y-3'>
          <div className='uppercase'>
            Mẫu sản phẩm <span className='normal-case'>(Tạo ít nhất 1 mẫu)</span>
          </div>
          <div className='p-5 space-y-6 bg-white border border-gray-300 rounded-lg'>
            <div className='font-semibold'>Thông tin mẫu</div>
            <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
              <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Tên phiên bản</div>
              <Input
                value={''}
                variant='borderless'
                placeholder='Tên phân biệt giữa các phiên bản'
                allowClear
                className='text-base'
              />
            </div>

            <div className='flex flex-col sm:grid sm:grid-cols-2 gap-x-3 gap-y-5'>
              <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
                <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Màu sắc</div>
                <Select
                  showSearch
                  value={undefined}
                  placeholder={'Chọn màu sắc'}
                  variant='borderless'
                  options={colorItems.map((color) => ({ value: color, label: color }))}
                  className='text-base'
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: '8px 0' }} />
                      <div className='flex items-center gap-x-3'>
                        <Input
                          placeholder='Nhập màu sắc'
                          ref={inputColorRef}
                          value={newColor}
                          onChange={onNameColorChange}
                          onKeyDown={(e) => e.stopPropagation()}
                        />
                        <Button type='text' icon={<PlusOutlined />} onClick={addColorItem}>
                          Thêm màu sắc
                        </Button>
                      </div>
                    </>
                  )}
                />
              </div>
              <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
                <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>
                  Dung lượng bộ nhớ
                </div>
                <Select
                  showSearch
                  value={undefined}
                  placeholder={'Chọn dung lượng'}
                  variant='borderless'
                  options={storageItems.map((item) => ({ value: item, label: item + ' GB' }))}
                  className='text-base'
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: '8px 0' }} />
                      <div className='flex items-center gap-x-3'>
                        <InputNumber<number>
                          placeholder='Nhập dung lượng'
                          value={newStorage}
                          min={0}
                          max={99999999}
                          formatter={(value) => `${value} GB` as string}
                          parser={(value) => value?.replace('GB', '') as unknown as number}
                          onChange={onNameStorageChange}
                        />
                        <Button type='text' icon={<PlusOutlined />} onClick={addStorageItem}>
                          Thêm dung lượng
                        </Button>
                      </div>
                    </>
                  )}
                />
              </div>

              <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
                <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Giá nhập (VNĐ)</div>
                <InputNumber<number>
                  variant='borderless'
                  placeholder='Nhập giá nhập sản phẩm'
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                  className='w-full text-base'
                />
              </div>
              <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
                <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Giá bán (VNĐ)</div>
                <InputNumber<number>
                  variant='borderless'
                  placeholder='Nhập giá bán sản phẩm'
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                  className='w-full text-base'
                />
              </div>

              <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
                <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Tồn kho</div>
                <InputNumber<number>
                  value={1}
                  min={1}
                  max={99999999}
                  variant='borderless'
                  placeholder='Nhập số lượng tồn kho'
                  className='w-full text-base'
                />
              </div>
              <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
                <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>
                  Giảm giá sản phẩm
                </div>
                <Select
                  showSearch
                  value={undefined}
                  placeholder={'Chọn giảm giá'}
                  variant='borderless'
                  options={discountItems.map((item) => ({ value: item, label: item + '%' }))}
                  className='text-base'
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: '8px 0' }} />
                      <div className='flex items-center gap-x-3'>
                        <InputNumber<number>
                          placeholder='Nhập giảm giá'
                          value={newDiscount}
                          min={0}
                          max={100}
                          formatter={(value) => `${value}%`}
                          parser={(value) => value?.replace('%', '') as unknown as number}
                          onChange={onNameDiscountChange}
                        />
                        <Button type='text' icon={<PlusOutlined />} onClick={addDiscountItem}>
                          Tạo giảm giá
                        </Button>
                      </div>
                    </>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='p-5 space-y-6 bg-white border border-gray-300 rounded-lg'>
            <div className='font-semibold'>Danh sách hình ảnh</div>
            <div>
              <Upload
                action='https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload'
                listType='picture-card'
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 11 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: 'none' }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) => !visible && setPreviewImage('')
                  }}
                  src={previewImage}
                />
              )}
            </div>
          </div>

          <div className='p-5 space-y-6 bg-white border border-gray-300 rounded-lg'>
            <div className='font-semibold'>Thông số kỹ thuật</div>
            <div className='flex flex-col gap-y-6'>
              {groupSpecifications.map((group) => (
                <div key={group.specificationGroupId} className='flex flex-col px-5'>
                  <div className='font-bold'>{group.groupName}</div>
                  <div className='mt-3 font-normal text-gray-700 bg-gray-100 border border-gray-200 rounded-lg'>
                    {specifications
                      .filter((spec) => spec.specificationGroupId === group.specificationGroupId)
                      .map((specification, index) => (
                        <div
                          key={index}
                          className={classNames(
                            'flex items-center gap-3 px-2 py-2.5 last:rounded-b-lg first:rounded-t-lg',
                            {
                              'bg-white': index % 2 !== 0
                            }
                          )}
                        >
                          <span className='w-1/2 font-medium'>{specification.key}</span>
                          <span className='w-1/2'>
                            <TextArea
                              rows={1}
                              autoSize={{ minRows: 1, maxRows: 20 }}
                              placeholder={`Nhập ${specification.key}`}
                              variant='borderless'
                            />
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button className='btn btn-danger'>Thêm mẫu</button>
      </div>
    </Card>
  )
}

export default AddProduct
