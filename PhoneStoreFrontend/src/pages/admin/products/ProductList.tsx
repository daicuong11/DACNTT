import { useGetProducts } from '@/hooks/querys/product.query'
import { ProductType } from '@/types/product.type'
import { Button, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { Link, Links, useNavigate } from 'react-router-dom'
import Card from '../components/Card'

const columns: ColumnsType<ProductType> = [
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
      <Link to={`/admin/products/details/${record.productId}`} className='btn btn-danger'>
        Xem biến thể
      </Link>
    )
  }
]

export default function ProductList() {
  const { data: products } = useGetProducts()
  console.log(products)
  return (
    <Card
      title='Danh Sách Sản Phẩm'
      button={
        <Link to='/admin/products/add' className='btn btn-primary'>
          Thêm Sản Phẩm
        </Link>
      }
    >
      <Table dataSource={products} columns={columns} rowKey='productId' bordered pagination={{ pageSize: 10 }} />
    </Card>
  )
}
