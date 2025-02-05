import axiosInstance from '@/configs/http'
import { CategoryType } from '@/types/category.type'
import { ProductRequestType, ProductType } from '@/types/product.type'

export const addProduct = async (formData: ProductRequestType) => {
  return axiosInstance.post<ProductType>('products', formData)
}

export const getProducts = async () => {
  return axiosInstance.get<ProductType[]>('products')
}

export const updateProduct = async (productId: number, formData: FormData) => {
  return axiosInstance.put<ProductType>(`products/${productId}`, formData)
}
