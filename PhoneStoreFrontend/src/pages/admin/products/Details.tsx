import { useParams } from 'react-router-dom'
import Card from '../components/Card'
import { ProductVariantType } from '@/types/product_variant.type'
import Table, { ColumnsType } from 'antd/es/table'
import { ShowReturnBackLayout } from '@/layouts'
import { LoadingOpacity } from '@/components'
import { useGetVariantByProductId } from '@/hooks/querys/product_variant.query'
import { Image, Popconfirm } from 'antd'
import { CircleArrowDown, Edit } from 'lucide-react'

export default function Details() {
  const { productId } = useParams<{ productId: string }>()

  const handleStopSell = (variantId: number) => {
    console.log(variantId)
  }

  const { data, isLoading, error } = useGetVariantByProductId(Number(productId))

  if (isLoading) return <LoadingOpacity />

  const columns: ColumnsType<ProductVariantType> = [
    {
      title: 'ID',
      dataIndex: 'productVariantId',
      key: 'productVariantId'
    },
    {
      title: 'Ảnh',
      key: 'mainImage',
      render: (_, record) => {
        return <Image src={record.productImages[0].imageUrl} alt={record.product.name} style={{ width: 50 }} />
      }
    },
    {
      title: 'Tên phiên bản',
      key: 'name',
      render: (_, record) => {
        return <span>{record.product.name + ' ' + record.variantName}</span>
      }
    },
    {
      title: 'Màu',
      dataIndex: 'color',
      key: 'color'
    },
    {
      title: 'Lưu trữ',
      dataIndex: 'storage',
      key: 'storage'
    },
    {
      title: 'Giá nhập',
      dataIndex: 'importPrice',
      key: 'importPrice'
    },
    {
      title: 'Giảm giá',
      key: 'discount',
      render: (_, record) => {
        return <span>{record.discount ? record.discount.percentage + '%' : 'Không giảm'}</span>
      }
    },
    {
      title: 'Giá bán (Đã giảm)',
      key: 'price',
      render: (_, record) => {
        return <span>{record.price - (record.discount ? (record.price * record.discount.percentage) / 100 : 0)}</span>
      }
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => {
        return (
          <div className='flex flex-col gap-y-2'>
            <button className='btn btn-warning text-xs rounded-md'>
              <Edit size={16} strokeWidth={1.6} />
              Chỉnh sửa
            </button>

            <Popconfirm
              title='Ngưng bán sản phẩm'
              description={`Bạn có chắc chắn muốn ngưng bán sản phẩm ${record.product.name + ' ' + record.variantName}?`}
              onConfirm={() => handleStopSell(record.productVariantId)}
              okText='Ngưng bán'
              okButtonProps={{ className: 'text-white bg-blue-500', danger: true }}
              cancelText='Hủy'
              placement='left'
            >
              <button className='btn btn-danger text-xs rounded-md'>
                <CircleArrowDown size={16} strokeWidth={1.6} />
                Ngưng bán
              </button>
            </Popconfirm>
          </div>
        )
      }
    }
  ]

  return (
    <ShowReturnBackLayout hrefBack='/admin/products'>
      <Card title='Danh sách biến thể'>
        {error && <div>Lỗi</div>}
        {!error && data && (
          <Table dataSource={data} columns={columns} rowKey='productVariantId' bordered pagination={{ pageSize: 10 }} />
        )}
      </Card>
    </ShowReturnBackLayout>
  )
}
