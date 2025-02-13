import { useUpdateCategory } from '@/hooks/querys/category.query'
import { CategoryRequestType, CategoryType } from '@/types/category.type'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import BaseModal from '../components/BaseModal'
import FileInputField from '../components/FileInputField'
import InputField from '../components/InputField'
import SubmitButton from '../components/SubmitButton'
import TextareaField from '../components/TextareaField'
import { BrandType } from '@/types/brand.type'
import { useUpdateBrand } from '@/hooks/querys/brand.query'

interface EditBrandModalProps {
  isOpen: boolean
  onClose: () => void
  brand?: BrandType
}

const EditBrandModal: React.FC<EditBrandModalProps> = ({ isOpen, onClose, brand }) => {
  const { register, handleSubmit, reset, setValue } = useForm<CategoryRequestType>()
  const updateBrandMutation = useUpdateBrand()

  useEffect(() => {
    if (brand) {
      setValue('id', brand.brandId)
      setValue('name', brand.name)
      setValue('description', brand.description || '')
    }
  }, [brand, setValue])

  const onSubmit = (data: CategoryRequestType) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description || '')

    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]) // Lấy file đầu tiên
    }

    if (brand?.brandId) {
      updateBrandMutation.mutate(
        { id: brand.brandId, data: formData },
        {
          onSuccess: () => {
            reset() // Reset form
            onClose() // Đóng modal
          }
        }
      )
    }
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      {/* Title Section */}
      <div className='border-b p-4 '>
        <h2 className='text-2xl font-bold text-center capitalize'>Chỉnh Sửa Thương Hiệu</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='p-4'>
          <InputField {...register('id')} label='ID' id='id' name='id' type='text' disabled />

          {/* Tên Category */}
          <InputField
            {...register('name', { required: true })}
            label='Tên thương hiệu'
            id='name'
            name='name'
            type='text'
          />

          {/* Mô tả */}
          <TextareaField {...register('description')} label='Mô tả' id='description' name='description' rows={3} />

          {/* Hình ảnh */}
          <FileInputField {...register('image')} label='Hình ảnh' id='image' name='image' accept='image/*' />
        </div>
        <div className='flex justify-end px-4 py-3 text-right border-t'>
          <SubmitButton
            text={updateBrandMutation.isPending ? 'Đang xử lý...' : 'Lưu thay đổi'}
            disabled={updateBrandMutation.isPending}
          />
        </div>
      </form>
    </BaseModal>
  )
}

export default EditBrandModal
