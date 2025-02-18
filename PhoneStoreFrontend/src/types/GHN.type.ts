export interface ProvinceGHNResponse {
  ProvinceID: number
  ProvinceName: string
  NameExtension: string[]
}

export interface DistrictGHNResponse {
  DistrictID: number
  ProvinceID: number
  DistrictName: string
  NameExtension: string[]
}

export interface WardGHNResponse {
  WardCode: string
  DistrictID: number
  WardName: string
  NameExtension: string[]
}

export interface ShippingFeeGHNRequest {
  service_type_id: number
  from_district_id: number
  from_ward_code: string
  to_district_id: number
  to_ward_code: string
  length: number
  width: number
  height: number
  weight: number
  items: ItemShippingFeeGHNRequest[]
}

export interface ItemShippingFeeGHNRequest {
  name: string
  quantity: number
}

export type ShippingFeeGHNResponse = {
  total: number
  service_fee: number
}

export enum RequiredNoteGHN {
  CHOTHUHANG = 'CHOTHUHANG',
  CHOXEMHANGKHONGTHU = 'CHOXEMHANGKHONGTHU',
  KHONGCHOXEMHANG = 'KHONGCHOXEMHANG'
}

export type CreateOrderGHNRequest = {
  payment_type_id: number
  required_note: RequiredNoteGHN
  client_order_code: string
  to_name: string
  to_phone: string
  to_address: string
  to_ward_name: string
  to_district_name: string
  to_province_name: string
  service_type_id: 2 | 5
  length: number
  width: number
  height: number
  weight: number
  items: ItemOrderGHNRequest[]
}
export interface ItemOrderGHNRequest {
  name: string
  quantity: number
}

export interface CreateOrderGHNResponse {
  order_code: string
  total_fee: string
  expected_delivery_time: string
}
