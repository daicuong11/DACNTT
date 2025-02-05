import React, { useEffect } from 'react'
import { useLoginWithEmailAndPassword } from '../../hooks/querys/auth'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setAuth } from '../../features/auth/auth.slice'
import { Button, Form, FormProps, Input, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { MyDivider } from '@/components'
import { google_logo, robot_hello } from '@/assets/images'
import { GoogleOutlined } from '@ant-design/icons'
import useSetDocTitle from '@/hooks/useSetDocTitle'

type FieldType = {
  phoneNumber?: string
  password?: string
}

const Login: React.FC = () => {
  useSetDocTitle('BC Mobile | Đăng nhập')
  const navigate = useNavigate()

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

  const handleLogin: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values)
  }

  return (
    <div className='w-full pt-5'>
      <div className='max-w-[700px] mx-auto min-h-screen'>
        <button onClick={() => navigate(-1)} className='invisible p-1 text-black/70 hover:text-black'>
          <ArrowLeft size={28} strokeWidth={1.6} />
        </button>
        <div className='flex flex-col items-center py-6 gap-y-4'>
          <img className='w-[100px] h-[100px] object-cover' src={robot_hello} />
          <div className='text-[22px] font-bold font-roboto'>Đăng nhập với</div>
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

        <Form initialValues={{ phoneNumber: '', password: '' }} onFinish={handleLogin} autoComplete='off'>
          <Form.Item<FieldType>
            name='phoneNumber'
            rules={[
              { required: true, message: 'Vui lòng điền số điện thoại!' },
              { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' }
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

          <Form.Item<FieldType> name='password' rules={[{ required: true, message: 'Vui lòng điền mật khẩu!' }]}>
            <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
              <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Mật khẩu</div>
              <Input.Password variant='borderless' placeholder='Nhập mật khẩu' allowClear className='text-base' />
            </div>
          </Form.Item>
          <div className='flex justify-end mt-3'>
            <button className='text-sm text-gray-500 hover:underline hover:text-primary'>Quên mệt khẩu?</button>
          </div>
          <div className='flex flex-col items-center mt-3 gap-y-4'>
            <button type='submit' className='w-full py-2 btn btn-danger'>
              Đăng nhập
            </button>
            <div className='text-sm text-gray-500'>
              Bạn chưa có tài khoản?{' '}
              <span onClick={() => navigate('/register')} className='font-medium cursor-pointer text-primary'>
                Đăng ký ngay
              </span>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login
