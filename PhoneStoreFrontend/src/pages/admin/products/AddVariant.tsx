import { PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Input, InputNumber, InputNumberProps, InputRef, Select, Tooltip } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import AddVariantImage from './AddVariantImage'
import AddSpecification from './AddSpecification'
import { ProductVariantRequestType } from '@/types/product_variant.type'
import { useAppDispatch, useAppSelector, useDebounce } from '@/hooks'
import { CircleAlert } from 'lucide-react'
import { DiscountType } from '@/types/discount.type'
import { setVariant } from '@/features/admin/create_product.slice'
import { useGetAllDiscounts } from '@/hooks/querys/discount.query'

const initialProductVariantInput: ProductVariantRequestType = {
  productVariantId: Date.now(),
  slug: '',
  productId: -1,
  discountId: -1,
  variantName: '',
  color: '',
  storage: '',
  importPrice: 0,
  price: 0,
  stock: 1
}

const AddVariant = () => {
  // start query
  const { data: discounts, error: discountError, isLoading: isDiscountLoading } = useGetAllDiscounts()
  // end query
  const [colorItems, setColorItems] = React.useState<string[]>(['Đỏ', 'Xanh', 'Vàng', 'Trắng', 'Đen'])
  const [storageItems, setStorageItems] = React.useState<string[]>(['64 GB', '128 GB', '256 GB', '512 GB'])

  const [newDiscount, setNewDiscount] = useState<number>(0)
  const [newStorage, setNewStorage] = useState<string>('')
  const [newColor, setNewColor] = useState<string>('')
  const inputColorRef = useRef<InputRef>(null)
  const inputStorageRef = useRef<InputRef>(null)
  const inputDiscountRef = useRef<InputRef>(null)

  const { product, variant } = useAppSelector((state) => state.createProduct)

  const [productVariantInput, setProductVariantInput] = useState<ProductVariantRequestType>(
    variant || initialProductVariantInput
  )

  const debouncedQuery = useDebounce<ProductVariantRequestType>(productVariantInput, 500)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setProductVariantInput(variant || initialProductVariantInput)
  }, [variant])

  useEffect(() => {
    dispatch(setVariant(debouncedQuery))
  }, [debouncedQuery, dispatch])

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
    setColorItems((prevColorItems) => [...prevColorItems, newColor])
    setNewColor('')
    setTimeout(() => {
      inputColorRef.current?.focus()
    }, 0)
  }

  const onNameStorageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewStorage(event.target.value || '')
  }

  const addStorageItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault()
    if (newStorage === '' || newStorage === '0') {
      toast.error('Dung lượng không được để trống')
      return
    }
    if (storageItems.includes(newStorage)) {
      toast.error('Dung lượng đã tồn tại')
      return
    }
    setStorageItems([...storageItems, newStorage])
    setNewStorage('0')
    setTimeout(() => {
      inputStorageRef.current?.focus()
    }, 0)
  }

  const onNameDiscountChange: InputNumberProps['onChange'] = (value) => {
    setNewDiscount(value as number)
  }

  const addDiscountItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault()
    if (discounts?.find((item) => item.percentage === newDiscount)) {
      toast.error('Giảm giá đã tồn tại')
      return
    }
    // const createDiscount: DiscountType = {
    //   discountId: discountItems.length,
    //   percentage: newDiscount,
    //   isActive: true
    // }
    // setDiscountItems([...discountItems, createDiscount])
    setNewDiscount(0)
    setTimeout(() => {
      inputDiscountRef.current?.focus()
    }, 0)
  }

  return (
    <div className='space-y-3'>
      <div className='uppercase'>
        Phiên bản sản phẩm <span className='normal-case'>(Tạo ít nhất 1 phiên bản)</span>
      </div>

      <div className='p-5 space-y-6 bg-white border border-gray-300 rounded-lg'>
        <div className='flex items-center justify-between'>
          <div className='font-semibold'>Thông tin phiên bản</div>
          <button className='text-xs border border-gray-100 btn btn-light'>Clear</button>
        </div>
        <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
          <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Tên phiên bản</div>
          <Input
            disabled={!product?.name}
            value={productVariantInput.variantName}
            prefix={
              product?.name ? (
                <span className='px-2 mr-2 bg-gray-200 rounded'>{product.name}</span>
              ) : (
                <Tooltip title='Vui lòng nhập tên sản phẩm trước'>
                  <CircleAlert className='text-primary' size={16} />
                </Tooltip>
              )
            }
            variant='borderless'
            placeholder='Tên phân biệt giữa các phiên bản'
            allowClear
            className='w-full text-base'
            onChange={(e) =>
              setProductVariantInput({
                ...productVariantInput,
                variantName: e.target.value
              })
            }
          />
        </div>

        <div className='flex flex-col sm:grid sm:grid-cols-2 gap-x-3 gap-y-5'>
          <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
            <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Màu sắc</div>
            <Select
              showSearch
              value={productVariantInput.color || undefined}
              placeholder={'Chọn màu sắc'}
              variant='borderless'
              options={colorItems.map((color) => ({ value: color, label: color }))}
              className='text-base'
              onChange={(value) => setProductVariantInput({ ...productVariantInput, color: value as string })}
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
            <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Dung lượng bộ nhớ</div>
            <Select
              showSearch
              value={productVariantInput.storage || undefined}
              placeholder={'Chọn dung lượng'}
              variant='borderless'
              options={storageItems.map((item) => ({ value: item, label: item }))}
              className='text-base'
              onChange={(value) => setProductVariantInput({ ...productVariantInput, storage: value })}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: '8px 0' }} />
                  <div className='flex items-center gap-x-3'>
                    <Input
                      placeholder='Nhập dung lượng. VD: "8 GB | 512 GB"'
                      value={newStorage}
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
              value={productVariantInput.importPrice}
              onChange={(value) => setProductVariantInput({ ...productVariantInput, importPrice: value || 0 })}
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
              value={productVariantInput.price}
              onChange={(value) => setProductVariantInput({ ...productVariantInput, price: value || 0 })}
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
              value={productVariantInput.stock}
              onChange={(value) => setProductVariantInput({ ...productVariantInput, stock: value || 1 })}
              min={1}
              max={99999999}
              variant='borderless'
              placeholder='Nhập số lượng tồn kho'
              className='w-full text-base'
            />
          </div>
          <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
            <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Giảm giá sản phẩm</div>
            <Select
              showSearch
              value={
                productVariantInput.discountId && productVariantInput.discountId >= 0
                  ? productVariantInput.discountId
                  : undefined
              }
              onChange={(value) => setProductVariantInput({ ...productVariantInput, discountId: value as number })}
              placeholder={'Chọn giảm giá'}
              variant='borderless'
              options={discounts?.map((item) => ({ value: item.discountId, label: item.percentage + '%' }))}
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

      <AddVariantImage />
      <AddSpecification />
    </div>
  )
}

export default AddVariant
