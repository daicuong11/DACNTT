import { useAllReviews, useUpdateReviewReply } from '@/hooks/querys/review.query'
import { ProductVariantType } from '@/types/product_variant.type'
import { ReviewType } from '@/types/review.type'
import { UserType } from '@/types/user.type'
import { getProductRoute } from '@/utils/getProductRoute'
import { Avatar, Button, Descriptions, Modal, Switch, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { format } from "date-fns"
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Reviews() {
    const { data: reviews, isLoading } = useAllReviews();
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mutate: updateReply, isPending } = useUpdateReviewReply();


    const showUserDetails = (user: UserType) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const columns: ColumnsType<ReviewType> = [
        {
            title: "Người dùng",
            dataIndex: "user",
            key: "user",
            render: (user: UserType) => (
                <div
                    className="flex items-center space-x-2 cursor-pointer hover:text-blue-500"
                    onClick={() => showUserDetails(user)}
                >
                    <Avatar src={user.profilePicture || "/default-avatar.png"} />
                    <span className="font-semibold hover:underline">{user.name}</span>
                </div>
            ),
        },
        {
            title: "Sản phẩm",
            dataIndex: "productVariant", // Truy cập đến object cha
            key: "productVariant.variantName",
            render: (productVariant: ProductVariantType) => (
                <Link
                    className="cursor-pointer hover:text-blue-500 hover:underline"
                    to={getProductRoute(productVariant.product.category.name, productVariant.product.brand.name, productVariant.slug)}
                >
                    {productVariant.variantName}
                </Link>
            )
        },
        {
            title: "Đánh giá",
            dataIndex: "rating",
            key: "rating",
            render: (rating) => (
                <span className="text-yellow-500">{rating} ★</span>
            ),
        },
        {
            title: "Bình luận",
            dataIndex: "comment",
            key: "comment",
        },
        {
            title: "Ảnh",
            dataIndex: "hasImages",
            key: "hasImages",
            render: (hasImages, record) =>
                hasImages ? (
                    <img
                        src={record.images.split(";")[0]}
                        alt="Review"
                        className="h-10 w-10 rounded-md"
                    />
                ) : (
                    <Tag color="gray">Không có ảnh</Tag>
                ),
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date) => format(new Date(date), "dd/MM/yyyy HH:mm"),
        },
        {
            title: "Trả lời",
            dataIndex: "isReply",
            key: "isReply",
            render: (isReply: boolean, record) => (
                <Button
                    type="primary"
                    disabled={isReply} // ✅ Không thể click nếu đã trả lời
                    loading={isPending}
                    className={`transition-all px-4 py-1 rounded-lg text-white ${
                        isReply ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    onClick={() => updateReply({ reviewId: record.reviewId, isReply: !isReply })}
                >
                    {isReply ? "Đã trả lời" : "Chưa trả lời"}
                </Button>
            )
            
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                loading={isLoading}
                dataSource={reviews || []}
                rowKey="reviewId"
                pagination={{ pageSize: 10 }}
            />

            {/* Modal Hiển thị thông tin khách hàng */}
            <Modal
                title="Thông tin khách hàng"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                {selectedUser && (
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="Tên">{selectedUser.name}</Descriptions.Item>
                        <Descriptions.Item label="Email">{selectedUser.email || "Chưa có"}</Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại">{selectedUser.phoneNumber || "Chưa có"}</Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ">{selectedUser.address || "Chưa cập nhật"}</Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>

        </>
    );
}
