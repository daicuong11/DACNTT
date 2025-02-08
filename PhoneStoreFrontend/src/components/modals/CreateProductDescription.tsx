import { Modal } from 'antd'
import React, { FC } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { useEffect, useState } from 'react'

interface CreateProductDescriptionProps {
  isOpen: boolean
  closeModal: () => void
  value: any
  onChange: (value: any) => void
}

const CreateProductDescription: FC<CreateProductDescriptionProps> = ({ isOpen, closeModal, value, onChange }) => {
  const [modalWidth, setModalWidth] = useState<string | number>('50%')

  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth < 576)
        setModalWidth('90%') // xs
      else if (window.innerWidth < 768)
        setModalWidth('80%') // sm
      else if (window.innerWidth < 992)
        setModalWidth('70%') // md
      else if (window.innerWidth < 1200)
        setModalWidth('60%') // lg
      else if (window.innerWidth < 1600)
        setModalWidth('50%') // xl
      else setModalWidth('40%') // xxl
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  return (
    <Modal
      centered
      open={isOpen}
      onCancel={closeModal}
      title={<div className='text-lg font-semibold text-center'>Mô tả sản phẩm</div>}
      width={modalWidth}
      footer={null}
    >
      <div className='flex flex-col w-full gap-y-5'>
        <Editor
          apiKey={import.meta.env.VITE_API_KEY_TINY}
          init={{
            plugins: ['link', 'lists', 'image', 'table', 'media', 'codesample', 'autolink', 'wordcount'],
            toolbar:
              'undo redo | bold italic underline strikethrough | numlist bullist blockquote | link image media table codesample | removeformat',
            menubar: false, // Ẩn menu bar để đơn giản hơn
            statusbar: false, // Ẩn thanh trạng thái ở dưới cùng
            file_picker_types: 'image',
            automatic_uploads: false,
            images_dataimg_filter: (img: any) => img.src.startsWith('data:'), // Chỉ dùng ảnh base64

            file_picker_callback: (callback, value, meta) => {
              if (meta.filetype === 'image') {
                const input = document.createElement('input')
                input.setAttribute('type', 'file')
                input.setAttribute('accept', 'image/*')

                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0]
                  if (file) {
                    const reader = new FileReader()
                    reader.onload = (event) => {
                      callback(event.target?.result as string) // Chèn ảnh base64 vào TinyMCE
                    }
                    reader.readAsDataURL(file)
                  }
                }
                input.click()
              }
            }
          }}
          onEditorChange={(newValue) => onChange(newValue)}
        />

        <button onClick={closeModal} className='btn btn-danger'>
          Soạn xong
        </button>
      </div>
    </Modal>
  )
}

export default CreateProductDescription
