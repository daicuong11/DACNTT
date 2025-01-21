import React, { FC } from 'react'
import { PaymentMethodType } from '../../../types/app.type'
import classNames from 'classnames'
import { Check } from 'lucide-react'

interface PaymentMethodItemProps {
  paymentMethod: PaymentMethodType
  isActive: boolean
  onChange: (method: PaymentMethodType) => void
}
const PaymentMethodItem: FC<PaymentMethodItemProps> = ({ paymentMethod, isActive, onChange }) => {
  return (
    <div
      onClick={() => onChange(paymentMethod)}
      className={classNames('flex items-center p-3 border  cursor-pointer rounded-xl gap-x-3 relative transition-all', {
        'border-gray-200': !isActive,
        'border-primary': isActive
      })}
    >
      <div className='h-[50px] w-[50px] flex-shrink-0 mx-1.5'>
        <img className='object-contain w-full h-full' src={paymentMethod.image} />
      </div>
      <div className='text-base font-semibold'>{paymentMethod.name}</div>
      {isActive && (
        <span className='absolute flex items-center justify-center w-3 h-3 text-white rounded-full top-3 right-2 bg-primary'>
          <Check size={8} strokeWidth={3} />
        </span>
      )}
    </div>
  )
}

export default PaymentMethodItem
