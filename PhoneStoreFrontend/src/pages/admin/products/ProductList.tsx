import { ProductResponse } from '@/types/product.type'
import { Card, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { Link } from 'react-router-dom'
import { useGetAllProducts } from '@/hooks/querys/product.query'

const columns: ColumnsType<ProductResponse> = [
  {
    title: 'Mã sản phẩm',
    dataIndex: 'productId',
    key: 'productId'
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Danh mục',
    dataIndex: ['category', 'name'],
    key: 'category'
  },
  {
    title: 'Thương hiệu',
    dataIndex: ['brand', 'name'],
    key: 'brand'
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, record) => (
      <Link to={`/admin/products/details/${record.productId}`} className='text-xs btn btn-option'>
        Xem biến thể
      </Link>
    )
  }
]

export default function ProductList() {
  const { data: products } = useGetAllProducts()
  return (
    <Card
      title='Danh Sách Sản Phẩm'
      extra={
        <Link to='/admin/products/add' className='btn btn-primary'>
          Thêm Sản Phẩm
        </Link>
      }
    >
      <Table dataSource={products} columns={columns} rowKey='productId' bordered pagination={{ pageSize: 10 }} />
    </Card>
  )
}
