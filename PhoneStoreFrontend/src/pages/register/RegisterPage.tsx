import React, { useEffect } from 'react'
import { useLoginWithEmailAndPassword } from '../../hooks/querys/auth'
import { useAppDispatch, useAppSelector, useModal } from '../../hooks'
import { setAuth } from '../../features/auth/auth.slice'
import { Form, FormProps, Input, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { AppCheckBox, ConfirmPhoneNumberModal, MyDivider } from '@/components'
import { google_logo, robot_hello } from '@/assets/images'
import useSetDocTitle from '@/hooks/useSetDocTitle'

type FieldType = {
  fullName?: string
  phoneNumber?: string
  email?: string
  password?: string
  confirmPassword?: string
}

const RegisterPage: React.FC = () => {
  useSetDocTitle('BC Mobile | Đăng nhập')
  const navigate = useNavigate()

  const [phoneNumber, setPhoneNumber] = React.useState('0333333333')

  const confirmPhoneNumberModalController = useModal()

  // const currentUser = useAppSelector((state) => state.auth.currentUser)
  // const { mutate, data, isPending, isSuccess } = useLoginWithEmailAndPassword()
  // const dispatch = useAppDispatch()

  // // Xử lý cập nhật auth khi mutation thành công
  // useEffect(() => {
  //   if (isSuccess && data) {
  //     const auth = data.data
  //     dispatch(setAuth(auth))
  //     navigate('/') // Chuyển hướng sau khi login thành công
  //   }
  // }, [isSuccess, data, dispatch, navigate])

  // const handleLogin = () => {
  //   mutate({ email: 'Admin@gmail.com', password: '123456' })
  // }

  // if (isPending) {
  //   return (
  //     <div className='fixed inset-0 flex items-center justify-center'>
  //       <Spin />
  //     </div>
  //   )
  // }

  const handleRegister: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values)
    setPhoneNumber(values.phoneNumber || '')
    confirmPhoneNumberModalController.openModal()
  }

  return (
    <div className='w-full pt-5 pb-10'>
      <ConfirmPhoneNumberModal
        isOpen={confirmPhoneNumberModalController.isOpen}
        phoneNumber={phoneNumber}
        closeModal={confirmPhoneNumberModalController.closeModal}
      />
      <div className='max-w-[700px] mx-auto min-h-screen'>
        <button onClick={() => navigate('/signin')} className='p-1 text-black/70 hover:text-black'>
          <ArrowLeft size={28} strokeWidth={1.6} />
        </button>
        <div className='flex flex-col items-center py-6 gap-y-4'>
          <img className='w-[100px] h-[100px] object-cover' src={robot_hello} />
          <div className='text-[22px] font-bold font-roboto'>Đăng ký với</div>
          <button className='flex items-center justify-center px-4 py-2 border border-gray-100 gap-x-3 btn btn-light'>
            <img className='flex-shrink-0 object-cover w-6 h-6' src={google_logo} />
            <span className='text-lg text-black'>Google</span>
          </button>
          <div className='flex items-center justify-center gap-x-4'>
            <div className='h-px bg-gray-300 w-44'></div>
            <div className='text-gray-600'>hoặc</div>
            <div className='h-px bg-gray-300 w-44'></div>
          </div>
        </div>

        <Form
          initialValues={{ fullName: '', phoneNumber: '', email: '', password: '', confirmPassword: '' }}
          onFinish={handleRegister}
          autoComplete='off'
        >
          <Form.Item<FieldType>
            name='fullName'
            rules={[
              { required: true, message: 'Vui lòng nhập họ và tên' },
              { min: 3, message: 'Họ và tên phải có ít nhất 3 ký tự' },
              { max: 200, message: 'Họ và tên không được quá 200 ký tự' }
            ]}
          >
            <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
              <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Họ và tên</div>
              <Input variant='borderless' placeholder='Nhập họ và tên' allowClear className='text-base' />
            </div>
          </Form.Item>
          <Form.Item<FieldType>
            name='phoneNumber'
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại' },
              { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ' }
            ]}
          >
            <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
              <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Số điện thoại</div>
              <Input
                variant='borderless'
                placeholder='Nhập số điện thoại'
                allowClear
                className='text-base'
                maxLength={10}
              />
            </div>
          </Form.Item>
          <Form.Item<FieldType>
            name='email'
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' }
            ]}
          >
            <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
              <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Email</div>
              <Input type='email' variant='borderless' placeholder='Nhập email' allowClear className='text-base' />
            </div>
          </Form.Item>
          <Form.Item<FieldType>
            name={'password'}
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu' },
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
              { max: 32, message: 'Mật khẩu không được quá 32 ký tự' }
            ]}
          >
            <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
              <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Mật khẩu</div>
              <Input.Password variant='borderless' placeholder='Nhập mật khẩu' allowClear className='text-base' />
            </div>
          </Form.Item>
          <Form.Item<FieldType>
            name={'confirmPassword'}
            rules={[
              { required: true, message: 'Vui lòng nhập lại mật khẩu' },
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
              { max: 32, message: 'Mật khẩu không được quá 32 ký tự' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Mật khẩu không khớp'))
                }
              })
            ]}
          >
            <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
              <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Nhập lại mật khẩu</div>
              <Input.Password variant='borderless' placeholder='Nhập lại mật khẩu' allowClear className='text-base' />
            </div>
          </Form.Item>
          <div className='flex'>
            <AppCheckBox value className='text-sm text-gray-500'>
              Bằng việc đăng ký, bạn đã đồng ý với các điều khoản sử dụng và chính sách bảo mật
            </AppCheckBox>
          </div>
          <div className='flex flex-col items-center mt-4 gap-y-4'>
            <button type='submit' className='w-full py-2 btn btn-danger'>
              Đăng ký
            </button>
            <div className='text-sm text-gray-500'>
              Bạn đã có tài khoản?{' '}
              <span onClick={() => navigate('/signin')} className='font-medium cursor-pointer text-primary'>
                Đăng nhập ngay
              </span>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default RegisterPage
