const getPriceAfterDiscount = (originalPrice: number, discount: number): number => {
  if (discount < 0 || discount > 100) {
    throw new Error('Discount must be a value between 0 and 100.')
  }
  const discountedPrice = originalPrice - originalPrice * (discount / 100)
  return Math.ceil(discountedPrice)
}

export default getPriceAfterDiscount
