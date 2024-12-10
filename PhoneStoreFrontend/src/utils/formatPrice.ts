const formatPrice = (price: number): string => {
  return price
    .toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND'
    })
    .replace('₫', 'đ')
}

export default formatPrice
