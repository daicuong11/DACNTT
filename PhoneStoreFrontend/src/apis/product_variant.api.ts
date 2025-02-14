import axiosInstance from '@/configs/http'
import { ProductVariantType } from '@/types/product_variant.type'

class ProductVariantAPI {
  async getAllProductVariants(): Promise<ProductVariantType[]> {
    const res = await axiosInstance.get('product_variants')
    return res.data
  }

  async getVariantByProductId(productId: number): Promise<ProductVariantType[]> {
    const res = await axiosInstance.get(`product_variants/product/${productId}`)
    return res.data
  }

  async getVariantOfMobile(): Promise<ProductVariantType[]> {
    const res = await axiosInstance.get('product_variants/mobile')
    return res.data
  }

  async getVariantOfLaptop(): Promise<ProductVariantType[]> {
    const res = await axiosInstance.get('product_variants/laptop')
    return res.data
  }
}

const productVariantAPI = new ProductVariantAPI()
export default productVariantAPI
// how to use this API
// import productVariantAPI from '@/apis/product_variant.api'
