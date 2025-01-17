import { UserOutlined } from '@ant-design/icons'
import { Avatar, ConfigProvider, Divider, Flex, Rate, Tag } from 'antd'
import { Clock } from 'lucide-react'

const ReviewComment = () => {
  const stars = 4 // Example star rating
  const dateTimeCreated = '2023-10-05 14:30' // Example date and time

  return (
    <div className='w-full p-4 mx-auto space-y-4 bg-white border border-gray-200 shadow-sm shadow-gray-200 rounded-xl'>
      <div className='flex items-center gap-x-3'>
        <div className='flex items-center space-x-4'>
          <Avatar size='default' icon={<UserOutlined />} />
          <div className='text-sm font-medium text-black'>John Doe</div>
        </div>
        <div className='flex items-center gap-1 text-xs text-gray-700'>
          <span>
            <Clock size={16} strokeWidth={1.6} />
          </span>
          {dateTimeCreated}
        </div>
      </div>
      <div className='flex items-center space-x-3'>
        <ConfigProvider
          theme={{
            token: {
              marginXS: 0
            }
          }}
        >
          <Rate value={stars} allowHalf disabled className='text-base' />
        </ConfigProvider>
        <Divider type='vertical' />
        <Flex gap='4px 0' wrap>
          <Tag color='default' className='text-gray-500'>
            Hiệu năng siêu mạnh mẽ
          </Tag>
          <Tag color='default' className='text-gray-500'>
            Thời lượng pin Cực khủng
          </Tag>
          <Tag color='default' className='text-gray-500'>
            Chất lượng camera Chụp đẹp, chuyên nghiệp
          </Tag>
        </Flex>
      </div>
      <div className='text-sm font-medium text-gray-500'>
        This is a sample review comment. The product is really good and I am very satisfied with the quality.
      </div>
      <div className='bg-slate-100 rounded-md py-1.5 px-3 text-sm font-medium'>
        Hỗ trợ kỹ thuật đã liên hệ hỗ trợ ngày 17/11/2024
      </div>
    </div>
  )
}

export default ReviewComment
