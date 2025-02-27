import axiosInstance from '@/configs/http'
import { AddressRequestType, AddressResponseType } from './../types/address.type'
import { BaseResponse } from '@/types/auth.type'
class AddressAPI {
  async getAddressByUserId(userId: number): Promise<AddressResponseType[]> {
    const res = await axiosInstance.get(`addresses/user/${userId}`)
    return res.data
  }

  async getAddressById(addressId: number): Promise<AddressResponseType> {
    const res = await axiosInstance.get(`addresses/${addressId}`)
    return res.data
  }

  async addAddress(address: AddressRequestType): Promise<AddressResponseType> {
    const res = await axiosInstance.post('addresses', address)
    return res.data
  }

  async updateAddress(addressId: number, address: AddressRequestType): Promise<BaseResponse<object>> {
    return await axiosInstance.put(`addresses/${addressId}`, address)
  }

  async setDefaultAddress(addressId: number): Promise<BaseResponse<object>> {
    return await axiosInstance.put(`addresses/set-default/${addressId}`)
  }

  async deleteAddress(addressId: number): Promise<BaseResponse<object>> {
    return await axiosInstance.delete(`addresses/${addressId}`)
  }
}

const addressAPI = new AddressAPI()
export default addressAPI
