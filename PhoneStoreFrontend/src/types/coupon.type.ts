export interface CouponType {
  couponId: number
  code: string
  isPercentage: boolean
  discountValue: number
  minimumOrderAmount: number
  maxUsageCount: number
  UsedCount: number
  StartDate: string
  EndDate: string
  isActive: boolean
  ApplyToCategory: string
  isSingleUse: boolean
  userCreateId: number
}
