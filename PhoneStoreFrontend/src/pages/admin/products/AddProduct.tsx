import React, { useEffect, useRef, useState } from 'react'
import Card from '../components/Card'
import { Input, Select, UploadFile } from 'antd'
import { BadgePlus, Pencil } from 'lucide-react'
import { useAppDispatch, useAppSelector, useDebounce, useModal } from '@/hooks'
import CreateProductDescription from '@/components/modals/CreateProductDescription'
import ProductCardPreview from '@/components/items/ProductCardPreview'
import AddVariant from './AddVariant'
import { ProductRequestType } from '@/types/product.type'
import {
  finishAVariant,
  ListProductVariantRequestType,
  openAVariant,
  setListProductVariant,
  setProduct
} from '@/features/admin/create_product.slice'
import { ProductVariantRequestType } from '@/types/product_variant.type'
import { ProductImageRequestType } from '@/types/product_imge.type'
import { SpecificationType } from '@/types/specification.type'

const exampleCategory = [
  {
    categoryId: 1,
    name: 'Điện thoại'
  },
  {
    categoryId: 2,
    name: 'Laptop'
  },
  {
    categoryId: 3,
    name: 'Tivi'
  },
  {
    categoryId: 4,
    name: 'Đồng hồ'
  }
]

const findCategoryBycategoryId = (id: number) => {
  return exampleCategory.find((category) => category.categoryId === id) || null
}

const exampleBrand = [
  {
    brandId: 1,
    name: 'Apple'
  },
  {
    brandId: 2,
    name: 'Samsung'
  },
  {
    brandId: 3,
    name: 'Xiaomi'
  },
  {
    brandId: 4,
    name: 'Huawei'
  }
]

const findBrandById = (id: number) => {
  return exampleBrand.find((brand) => brand.brandId === id) || null
}

const validateProduct = (product: ProductRequestType | null) => {
  if (!product) return false
  return product.name && product.categoryId >= 0 && product.brandId >= 0
}

import { toast } from 'react-toastify'
import classNames from 'classnames'

const validateProductVariant = ({
  product,
  variant,
  mainImage,
  images,
  specifications
}: {
  product: ProductRequestType | null
  variant: ProductVariantRequestType | null
  mainImage: UploadFile | null
  images: UploadFile[]
  specifications: SpecificationType[]
}) => {
  if (!product) {
    toast.error('Sản phẩm không hợp lệ!')
    return false
  }
  if (!product.name) {
    toast.error('Tên sản phẩm không được để trống!')
    return false
  }
  if (product.categoryId < 0) {
    toast.error('Danh mục sản phẩm không hợp lệ!')
    return false
  }
  if (product.brandId < 0) {
    toast.error('Thương hiệu sản phẩm không hợp lệ!')
    return false
  }
  if (!variant) {
    toast.error('Biến thể sản phẩm không hợp lệ!')
    return false
  }
  if (!mainImage) {
    toast.error('Ảnh chính của sản phẩm không được để trống!')
    return false
  }
  if (images.length === 0) {
    toast.error('Sản phẩm phải có ít nhất một ảnh phụ!')
    return false
  }
  if (specifications.length === 0) {
    toast.error('Sản phẩm phải có ít nhất một thông số kỹ thuật!')
    return false
  }
  if (!variant.variantName) {
    toast.error('Tên phiên bản không được để trống!')
    return false
  }
  if (!variant.color) {
    toast.error('Màu sắc không được để trống!')
    return false
  }
  if (!variant.storage) {
    toast.error('Dung lượng không được để trống!')
    return false
  }
  if (!variant.importPrice) {
    toast.error('Giá nhập không được để trống!')
    return false
  }
  if (!variant.price) {
    toast.error('Giá bán không được để trống!')
    return false
  }
  if (!variant.stock) {
    toast.error('Số lượng tồn kho không được để trống!')
    return false
  }

  return true
}

const convertUploadFileToProductImage = (uploadFile: UploadFile, isMain: boolean = false): ProductImageRequestType => {
  return {
    productVariantId: -1,
    imageUrl: uploadFile.url || '',
    isMainImage: isMain
  }
}

const convertUploadFilesToProductImages = (
  uploadFiles: UploadFile[],
  isMain: boolean = false
): ProductImageRequestType[] => {
  return uploadFiles.map((uploadFile) => convertUploadFileToProductImage(uploadFile, isMain))
}

const initialProductInput: ProductRequestType = {
  name: '',
  categoryId: -1,
  brandId: -1,
  description: ''
}

const AddProduct = () => {
  const useModalCreateDescription = useModal()
  const createProductSlice = useAppSelector((state) => state.createProduct)
  const [productInput, setProductInput] = useState<ProductRequestType>(
    createProductSlice.product || initialProductInput
  )
  const [lstProductVariant, setLstProductVariant] = useState<ListProductVariantRequestType[]>(
    createProductSlice.listProductVariant
  )

  const [variantSelected, setVariantSelected] = useState<ListProductVariantRequestType | null>(null)

  const debouncedQuery = useDebounce<ProductRequestType>(productInput, 1000)
  const dispatch = useAppDispatch()

  const variantRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    dispatch(setListProductVariant(lstProductVariant))
  }, [lstProductVariant])

  useEffect(() => {
    if (createProductSlice.product !== productInput) {
      setProductInput(createProductSlice.product || initialProductInput)
    }
  }, [createProductSlice.product])

  useEffect(() => {
    dispatch(setProduct(productInput))
  }, [debouncedQuery, dispatch])

  const handleSelectedVariant = (variant: ListProductVariantRequestType) => {
    setVariantSelected(variant)
    dispatch(openAVariant(variant))
  }

  const handleOpenNewVariantForm = () => {
    setVariantSelected(null)
    dispatch(finishAVariant())
  }

  const handleAddVariant = () => {
    const checkInfo = validateProductVariant({
      product: createProductSlice.product,
      variant: createProductSlice.variant,
      mainImage: createProductSlice.mainImage,
      images: createProductSlice.images,
      specifications: createProductSlice.specifications
    })

    if (checkInfo) {
      const newVariant: ListProductVariantRequestType = {
        productVariant: createProductSlice.variant!,
        listImage: [
          convertUploadFileToProductImage(createProductSlice.mainImage!, true),
          ...convertUploadFilesToProductImages(createProductSlice.images)
        ],
        specification: createProductSlice.specifications
      }
      if (variantSelected) {
        //update variant of list
        console.log('update variant with id:', variantSelected.productVariant.productVariantId)
        const newLstProductVariant = lstProductVariant.map((variant) => {
          if (variant.productVariant.productVariantId === variantSelected.productVariant.productVariantId) {
            return newVariant
          }
          return variant
        })
        setLstProductVariant(newLstProductVariant)
        toast('Cập nhật mẫu sản phẩm thành công!')
      } else {
        setLstProductVariant((pre) => {
          return [...pre, newVariant]
        })
        dispatch(finishAVariant())
        toast('Thêm mẫu sản phẩm thành công!')
      }
      if (variantRef.current) {
        variantRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }
    }
  }

  return (
    <Card
      title='Thêm Sản Phẩm'
      button={
        <button
          disabled
          className='disabled:cursor-not-allowed btn btn-primary disabled:opacity-60 disabled:hover:bg-primary disabled:pointer-events-none'
        >
          Lưu lại
        </button>
      }
    >
      <div className='flex flex-col transition-all gap-y-6'>
        <div className='space-y-3'>
          <div className='uppercase'>Thông tin sản phẩm</div>
          <div className='p-5 space-y-6 bg-white border border-gray-300 rounded-lg'>
            <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
              <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Tên sản phẩm</div>
              <Input
                value={productInput.name}
                onChange={(e) => setProductInput({ ...productInput, name: e.target.value })}
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
                  value={findCategoryBycategoryId(productInput.categoryId)?.categoryId}
                  onChange={(value) => setProductInput({ ...productInput, categoryId: value as number })}
                  placeholder={'Chọn danh mục'}
                  variant='borderless'
                  options={exampleCategory.map((category) => ({ value: category.categoryId, label: category.name }))}
                  className='text-base'
                />
              </div>
              <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
                <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Thương hiệu</div>
                <Select
                  showSearch
                  value={findBrandById(productInput.brandId)?.brandId}
                  onChange={(value) => setProductInput({ ...productInput, brandId: value as number })}
                  placeholder={'Chọn thương hiệu'}
                  variant='borderless'
                  options={exampleBrand.map((brand) => ({ value: brand.brandId, label: brand.name }))}
                  className='text-base'
                />
              </div>
            </div>

            <div className='flex flex-col gap-y-2.5 transition-all group'>
              <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Mô tả sản phẩm</div>
              <div className='flex items-center gap-x-5'>
                <div
                  dangerouslySetInnerHTML={{ __html: productInput.description || 'Chưa có mô tả' }}
                  className='line-clamp-1 w-52'
                ></div>
                <CreateProductDescription
                  value={productInput.description}
                  onChange={(value) => setProductInput({ ...productInput, description: value })}
                  isOpen={useModalCreateDescription.isOpen}
                  closeModal={useModalCreateDescription.closeModal}
                />
                <button
                  onClick={() => useModalCreateDescription.openModal()}
                  className='text-sm border border-gray-100 btn btn-light w-44'
                >
                  <Pencil size={16} strokeWidth={1.6} />
                  {productInput.description ? 'Chỉnh sửa' : 'Thêm mô tả'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={variantRef}
          className={classNames('space-y-3 ', {
            hidden: !validateProduct(productInput) || createProductSlice.listProductVariant.length === 0,
            block: createProductSlice.listProductVariant.length > 0
          })}
        >
          <div className='uppercase'>Danh sách phiên bản sản phẩm</div>
          <div className='p-5 space-y-6 bg-white border border-gray-300 rounded-lg'>
            <div className='flex flex-wrap gap-3'>
              {createProductSlice.listProductVariant.map((variant, index) => (
                <ProductCardPreview
                  onClick={() => handleSelectedVariant(variant)}
                  key={index}
                  productVariant={variant.productVariant}
                  className={classNames({
                    '!border-primary !border': variantSelected === variant
                  })}
                />
              ))}
              <div
                onClick={handleOpenNewVariantForm}
                className='h-[220px] border-dashed min-w-[220px] w-[224px] hover:border-primary transition-all cursor-pointer rounded-xl bg-white p-[10px] flex flex-col border border-gray-500'
              >
                <div className='flex-[5] flex items-center justify-center'>
                  <span className='w-[80px] h-[80px] mt-3'>
                    <BadgePlus size={80} />
                  </span>
                </div>
                <div className='flex-[6] flex flex-col'>
                  <div className='flex flex-col items-center justify-center gap-3 mt-2'>
                    <h2 className='text-sm font-bold text-black/80'>Thêm một mẫu mới</h2>
                    <div className='text-xs text-center text-gray-500'>
                      Mẫu mới sử dụng một số thông tin của mẫu đầu tiên
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {validateProduct(productInput) && <AddVariant />}

        {validateProduct(productInput) && (
          <button onClick={handleAddVariant} className='w-1/3 mx-auto btn btn-danger'>
            {variantSelected ? 'Cập nhật phiên bản' : 'Thêm phiên bản'}
          </button>
        )}
      </div>
    </Card>
  )
}

export default AddProduct
