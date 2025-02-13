import { useAddCategory } from '@/hooks/querys/category.query'
import { CategoryRequestType } from '@/types/category.type'
import React from 'react'
import { useForm } from 'react-hook-form'
import BaseModal from '../components/BaseModal'
import FileInputField from '../components/FileInputField'
import InputField from '../components/InputField'
import SubmitButton from '../components/SubmitButton'
import TextareaField from '../components/TextareaField'

interface AddCategoryModalProps {
  isOpen: boolean
  onClose: () => void
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ isOpen, onClose }) => {
  const { register, handleSubmit, reset } = useForm<CategoryRequestType>()
  const addCategoryMutation = useAddCategory()

  const onSubmit = (data: CategoryRequestType) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description || '')

    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]) // Lấy file đầu tiên
    }

    addCategoryMutation.mutate(formData, {
      onSuccess: () => {
        reset() // Reset form
        onClose() // Đóng modal
      }
    })
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      {/* Title Section */}
      <div className='border-b p-4 '>
        <h2 className='text-2xl font-bold text-center capitalize'>Thêm Danh Mục</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='p-4'>
          {/* Tên Category */}
          <InputField
            {...register('name', { required: true })}
            label='Tên danh mục'
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
            text={addCategoryMutation.isPending ? 'Đang xử lý...' : 'Thêm'}
            disabled={addCategoryMutation.isPending}
          />
        </div>
      </form>
    </BaseModal>
  )
}

export default AddCategoryModal
