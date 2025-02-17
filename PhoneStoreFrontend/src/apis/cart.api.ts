import axiosInstance from '@/configs/http'
import { CartItemType } from '@/types/cart_item.type'

class CartAPI {
  async getCart(userId: number): Promise<CartItemType[]> {
    const res = await axiosInstance.get(`/carts/${userId}`)
    return res.data
  }

  async updateCart(userId: number, items: CartItemType[]): Promise<CartItemType[]> {
    const res = await axiosInstance.put(`/carts/${userId}`, { items })
    return res.data
  }
}
