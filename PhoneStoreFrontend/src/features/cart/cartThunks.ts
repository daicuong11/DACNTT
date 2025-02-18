import axiosInstance from '@/configs/http'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { CartResponse } from '@/types/cart.type'
import { CartItemRequestType, CartItemResponse } from '@/types/cart_item.type'

export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId: number): Promise<CartResponse> => {
  const response = await axiosInstance.get(`carts/${userId}`)
  return response.data
})

export const addCartItem = createAsyncThunk(
  'cart/addCartItem',
  async ({ userId, cartItem }: { userId: number; cartItem: CartItemRequestType }): Promise<CartItemResponse> => {
    const response = await axiosInstance.post(`carts/${userId}/items`, cartItem)
    return response.data
  }
)

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({
    userId,
    itemId,
    cartItem
  }: {
    userId: number
    itemId: number
    cartItem: CartItemRequestType
  }): Promise<CartItemResponse> => {
    const response = await axiosInstance.put(`carts/${userId}/items/${itemId}`, cartItem)
    return response.data
  }
)

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async ({ userId, itemId }: { userId: number; itemId: number }) => {
    await axiosInstance.delete(`carts/${userId}/items/${itemId}`)
    return itemId
  }
)
