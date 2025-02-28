import { ProductResponse } from '@/types/product.type'
import { Input, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import { useGetAllProducts } from '@/hooks/querys/product.query'
import { OrderResponseType } from '@/types/order.type'
import { useGetAllOrders } from '@/hooks/querys/order.query'
import { OrderStatusMap } from '@/datas/OrderStatusMap'
import classNames from 'classnames'

const columns: ColumnsType<OrderResponseType> = [
  {
    title: 'Mã đơn hàng',
    dataIndex: 'orderId',
    key: 'orderId'
  },
  {
    title: 'Khách hàng',
    key: 'customer_name',
    render: (_, record) => record.customer?.name || 'N/A'
  },
  {
    title: 'Số điện thoại',
    key: 'customer_phone',
    render: (_, record) => record.customer?.phoneNumber || 'N/A'
  },
  {
    title: 'Trạng thái',
    key: 'status',
    render: (_, record) => (
      <Tag
        className='m-0'
        color={classNames({
          green: record?.status.toLowerCase() === 'delivered',
          purple: record?.status.toLowerCase() === 'delivering',
          default: record?.status.toLowerCase() === 'cancel',
          red: record?.status.toLowerCase() === 'delivery_fail',
          processing: record?.status.toLowerCase() === 'ready_to_pick',
          volcano: record?.status.toLowerCase() === 'pending'
        })}
      >
        {OrderStatusMap[record?.status.toLowerCase() || ''] || 'Trạng thái lỗi'}
      </Tag>
    )
  },
  {
    title: 'Tổng tiền',
    dataIndex: 'totalAmount',
    key: 'totalAmount'
  },
  {
    title: 'Phí vận chuyển',
    dataIndex: 'shippingFee',
    key: 'shippingFee'
  },

  {
    title: 'Ngày đặt hàng',
    dataIndex: 'orderDate',
    key: 'orderDate'
  },

  {
    title: 'Phương thức thanh toán',
    key: 'paymentMethod',
    render: (_, record) => record.payment?.paymentMethod || 'N/A'
  },

  {
    title: 'Ghi chú',
    dataIndex: 'note',
    key: 'note'
  },
  {
    title: 'Hành động',
    key: 'actions',
    render: (_, record) => (
      <div className='flex flex-col gap-y-2'>
        <Link
          to={`/admin/orders/details/${record.orderId}`}
          className='flex-shrink-0 text-xs rounded-md btn btn-option text-nowrap'
        >
          Xem chi tiết
        </Link>
        <Link
          to={`/admin/orders/details/${record.orderId}`}
          className='flex-shrink-0 text-xs rounded-md btn btn-success text-nowrap'
        >
          Xác nhận đơn
        </Link>
        {record.status.toLowerCase() === 'pending' && (
          <Link
            to={`/admin/orders/details/${record.orderId}`}
            className='flex-shrink-0 text-xs rounded-md btn btn-danger text-nowrap'
          >
            Hủy đơn hàng
          </Link>
        )}
      </div>
    )
  }
]

export default function Order() {
  const { data, isLoading } = useGetAllOrders()

  console.log(data)
  return (
    <Card title='Danh Sách Đơn Hàng'>
      <Table
        rowKey='orderId'
        loading={isLoading}
        dataSource={data}
        columns={columns}
        bordered
        pagination={{ pageSize: 10 }}
      />
    </Card>
  )
}
