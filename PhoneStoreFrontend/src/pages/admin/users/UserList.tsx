import { useGetAllUsers, useUpdateUserStatus } from '@/hooks/querys/user.query'
import { UserType } from '@/types/user.type'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useQueryClient } from '@tanstack/react-query'
import { Card, Popconfirm, Switch, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function UserList() {
    const queryClient = useQueryClient()
    const { data, isLoading } = useGetAllUsers()

    const updateUserStatus = useUpdateUserStatus()

    const handleToggleStatus = (userId: number) => {
        updateUserStatus.mutate(userId)
    }

    const columns: ColumnsType<UserType> = [
        {
            title: 'User ID',
            dataIndex: 'id',
            key: 'userId',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
    title: 'Hành động',
    key: 'actions',
    render: (_, record) => (
        <Popconfirm
            title={record.active ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
            description={record.active ? 'Bạn có chắc chắn muốn khóa tài khoản này?' : 'Bạn có chắc chắn muốn mở khóa tài khoản này?'}
            okButtonProps={{ className: 'text-white bg-green-500', danger: record.active }}
            onConfirm={() => handleToggleStatus(record.id)}
            cancelText="Hủy"
            okText="Xác nhận"
            placement="left"
        >
            <Switch 
                checked={record.active} 
                checkedChildren="Mở khóa" 
                unCheckedChildren="Khóa" 
                className={!record.active ? 'bg-red-500' : 'bg-green-500'} // Đổi màu khi bị khóa
            />
        </Popconfirm>
    )
}

        
    ]


    return (
        <Card title='Danh Sách Người Dùng' >
            <Table
                rowKey='userId'
                loading={isLoading}
                dataSource={data}
                columns={columns}
                bordered
                pagination={{ pageSize: 10 }}
            />
        </Card>
    )
}
