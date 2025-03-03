import { ConfigProvider, GetProp, GetProps, Image, Input, Modal, Rate, Upload, UploadFile, UploadProps } from 'antd'
import { FC, useState } from 'react'
import { MyDivider } from '../dividers'
import { ProductVariantType } from '@/types/product_variant.type'
import { PlusOutlined, StarFilled } from '@ant-design/icons'
import TextArea from 'antd/es/input/TextArea'
import { toast } from 'react-toastify'
import { useCreateReview } from '@/hooks/querys/review.query'
import { LoadingItem } from '../loadings'
import { useQueryClient } from '@tanstack/react-query'
import { ReviewRequestType } from '@/types/review.type'

interface CreateReviewModalProps {
  isOpen: boolean
  closeModal: () => void
  productVariant: ProductVariantType
}

const validateReview = (rate: number, comment: string): boolean => {
  if (rate === 0) {
    toast.error('Vui lòng chọn số sao đánh giá')
    return false
  }
  if (comment.length < 15) {
    toast.error('Vui lòng nhập cảm nhận dài hơn')
    return false
  }

  return true
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

const descriptions = ['Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời']

const CreateReviewModal: FC<CreateReviewModalProps> = ({ isOpen, closeModal, productVariant }) => {
  const queryClient = useQueryClient()
  const [rate, setRate] = useState(5)
  const [comment, setComment] = useState('')
  const [images, setImages] = useState<File[]>([]) // Lưu file ảnh gốc

  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([]) // Lưu danh sách hiển thị ảnh

  const { mutate: createReview, isPending } = useCreateReview()

  // Xử lý xem trước ảnh
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  // Xử lý khi người dùng chọn ảnh
  const handleUpload = async (file: FileType) => {
    const base64 = await getBase64(file)
    setImages((prev) => [...prev, file]) // Lưu file vào state
    setFileList((prev) => [...prev, { uid: file.uid, name: file.name, url: base64, status: 'done' }])
    return false // Ngăn antd upload ảnh mặc định
  }

  // Xử lý xóa ảnh
  const handleRemove = (file: UploadFile) => {
    setFileList(fileList.filter((item) => item.uid !== file.uid))
    setImages(images.filter((img) => img.name !== file.name))
  }

  // Nút upload
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type='button'>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  const handleCreateReview = () => {
    if (!validateReview(rate, comment)) return
    const reviewReq: ReviewRequestType = {
      rating: rate,
      comment: comment,
      productVariantId: productVariant.productVariantId,
      images: images
    }
    createReview(reviewReq, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['getReview', productVariant.productVariantId]
        })
        setComment('')
        setRate(5)
        setImages([])
        setFileList([])

        closeModal()
        toast.success('Đánh giá của bạn đã được gửi')
      },
      onError: () => {
        toast.error('Lỗi gửi đánh giá')
      }
    })
  }

  return (
    <Modal
      open={isOpen}
      className={isPending ? 'animate-pulse' : ''}
      onCancel={closeModal}
      title={<div className='text-lg font-semibold text-center'>Đánh giá & nhận xét</div>}
      width={600}
      footer={
        <button
          disabled={isPending}
          onClick={handleCreateReview}
          className='w-full mt-3 rounded-md btn btn-danger disabled:opacity-50'
        >
          {isPending ? (
            <>
              'Đang gửi...' <LoadingItem />
            </>
          ) : (
            'Gửi đánh giá'
          )}
        </button>
      }
      style={{ top: 20 }}
    >
      <div className='flex flex-col text-base gap-y-3'>
        <MyDivider className='!bg-gray-200 !h-[0.5px] mb-3' />

        <h1 className='text-base font-semibold'>Đánh giá chung</h1>
        <div className=''>
          <ConfigProvider
            theme={{
              token: {
                marginXS: 10
              }
            }}
          >
            <div className='flex flex-col items-center'>
              <Rate
                value={rate}
                className='flex justify-around w-full text-2xl'
                onChange={(value) => setRate(value)}
                allowClear={false}
                character={({ index = 0 }) => (
                  <div className='flex flex-col items-center gap-y-1'>
                    <StarFilled />
                    <span className='text-xs text-black'>{descriptions[index]}</span>
                  </div>
                )}
              />
            </div>
          </ConfigProvider>
        </div>

        <h1 className='mt-2 text-base font-semibold'>Cảm nhận</h1>
        <TextArea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className='py-1.5 !outline-none focus:!outline-none !border-gray-200 hover:!border-gray-300  focus:!shadow-none'
          rows={1}
          autoSize={{ minRows: 5, maxRows: 8 }}
          placeholder='Xin mời chia sẻ cảm nhận của bạn về sản phẩm (tối thiểu 15 ký tự)'
        />

        <h1 className='mt-2 text-base font-semibold'>Hình ảnh</h1>
        <>
          <Upload
            listType='picture-card'
            fileList={fileList}
            accept='image/*'
            onPreview={handlePreview}
            beforeUpload={handleUpload}
            onRemove={handleRemove}
          >
            {fileList.length >= 8 ? null : uploadButton}
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
        </>
      </div>
    </Modal>
  )
}

export default CreateReviewModal
