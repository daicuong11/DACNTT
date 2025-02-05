import { CategoryType } from '@/types/category.type'
import http from '../utils/http'
import { ProductRequestType, ProductType } from '@/types/product.type'

export const addProduct = async (formData: ProductRequestType) => {
  return http.post<ProductType>('products', formData, )
}

export const getProducts = async () => {
  return http.get<ProductType[]>('products')
}

export const updateProduct = async (productId: number, formData: FormData) => {
    return http.put<ProductType>(`products/${productId}`, formData)
}