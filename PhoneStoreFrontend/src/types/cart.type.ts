import { CartItemType } from './cart_item.type'

export interface CartType {
  cartId: number
  userId: number
  cartItems: CartItemType[]
}
