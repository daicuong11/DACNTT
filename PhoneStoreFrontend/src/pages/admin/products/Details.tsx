import React from 'react'
import { useParams } from 'react-router-dom';
import Card from '../components/Card';
import { ProductVariantType } from '@/types/product_variant.type';
import Table, { ColumnsType } from 'antd/es/table';
import { useGetProductVariants } from '@/hooks/querys/product';

export default function Details() {
    const {productId} = useParams<{productId: string}>();

    const { data } = useGetProductVariants(Number(productId));

    const columns: ColumnsType<ProductVariantType> = [
        {
            title: "ID",
            dataIndex: "categoryId",
            key: "categoryId",
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, record) => (
                <>
                    {/* <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>Sửa</Button>
                    <Popconfirm title="Bạn có chắc chắn muốn xóa?">
                        <Button type="link" danger icon={<DeleteOutlined />}>Xóa</Button>
                    </Popconfirm> */}
                </>
            ),
        },
    ];

  return (
    <>
        <Card title='Danh sách biến thể'>
        <Table
                    dataSource={data?.data || []}
                    columns={columns}
                    rowKey="categoryId"
                    bordered
                    pagination={{ pageSize: 10 }}
                />
        </Card>
    </>
  )
}
