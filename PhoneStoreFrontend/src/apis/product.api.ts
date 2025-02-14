import axiosInstance from '@/configs/http'
import { BaseResponse } from '@/types/auth.type'
import { AddProductWithVariantsRequestType, ProductRequestType, ProductType } from '@/types/product.type'

// method get
export const getProducts = async (): Promise<ProductType[]> => {
  const res = await axiosInstance.get('products')
  return res.data
}

export const getProductVariants = async (productId: number) => {
  return axiosInstance.get<ProductType[]>(`products/${productId}/variants`)
}

export const getProductById = async (productId: number): Promise<ProductType> => {
  const res = await axiosInstance.get(`products/${productId}`)
  return res.data
}

// method post
export const addProduct = async (formData: ProductRequestType) => {
  return axiosInstance.post<ProductType>('products', formData)
}

export const addProductWithVariants = async (
  addProductWithVariantsReq: AddProductWithVariantsRequestType
): Promise<BaseResponse<ProductType>> => {
  return await axiosInstance.post('products/add-with-variants', addProductWithVariantsReq)
}

// method put
export const updateProduct = async (productId: number, formData: FormData) => {
  return axiosInstance.put<ProductType>(`products/${productId}`, formData)
}

// method delete

// method patch
