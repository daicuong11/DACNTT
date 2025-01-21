export const formatQuantity = (quantity: number) => {
  return quantity < 10 ? `0${quantity}` : quantity.toString()
}
