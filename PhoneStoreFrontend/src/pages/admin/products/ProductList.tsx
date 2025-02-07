import { useGetProducts } from "@/hooks/querys/product";
import { ProductType } from "@/types/product.type";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";

export default function ProductList() {
  const { data } = useGetProducts();
  const navigate = useNavigate();


  const columns: ColumnsType<ProductType> = [
    {
      title: "Mã sản phẩm",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Danh mục",
      dataIndex: ["category", "name"],
      key: "category",
    },
    {
      title: "Thương hiệu",
      dataIndex: ["brand", "name"],
      key: "brand",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button color="danger" variant="solid" onClick={() => handleViewVariants(record.productId)} >
          Xem biến thể
        </Button>
      ),
    },
  ];

  const handleViewVariants = (productId: number) => {
    navigate(`/admin/products/details/${productId}`);
  };

  return (
    <>
      <Card title="Danh Sách Sản Phẩm" button={<Link to="/admin/products/add" className="btn btn-primary">Thêm Sản Phẩm</Link>}>
        <Table
          dataSource={data?.data}
          columns={columns}
          rowKey="productId"
          bordered
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </>
  );
}

