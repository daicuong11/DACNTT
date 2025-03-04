import axiosInstance from '@/configs/http'
import { BaseResponse, BaseResponsePaginate } from '@/types/auth.type'
import {
  AddProductWithVariantsRequestType,
  ProductRequestType,
  ProductResponse,
  ProductType,
  VariantResponse
} from '@/types/product.type'
import { ProductVariantResponse, ProductVariantType } from '@/types/product_variant.type'

// method get
export const getAllProduct = async (): Promise<ProductResponse[]> => {
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

export const getAllProductOfMobile = async (): Promise<ProductResponse[]> => {
  const res = await axiosInstance.get('products/mobile')
  return res.data
}

export const getAllProductOfLaptop = async (): Promise<ProductResponse[]> => {
  const res = await axiosInstance.get('products/laptop')
  return res.data
}

export const get15ProductSimilar = async (id: number): Promise<ProductResponse[]> => {
  const res = await axiosInstance.get(`products/${id}/similar`)
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

export async function searchProducts(
  name: string,
  page: number = 1,
  pageSize: number = 10,
  sort?: string,
  filters?: Record<string, string | number>
): Promise<BaseResponsePaginate<ProductVariantResponse[]>> {
  const params = new URLSearchParams()

  params.append('keyword', name)
  params.append('page', page.toString())
  params.append('pageSize', pageSize.toString())

  if (sort) params.append('sort', sort)

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      params.append(key, value.toString())
    })
  }

  return await axiosInstance.get(`products/search?${params.toString()}`)
}
