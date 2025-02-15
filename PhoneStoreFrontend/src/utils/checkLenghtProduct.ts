export function checkLengthProduct(name?: string): string {
  if (name && name.length < 50) {
    return 'Đặc Điểm Nổi Bật Của ' + name
  } else {
    return 'Đặc Điểm Nổi Bật'
  }
}
