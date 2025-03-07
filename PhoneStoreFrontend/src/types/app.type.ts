export type FilterType = {
  [key: string]: boolean
}

export type PaymentMethodType = {
  id: number
  name: string
  image: string
  disabled?: boolean
}

export type ShippingInfoType = {
  name: string
  phone: string
}
