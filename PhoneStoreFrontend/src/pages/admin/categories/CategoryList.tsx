import { useGetCategories } from '@/hooks/querys/category.query'
import { CategoryRequestType, CategoryType } from '@/types/category.type'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Image, Popconfirm, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useState } from 'react'
import Card from '../components/Card'
import AddCategoryModal from './AddCategoryModal'
import EditCategoryModal from './EditCategoryModal'

export default function CategoryList() {
  const { data, isLoading, isError } = useGetCategories()

  const columns: ColumnsType<CategoryType> = [
    {
      title: 'ID',
      dataIndex: 'categoryId',
      key: 'categoryId'
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Ảnh',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (imageUrl: string) => <Image width={50} src={imageUrl} alt='Category Image' />
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type='link' icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Popconfirm title='Bạn có chắc chắn muốn xóa?'>
            <Button type='link' danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </>
      )
    }
  ]

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModal, setIsEditModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null)

  const handleOpen = () => {
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }

  const handleEdit = (category: CategoryType) => {
    setSelectedCategory(category)
    setIsEditModal(true)
  }

  const handleCloseEdit = () => {
    setIsEditModal(false)
    setSelectedCategory(null)
  }

  return (
    <>
      <AddCategoryModal isOpen={isModalOpen} onClose={handleClose} />
      <EditCategoryModal isOpen={isEditModal} onClose={handleCloseEdit} category={selectedCategory || undefined} />
      <Card
        title='Danh Sách Danh Mục'
        button={
          <div onClick={handleOpen} className='btn btn-primary capitalize'>
            Thêm Danh Mục
          </div>
        }
      >
        <Table
          dataSource={data?.data || []}
          columns={columns}
          rowKey='categoryId'
          bordered
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </>
  )
}
