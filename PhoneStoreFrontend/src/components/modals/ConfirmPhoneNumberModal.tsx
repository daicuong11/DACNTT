import { GetProps, Input, Modal } from 'antd'
import React, { FC, ReactElement } from 'react'
import { MyDivider } from '../dividers'
import { maskPhoneNumber } from '@/utils/maskPhoneNumber'

type OTPProps = GetProps<typeof Input.OTP>

interface ConfirmPhoneNumberModalProps {
  isOpen: boolean
  closeModal: () => void
  phoneNumber: string
}

const ConfirmPhoneNumberModal: FC<ConfirmPhoneNumberModalProps> = ({ isOpen, closeModal, phoneNumber }) => {
  const [otp, setOtp] = React.useState('')

  const onChange: OTPProps['onChange'] = (text) => {
    setOtp(text)
  }

  const sharedProps: OTPProps = {
    onChange
  }

  return (
    <Modal
      centered
      open={isOpen}
      onClose={closeModal}
      onCancel={closeModal}
      title={<div className='text-lg font-semibold text-center'>Xác thực số điện thoại</div>}
      width={400}
      footer={null}
    >
      <div className='flex flex-col text-base'>
        <MyDivider className='!bg-gray-200 !h-[0.5px] mb-3' />
        <div className='text-lg text-center'>Nhập mã OTP được gửi qua số điện thoại {maskPhoneNumber(phoneNumber)}</div>
        <div className='flex justify-center my-5'>
          <Input.OTP
            value={otp}
            length={4}
            variant='filled'
            size='large'
            {...sharedProps}
            formatter={(val) => val.replace(/\D/g, '')}
          />
        </div>
        <div className='flex flex-col gap-y-3'>
          <button className='flex-1 w-full btn btn-danger '>Xác nhận</button>
          <button className='w-full font-normal text-blue-500 border border-blue-500 rounded-md shadow-none btn hover:bg-blue-50'>
            Gửi lại
          </button>
        </div>
        <div className='mt-4 text-sm text-center text-gray-500'>Mã OTP có thời hạn 3 phút</div>
      </div>
    </Modal>
  )
}

export default ConfirmPhoneNumberModal
