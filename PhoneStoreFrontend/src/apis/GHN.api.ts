import axiosInstance from '@/configs/http'
import axiosGHN from '@/configs/httpGHN'
import { BaseResponse } from '@/types/auth.type'
import {
  CreateOrderGHNRequest,
  CreateOrderGHNResponse,
  DistrictGHNResponse,
  GetOrderStatusGHNRequest,
  GetOrderStatusGHNResponse,
  ProvinceGHNResponse,
  ShippingFeeGHNRequest,
  ShippingFeeGHNResponse,
  WardGHNResponse
} from '@/types/GHN.type'

class GHNApi {
  getAllProvince = async (): Promise<ProvinceGHNResponse[]> => {
    try {
      const res = await axiosGHN.get('master-data/province')
      return res.data
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch provinces')
    }
  }

  getDistrictByProvince = async (provinceID: number): Promise<DistrictGHNResponse[]> => {
    try {
      const res = await axiosGHN.post(`master-data/district`, {
        province_id: provinceID
      })
      return res.data
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch districts')
    }
  }

  getWardByDistrict = async (districtID: number): Promise<WardGHNResponse[]> => {
    try {
      const res = await axiosGHN.post(`master-data/ward?district_id`, {
        district_id: districtID
      })
      return res.data
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch wards')
    }
  }

  getShippingFee = async (shippingFreeRequest: ShippingFeeGHNRequest): Promise<ShippingFeeGHNResponse> => {
    try {
      const res = await axiosGHN.post('v2/shipping-order/fee', shippingFreeRequest)
      return res.data
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch shipping fee')
    }
  }

  createGHNOrder = async (orderRequest: CreateOrderGHNRequest): Promise<BaseResponse<CreateOrderGHNResponse>> => {
    try {
      return await axiosInstance.post('ghn', orderRequest)
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create order')
    }
  }

  getGHNOrderStatus = async (getOrderStatusReq: GetOrderStatusGHNRequest): Promise<GetOrderStatusGHNResponse> => {
    try {
      const res = await axiosGHN.post('v2/shipping-order/detail-by-client-code', getOrderStatusReq)
      return res.data
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch order status')
    }
  }
}

const ghnApi = new GHNApi()
export default ghnApi
