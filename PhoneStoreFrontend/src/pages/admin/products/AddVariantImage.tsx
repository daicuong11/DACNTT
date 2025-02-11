import { PlusOutlined } from '@ant-design/icons'
import { GetProp, Image, Upload, UploadFile, UploadProps } from 'antd'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { clearMainImage, setImages, setMainImage } from '@/features/admin/create_product.slice'
import { useState } from 'react'

const uploadButton = (
  <button style={{ border: 0, background: 'none' }} type='button'>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Tải lên</div>
  </button>
)

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

const AddVariantImage = () => {
  const { mainImage, images } = useAppSelector((state) => state.createProduct)
  const dispatch = useAppDispatch()
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const handleChangeFileMain: UploadProps['onChange'] = (info) => {
    let newFile = { ...info.file }

    if (newFile.status === 'removed') return

    if (newFile.response) {
      newFile.url = newFile.response.secureUrl
    }

    dispatch(setMainImage(newFile))
  }

  const handleChangeFileList: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList].slice(-11)

    newFileList = newFileList.map((file) => ({
      ...file,
      url: file.response ? file.response.secureUrl : file.url
    }))

    dispatch(setImages(newFileList))
  }

  return (
    <div className='p-5 space-y-6 bg-white border border-gray-300 rounded-lg'>
      <div className='font-semibold'>Hình ảnh</div>

      <div className='flex flex-col gap-y-3'>
        <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Ảnh chính</div>
        <Upload
          action='https://localhost:7130/api/cloudinary/upload'
          listType='picture-card'
          fileList={mainImage ? [{ ...mainImage }] : []}
          accept='image/*'
          onPreview={handlePreview}
          onChange={handleChangeFileMain}
          customRequest={(option) => {
            const formData = new FormData()
            formData.append('file', option.file)
            formData.append('folder', 'Product Images')

            fetch('https://localhost:7130/api/cloudinary/upload', {
              method: 'POST',
              body: formData
            })
              .then((response) => response.json())
              .then((data) => {
                option.onSuccess && option.onSuccess(data, option.file)
              })
              .catch((error) => {
                option.onError && option.onError(error)
              })
          }}
          onRemove={() => {
            dispatch(clearMainImage())
          }}
        >
          {!mainImage && uploadButton}
        </Upload>
      </div>

      <div className='flex flex-col gap-y-3'>
        <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Danh sách ảnh phụ</div>
        <Upload
          action='https://localhost:7130/api/cloudinary/upload'
          listType='picture-card'
          multiple
          accept='image/*'
          fileList={images.map((img) => ({ ...img }))}
          onPreview={handlePreview}
          onChange={handleChangeFileList}
          customRequest={(option) => {
            const formData = new FormData()
            formData.append('file', option.file)
            formData.append('folder', 'Product Images')

            fetch('https://localhost:7130/api/cloudinary/upload', {
              method: 'POST',
              body: formData
            })
              .then((response) => response.json())
              .then((data) => {
                option.onSuccess && option.onSuccess(data, option.file)
              })
              .catch((error) => {
                option.onError && option.onError(error)
              })
          }}
          onRemove={(file) => {
            const newFileList = images.filter((img) => img.uid !== file.uid)
            dispatch(setImages([...newFileList]))
          }}
        >
          {images.length >= 10 ? null : uploadButton}
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
  )
}

export default AddVariantImage
