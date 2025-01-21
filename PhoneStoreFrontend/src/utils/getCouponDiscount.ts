import { CouponType } from '../types/coupon.type'
import formatPrice from './formatPrice'

type CouponInfoType = {
  displayName: string
  discountValue: number
  isPercentage: boolean
}

export const getCouponDiscount = (coupon: CouponType | null): CouponInfoType => {
  if (!coupon) {
    return {
      displayName: 'No coupon applied',
      discountValue: 0,
      isPercentage: false
    }
  }
  if (!coupon.isActive) {
    return {
      displayName: 'Coupon is not active',
      discountValue: 0,
      isPercentage: false
    }
  }

  const currentDate = new Date()
  const startDate = new Date(coupon.StartDate)
  const endDate = new Date(coupon.EndDate)

  if (currentDate < startDate || currentDate > endDate) {
    return {
      displayName: 'Coupon is expired',
      discountValue: 0,
      isPercentage: false
    }
  }

  if (coupon.UsedCount >= coupon.maxUsageCount) {
    return {
      displayName: 'Coupon has reached its usage limit',
      discountValue: 0,
      isPercentage: false
    }
  }

  return coupon.isPercentage
    ? {
        displayName: `- ${coupon.discountValue}%`,
        discountValue: coupon.discountValue,
        isPercentage: true
      }
    : {
        displayName: `- ${formatPrice(coupon.discountValue)}`,
        discountValue: coupon.discountValue,
        isPercentage: false
      }
}
