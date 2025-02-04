export const maskPhoneNumber = (phone: string) => {
  if (!phone || phone.length < 10) return phone

  return phone.replace(/^(\d{2})\d{5}(\d{3})$/, '$1*****$2')
}
