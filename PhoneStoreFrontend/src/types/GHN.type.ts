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
  orderId: number
}

export interface CreateOrderGHNResponse {
  order_code: string
  total_fee: string
  expected_delivery_time: string
}

export interface GetOrderStatusGHNRequest {
  client_order_code: string
}

export interface GetOrderStatusGHNResponse {
  status: string
  log: LogEntry[]
}

type LogEntry = {
  status: string
  updated_date: string
}
