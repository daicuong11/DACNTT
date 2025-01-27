import { CartItemPayloadType } from '../types/cart_item.type'

export const getTotalAmountOfCartItems = (cartItems: CartItemPayloadType[]) => {
  return cartItems.reduce((acc, item) => acc + item.productVariant.price * item.quantity, 0)
}
