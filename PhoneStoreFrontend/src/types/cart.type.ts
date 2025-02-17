import { CartItemResponse, CartItemType } from './cart_item.type'

export interface CartType {
  cartId: number
  userId: number
  cartItems: CartItemType[]
}

export interface CartResponse {
  cartId: number
  cartItems: CartItemResponse[]
}
