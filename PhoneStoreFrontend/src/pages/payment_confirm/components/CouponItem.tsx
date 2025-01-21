import React, { FC } from 'react'
import { X } from 'lucide-react'
import { CouponType } from '../../../types/coupon.type'
import { getCouponDiscount } from '../../../utils/getCouponDiscount'

interface CouponItemProps {
  coupon: CouponType
  onRemove: () => void
}
const CouponItem: FC<CouponItemProps> = ({ coupon, onRemove }) => {
  return (
    <div className='inline-flex items-center justify-center rounded-md relative py-1.5 text-sm group px-4 bg-[#c73026] bg-opacity-30 text-[#fc2b1c] font-bold'>
      {getCouponDiscount(coupon).displayName}
      <span className='absolute left-0 w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full top-1/2'></span>
      <span className='absolute right-0 w-3 h-3 translate-x-1/2 -translate-y-1/2 bg-white rounded-full top-1/2'></span>
      <span
        onClick={onRemove}
        className='absolute z-10 p-1 transition-all -translate-y-1/2 bg-gray-100 rounded-full cursor-pointer group-hover:bg-gray-200 -right-7 bg- top-1/2'
      >
        <X size={16} strokeWidth={2.8} className='bg-transparent' />
      </span>
      <span className='absolute right-0 w-8 h-full translate-x-full -translate-y-1/2 bg-transparent top-1/2'></span>
    </div>
  )
}

export default CouponItem
