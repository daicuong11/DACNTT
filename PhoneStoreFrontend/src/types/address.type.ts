export interface AddressType {
  addressId: number
  province: string
  district: string
  ward: string
  street: string
  isDefault: boolean
}

export interface AddressResponseType {
  addressId: number
  userId: number
  province: string
  district: string
  ward: string
  street: string
  isDefault: boolean
}

export interface AddressFormType {
  province: string
  district: string
  ward: string
  street: string
  isDefault: boolean
}

export interface AddressRequestType {
  userId: number
  province: string
  district: string
  ward: string
  street: string
  isDefault: boolean
}
