import { useParams } from 'react-router-dom'
import Card from '../components/Card'
import { ProductVariantType } from '@/types/product_variant.type'
import Table, { ColumnsType } from 'antd/es/table'
import { ShowReturnBackLayout } from '@/layouts'
import { LoadingOpacity } from '@/components'
import { useGetVariantByProductId } from '@/hooks/querys/product_variant.query'
import { Image, Popconfirm } from 'antd'
import { CircleArrowDown, Edit } from 'lucide-react'
import getPriceAfterDiscount from '@/utils/getPriceAfterDiscount'
import formatPrice from '@/utils/formatPrice'
import { VariantResponse } from '@/types/product.type'
import { getProductRoute } from '@/utils/getProductRoute'

export default function Details() {
  const { productId } = useParams<{ productId: string }>()

  const handleStopSell = (slug: string) => {
    console.log(slug)
  }

  const { data, isLoading, error } = useGetVariantByProductId(Number(productId))

  if (isLoading) return <LoadingOpacity />

  const columns: ColumnsType<VariantResponse> = [
    {
      title: 'ID',
      dataIndex: 'productVariantId',
      key: 'productVariantId'
    },
    {
      title: 'Ảnh',
      key: 'mainImage',
      render: (_, record) => {
        return <Image src={record.imageUrl} alt={record.variantName} style={{ width: 50 }} />
      }
    },
    {
      title: 'Tên phiên bản',
      key: 'name',
      render: (_, record) => {
        return <span>{record.variantName}</span>
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
        return <span>{record.discountPercentage > 0 ? record.discountPercentage + '%' : 'Không giảm'}</span>
      }
    },
    {
      title: 'Giá bán (Đã giảm)',
      key: 'price',
      render: (_, record) => {
        return <span>{formatPrice(getPriceAfterDiscount(record.price, record.discountPercentage))}</span>
      }
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => {
        return (
          <div className='flex flex-col gap-y-2'>
            <button
              onClick={() => window.open(getProductRoute(record.categoryName, record.brandName, record.slug))}
              className='text-xs rounded-md btn btn-option'
            >
              Chi tiết
            </button>
            {/* <button className='text-xs rounded-md btn btn-warning'>
              <Edit size={16} strokeWidth={1.6} />
              Chỉnh sửa
            </button>

            <Popconfirm
              title='Ngưng bán sản phẩm'
              description={`Bạn có chắc chắn muốn ngưng bán sản phẩm ${record.variantName}?`}
              onConfirm={() => handleStopSell(record.slug)}
              okText='Ngưng bán'
              okButtonProps={{ className: 'text-white bg-blue-500', danger: true }}
              cancelText='Hủy'
              placement='left'
            >
              <button className='text-xs rounded-md btn btn-danger'>
                <CircleArrowDown size={16} strokeWidth={1.6} />
                Ngưng bán
              </button>
            </Popconfirm> */}
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
          <Table dataSource={data} columns={columns} rowKey='slug' bordered pagination={{ pageSize: 10 }} />
        )}
      </Card>
    </ShowReturnBackLayout>
  )
}
