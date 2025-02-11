export interface DiscountType {
  discountId: number
  percentage: number
  isActive: boolean
}

export interface DiscountRequestType {
  percentage: number
  isActive: boolean
}
