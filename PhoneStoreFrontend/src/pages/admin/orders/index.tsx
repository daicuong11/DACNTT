import { useMemo, useState } from 'react'
import { Card, Input, Popconfirm, Table, Tag } from 'antd'
import type { ColumnsType, ColumnType } from 'antd/es/table'
import { OrderResponseType } from '@/types/order.type'
import { useGetAllOrders, useUpdateOrderStatus } from '@/hooks/querys/order.query'
import { useCreateGHNOrder } from '@/hooks/querys/GHN.query'
import { formatterDay } from '@/utils/formatterDay'
import formatPrice from '@/utils/formatPrice'
import { OrderStatusMap } from '@/datas/OrderStatusMap'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import classNames from 'classnames'
import { useQueryClient } from '@tanstack/react-query'
import { Check, Trash2 } from 'lucide-react'
import { QuestionCircleOutlined } from '@ant-design/icons'

export default function Orders() {
  const queryClient = useQueryClient()
  const { data, isLoading } = useGetAllOrders()
  const { mutate: createGHNOrder, isPending: isCreating } = useCreateGHNOrder()
  const { mutate: updateOrderStatus, isPending: isUpdating } = useUpdateOrderStatus()

  const handleCreateOrder = (orderId: number) => {
    createGHNOrder(
      { orderId },
      {
        onSuccess: () => {
          toast('Xác nhận đơn hàng thành công')
          queryClient.invalidateQueries({
            queryKey: ['getAllOrders']
          })
        },
        onError: () => toast('Xác nhận đơn hàng thất bại')
      }
    )
  }

  const handleCancelOrder = (orderId: number) => {
    updateOrderStatus(
      { orderId, status: 'cancel' },
      {
        onSuccess: () => {
          toast('Hủy đơn hàng thành công')
          queryClient.invalidateQueries({
            queryKey: ['getAllOrders']
          })
        },
        onError: () => toast('Hủy đơn hàng thất bại')
      }
    )
  }

  // Hàm tìm kiếm
  const getColumnSearchProps = (dataIndex: keyof OrderResponseType): ColumnType<OrderResponseType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Tìm kiếm`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: 'block' }}
        />
      </div>
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()) ?? false
  })

  // Cột dữ liệu
  const columns: ColumnsType<OrderResponseType> = useMemo(
    () => [
      {
        title: 'Mã đơn hàng',
        dataIndex: 'orderId',
        key: 'orderId',
        sorter: (a, b) => a.orderId - b.orderId,
        ...getColumnSearchProps('orderId')
      },
      {
        title: 'Khách hàng',
        key: 'customer_name',
        render: (_, record) => record.customer?.name || 'N/A',
        ...getColumnSearchProps('customer')
      },
      {
        title: 'Số điện thoại',
        key: 'customer_phone',
        render: (_, record) => record.customer?.phoneNumber || 'N/A',
        ...getColumnSearchProps('customer')
      },
      {
        title: 'Trạng thái',
        key: 'status',
        filters: Object.entries(OrderStatusMap).map(([key, label]) => ({ text: label, value: key })),
        onFilter: (value, record) => record.status.toLowerCase() === value,
        render: (_: any, record: OrderResponseType) => (
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
        key: 'totalAmount',
        sorter: (a, b) => (a.totalAmount || 0) - (b.totalAmount || 0),
        render: (_, record) => formatPrice(record.totalAmount || 0) || 'N/A'
      },
      {
        title: 'Phí vận chuyển',
        key: 'shippingFee',
        render: (_, record) => formatPrice(record.shippingFee || 0) || 'N/A'
      },
      {
        title: 'Ngày đặt hàng',
        key: 'orderDate',
        sorter: (a, b) => new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime(),
        render: (_, record) => formatterDay.format(new Date(record.orderDate)) || 'N/A'
      },
      {
        title: 'Phương thức thanh toán',
        key: 'paymentMethod',
        filters: [
          { text: 'Tiền mặt', value: 'COD' },
          { text: 'VNPay', value: 'VNPay' },
          { text: 'Momo', value: 'momo' }
        ],
        onFilter: (value, record) => record.payment?.paymentMethod === value,
        render: (_, record) => record.payment?.paymentMethod || 'N/A'
      },
      {
        title: 'Hành động',
        key: 'actions',
        render: (_, record: OrderResponseType) => (
          <div className='flex flex-col gap-y-2'>
            <Link
              to={`/admin/orders/details/${record.orderId}`}
              className='flex-shrink-0 text-xs rounded-md btn btn-option text-nowrap'
            >
              Xem chi tiết
            </Link>
            {record.status.toLowerCase() === 'pending' && (
              <Popconfirm
                title='Xác nhận đơn hàng'
                description='Bạn có chắc chắn muốn xác nhận đơn hàng này?'
                okButtonProps={{ className: 'text-white bg-blue-500' }}
                icon={<Check style={{ color: 'green' }} />}
                onConfirm={() => handleCreateOrder(record.orderId)}
                cancelText='Hủy'
                okText='Xác nhận'
                placement='left'
              >
                <div className='flex-shrink-0 text-xs rounded-md btn btn-success text-nowrap'>Xác nhận đơn</div>
              </Popconfirm>
            )}
            {record.status.toLowerCase() === 'pending' && (
              <Popconfirm
                title='Hủy đơn hàng'
                description='Bạn có chắc chắn muốn hủy đơn hàng này?'
                okButtonProps={{ className: 'text-white bg-blue-500', danger: true }}
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                onConfirm={() => handleCancelOrder(record.orderId)}
                cancelText='Trở lại'
                okText='Xác nhận hủy'
                placement='left'
              >
                <div className='flex-shrink-0 text-xs rounded-md btn btn-danger text-nowrap'>Hủy đơn hàng</div>
              </Popconfirm>
            )}
          </div>
        )
      }
    ],
    []
  )

  return (
    <Card title='Danh Sách Đơn Hàng'>
      <Table
        rowKey='orderId'
        loading={isLoading || isCreating || isUpdating}
        dataSource={data}
        columns={columns}
        bordered
        pagination={{ pageSize: 10 }}
      />
    </Card>
  )
}
