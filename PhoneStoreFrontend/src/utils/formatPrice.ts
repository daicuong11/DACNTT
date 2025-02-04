const formatPrice = (price: number, isReplace = true): string => {
  let newPrice = price.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND'
  })
  return isReplace ? newPrice.replace(' ', '').replace('₫', 'đ') : newPrice
}

export default formatPrice
