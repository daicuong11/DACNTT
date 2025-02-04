import { ProductType } from "@/types/product.type";
import { Image, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ToggleCard from "../components/ToggleCard";
import Card from "../components/Card";

export default function ProductList() {
  const [products, setProducts] = useState<ProductType[]>([]);

  const generateProducts = (num: number): ProductType[] => {
    return Array.from({ length: num }, (_, index) => ({
      productId: index + 1,
      name: `Product ${index + 1}`,
      slug: `product-${index + 1}`,
      description: `Description for product ${index + 1}`,
      price: Math.random() * 10000 + 1,
      imageUrl: `https://picsum.photos/200?random=${index + 1}`,
      categoryId: Math.floor(Math.random() * 5) + 1,
      category: {
        categoryId: Math.floor(Math.random() * 5) + 1,
        name: `Category ${Math.floor(Math.random() * 5) + 1}`,
        url: `category-${Math.floor(Math.random() * 5) + 1}`,
        description: `Description for category ${Math.floor(Math.random() * 5) + 1}`,
        imageUrl: `https://picsum.photos/200?random=${Math.floor(Math.random() * 5) + 1}`,
      },
      brandId: Math.floor(Math.random() * 5) + 1,
      brand: {
        brandId: Math.floor(Math.random() * 5) + 1,
        name: `Brand ${Math.floor(Math.random() * 5) + 1}`,
        description: `Description for brand ${Math.floor(Math.random() * 5) + 1}`,
        imageUrl: `https://picsum.photos/200?random=${Math.floor(Math.random() * 5) + 1}`,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
  };

  useEffect(() => {
    // Fetch product data from API
    const fetchProducts = async () => {
      try {
        const response = await generateProducts(50); // Update with your API endpoint
        // const data = await response.json();
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const columns = [
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price.toFixed(0)} VNĐ`,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (stock: number) => (
        <Tag color={stock > 0 ? "green" : "red"}>
          {stock > 0 ? `${stock} Available` : "Out of Stock"}
        </Tag>
      ),
    },
    {
      title: "Category",
      dataIndex: ["category", "name"],
      key: "category",
    },
    {
      title: "Brand",
      dataIndex: ["brand", "name"],
      key: "brand",
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl: string) => (
        <Image width={50} src={imageUrl} alt="Product Image" />
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <>
      <Card title="Danh Sách Sản Phẩm" button={<Link to="/admin/products/add" className="btn btn-primary">Thêm Sản Phẩm</Link>}>
        <Table
          dataSource={products}
          columns={columns}
          rowKey="productId"
          bordered
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </>
  );
}

