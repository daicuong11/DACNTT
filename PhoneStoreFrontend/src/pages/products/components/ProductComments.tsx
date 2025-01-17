import React, { FC } from 'react'
import { ContainerPanel, MyDivider } from '../../../components'
import { ProductType } from '../../../types/product.type'
import TextArea from 'antd/es/input/TextArea'
import { robot_img } from '../../../assets/images'
import { SendHorizonal } from 'lucide-react'
import CommentItem, { CommentType } from './CommentItem'

const commentsEx: CommentType[] = [
  {
    id: 1,
    author: 'Đạo Thanh Hưng',
    content: 'Sản phẩm còn không ạ?',
    time: '1 phút trước',
    replies: [
      {
        id: 2,
        author: 'Nguyễn Văn A',
        content: 'Dạ sản phẩm còn nhé bạn.',
        time: '30 giây trước',
        replies: []
      }
    ]
  }
]

interface ProductCommentsProps {
  product?: ProductType
}

const ProductComments: FC<ProductCommentsProps> = ({ product }) => {
  return (
    <ContainerPanel className='' titleClassName='text-xl' title='Hỏi và đáp'>
      <div className='relative flex flex-1 w-full p-2 border border-gray-200 rounded-lg shadow-md pb-11'>
        <div className='flex items-start justify-center px-6 pt-6'>
          <img className='w-[60px] h-[60px] object-contain' src={robot_img} />
        </div>
        <TextArea
          className='!border-none !outline-none focus:!outline-none focus:!border-none focus:!shadow-none'
          rows={5}
          autoSize={{ minRows: 3, maxRows: 20 }}
          placeholder='Xin mời để lại câu hỏi, chúng tôi sẽ trả lời lại trong 1h, các câu hỏi sau 22h-8h sẽ được trả lời vào sáng hôm sau'
        />
        <button className='absolute flex items-center justify-center p-2 rounded-full bottom-1.5 right-4 hover:bg-primary/15 text-primary'>
          <SendHorizonal size={20} />
        </button>
      </div>
      <MyDivider />
      <div className='flex flex-col text-black gap-y-2'>
        {commentsEx.map((comment, index) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </ContainerPanel>
  )
}

export default ProductComments
