import { useCreateDiscount, useGetAllDiscounts as useDiscounts, useUpdateDiscount } from '@/hooks/querys/discount.query'
import { DiscountType } from '@/types/discount.type'
import { CloseOutlined, EditOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons'
import { useQueryClient } from '@tanstack/react-query'
import { Button, Card, Form, InputNumber, Modal, Switch, Tag } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'
import { useState } from 'react'

export default function DiscountList() {
  const queryClient = useQueryClient()
  const { data, isLoading } = useDiscounts()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const createMutation = useCreateDiscount()
  const updateMutation = useUpdateDiscount();

  const handleInputChange = (value: number, record: DiscountType) => {
    updateMutation.mutate({ ...record, percentage: value });
  };

  const handleSwitchChange = (checked: boolean, record: DiscountType) => {
    updateMutation.mutate({ ...record, isActive: checked });
  };

  // Cấu hình cột cho bảng
  const columns: ColumnsType<DiscountType> = [
    {
      title: 'ID',
      dataIndex: 'discountId',
      key: 'discountId',
      align: 'center',
      width: 80,
      className: 'text-center',
    },
    {
      title: 'Phần trăm (%)',
      dataIndex: 'percentage',
      key: 'percentage',
      align: 'center',
      render: (text: number, record: DiscountType) => (
        <InputNumber
          min={1}
          max={100}
          value={text}
          onChange={(value) => handleInputChange(value!, record)}
          className="w-20"
        />
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      align: 'center',
      render: (isActive: boolean, record: DiscountType) => (
        <Switch checked={isActive} onChange={(checked) => handleSwitchChange(checked, record)} />
      ),
    },
   
  ];


  // Xử lý khi nhấn nút "Thêm"
  const handleAddDiscount = () => {
    form.validateFields().then((values) => {
      createMutation.mutate({
        percentage: values.percentage,
        isActive: values.isActive,
      });
      setIsModalOpen(false);
      form.resetFields();
    });
  };


  return (
    <>
      <Card
        title="Danh sách khuyến mãi"
        className="shadow-md capitalize"
        extra={
          <Button type="primary" color="danger" variant="solid" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
            Thêm mã giảm giá
          </Button>
        }
      >
        <Table
          rowKey='discountId'
          loading={isLoading}
          dataSource={data}
          columns={columns}
          bordered
          pagination={{ pageSize: 10 }}
        />

        {/* Modal Thêm Discount */}
        <Modal
          title="Thêm mã giảm giá"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={handleAddDiscount}
          okText="Thêm"
          cancelText="Hủy"
          okButtonProps={{
            style: {
              backgroundColor: '#dc2626', // Màu đỏ (bg-red-500)
              borderColor: '#b91c1c', // Viền đỏ đậm hơn
              color: 'white',
            },
            onMouseEnter: (e) => (e.currentTarget.style.backgroundColor = '#b91c1c'), // Màu hover (bg-red-700)
            onMouseLeave: (e) => (e.currentTarget.style.backgroundColor = '#dc2626'), // Quay lại màu cũ khi rời chuột
          }}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Phần trăm giảm giá (%)"
              name="percentage"
              rules={[{ required: true, message: 'Vui lòng nhập phần trăm giảm giá!' }]}
            >
              <InputNumber min={1} max={100} className="w-full" />
            </Form.Item>
            <Form.Item
              label="Trạng thái"
              name="isActive"
              valuePropName="checked"
              initialValue={true}
            >
              <Switch />
            </Form.Item>
          </Form>
        </Modal>

      </Card>
    </>
  )
}
