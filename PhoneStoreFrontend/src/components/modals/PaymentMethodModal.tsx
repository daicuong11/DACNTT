import { Modal } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import PaymentMethodItem from './components/PaymentMethodItem'
import { PaymentMethodType } from '../../types/app.type'
import { listPaymentMethod } from '../../datas/paymentMethod.data'

interface PaymentMethodModal {
  isOpen: boolean
  onClose: () => void
  selectMethod: PaymentMethodType | null
  onFinish: (method: PaymentMethodType | null) => void
}

const PaymentMethodModal: FC<PaymentMethodModal> = ({ isOpen, onClose, onFinish, selectMethod }) => {
  const [activePaymentMethod, setActivePaymentMethod] = useState<PaymentMethodType | null>(null)

  useEffect(() => {
    setActivePaymentMethod(selectMethod)
  }, [selectMethod])

  const handleSubmitPaymentMethod = () => {
    onFinish(activePaymentMethod)
    onClose()
  }

  return (
    <Modal
      title={<div className='text-lg text-center'>Chọn phương thức thanh toán</div>}
      centered
      open={isOpen}
      onOk={onClose}
      onCancel={onClose}
      width={600}
      footer={
        <div onClick={handleSubmitPaymentMethod} className='btn btn-danger'>
          Xác nhận
        </div>
      }
    >
      <div className='max-h-[60vh] overflow-y-scroll scrollbar-hide flex flex-col gap-y-3 py-2'>
        {listPaymentMethod.map((method) => (
          <PaymentMethodItem
            key={method.id}
            isDisabled={method.disabled}
            isActive={activePaymentMethod?.id === method.id}
            paymentMethod={method}
            onChange={() => setActivePaymentMethod(method)}
          />
        ))}
      </div>
    </Modal>
  )
}

export default PaymentMethodModal
