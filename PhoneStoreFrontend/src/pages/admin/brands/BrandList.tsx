import { useGetBrands } from '@/hooks/querys/brand.query'
import { BrandType } from '@/types/brand.type'
import { Button, Image, Popconfirm, Table , Card} from 'antd'
import { useState } from 'react'
import AddBrandModal from './AddBrandModal'
import EditBrandModal from './EditBrandModal'
import { ColumnsType } from 'antd/es/table'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

export default function BrandList() {
  const { data, isLoading, isError } = useGetBrands()

  const columns: ColumnsType<BrandType> = [
    {
      title: 'ID',
      dataIndex: 'brandId',
      key: 'brandId'
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
  const [selectedBrand, setSelectedBrand] = useState<BrandType | null>(null)

  const handleOpen = () => {
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }

  const handleEdit = (brand: BrandType) => {
    setSelectedBrand(brand)
    setIsEditModal(true)
  }

  const handleCloseEdit = () => {
    setIsEditModal(false)
    setSelectedBrand(null)
  }

  return (
    <>
      <AddBrandModal isOpen={isModalOpen} onClose={handleClose} />
      <EditBrandModal isOpen={isEditModal} onClose={handleCloseEdit} brand={selectedBrand || undefined} />

      <Card
        title='Danh Sách Thương Hiệu'
        extra={
          <div onClick={handleOpen} className='btn btn-primary capitalize'>
            Thêm Thương Hiệu
          </div>
        }
      >
        <Table
          dataSource={data?.data || []}
          columns={columns}
          rowKey='brandId'
          bordered
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </>
  )
}
