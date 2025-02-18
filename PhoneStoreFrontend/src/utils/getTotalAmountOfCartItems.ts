import { CartItemResponse } from '../types/cart_item.type'
import getPriceAfterDiscount from './getPriceAfterDiscount'

export const getTotalAmountOfCartItems = (cartItems: CartItemResponse[]) => {
  return cartItems.reduce(
    (acc, item) =>
      acc + getPriceAfterDiscount(item.productVariant.price, item.productVariant.discountPercentage) * item.quantity,
    0
  )
}
