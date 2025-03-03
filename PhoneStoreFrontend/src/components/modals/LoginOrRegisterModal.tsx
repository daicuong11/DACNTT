import { Modal } from 'antd'
import React, { FC } from 'react'
import { robot_hello } from '@/assets/images'
import { useNavigate } from 'react-router-dom'

interface LoginOfRegisterModal {
  isOpen: boolean
  onClose: () => void
  title?: string
}

const LoginOfRegisterModal: FC<LoginOfRegisterModal> = ({
  isOpen,
  onClose,
  title = 'Vui lòng đăng nhập tài khoản để xem ưu đãi và thanh toán dễ dàng hơn.'
}) => {
  const navigate = useNavigate()
  return (
    <Modal
      title={<div className='text-xl font-semibold text-center text-primary'>Tài khoản</div>}
      centered
      open={isOpen}
      onOk={onClose}
      onCancel={onClose}
      width={400}
      footer={
        <div className='flex items-center justify-between gap-x-4'>
          <button
            onClick={() => {
              navigate('/register')
              onClose()
            }}
            className='hover:scale-[1.02] ease-linear w-full text-lg !border-2 btn border-[#d70018] text-[#d70018] bg-white'
          >
            Đăng ký
          </button>
          <button
            onClick={() => {
              navigate('/signin')
              onClose()
            }}
            className='w-full hover:scale-[1.02] text-lg text-white btn bg-gradient-to-r-from-primary hover:bg-gradient-to-l'
          >
            Đăng nhập
          </button>
        </div>
      }
    >
      <div className='flex flex-col items-center justify-center py-5 gap-y-3'>
        <img className='w-[80px] object-contain' src={robot_hello} />
        <div className='text-sm font-medium text-center'>{title}</div>
      </div>
    </Modal>
  )
}

export default LoginOfRegisterModal
