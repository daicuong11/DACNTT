export interface CustomerType {
  customerId: number
  name: string
  phoneNumber: string
  email: string
}

export interface CustomerRequestType {
  name: string
  phoneNumber: string
  email: string | null
}
