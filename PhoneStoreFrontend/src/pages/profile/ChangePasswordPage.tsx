import { robot_hello } from '@/assets/images'
import { LoadingItem } from '@/components'
import { useAppSelector } from '@/hooks'
import { useChangePassword } from '@/hooks/querys/auth.query'
import { Form, FormProps, Input } from 'antd'
import { ArrowLeft } from 'lucide-react'
import { Navigate, useNavigate } from 'react-router-dom'

type FieldType = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const ChangePasswordPage = () => {
  const navigate = useNavigate()

  const currentUser = useAppSelector((state) => state.auth.user)
  const { mutate, isPending } = useChangePassword()

  if (!currentUser) {
    return <Navigate to='/signin' />
  }

  const handleChangePassword: FormProps<FieldType>['onFinish'] = (values) => {
    const { currentPassword, newPassword } = values
    if (!currentUser) return
    const userId = currentUser.id
    mutate(
      { userId, oldPassword: currentPassword, newPassword },
      {
        onSuccess: () => {
          navigate(-1)
        }
      }
    )
  }

  return (
    <div className='flex flex-col py-5 pb-20 bg-white rounded-md mt-1 min-h-screen'>
      <div className='flex items-center'>
        <span onClick={() => navigate(-1)} className='px-3 text-gray-400 cursor-pointer hover:text-gray-600'>
          <ArrowLeft size={26} strokeWidth={1.6} />
        </span>
        <div className='text-2xl font-semibold text-black'>Tạo mật khẩu mới</div>
      </div>

      <div className='flex justify-center items-center my-10'>
        <img className='w-44 object-contain' src={robot_hello} />
      </div>

      <Form
        initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
        onFinish={handleChangePassword}
        autoComplete='off'
        className='px-5'
      >
        <Form.Item<FieldType>
          name={'currentPassword'}
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu hiện tại' },
            { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
            { max: 32, message: 'Mật khẩu không được quá 32 ký tự' }
          ]}
        >
          <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
            <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Mật khẩu hiện tại</div>
            <Input.Password
              name='currentPassword'
              id='currentPassword'
              variant='borderless'
              placeholder='Nhập mật khẩu hiện tại'
              allowClear
              className='text-base'
            />
          </div>
        </Form.Item>
        <Form.Item<FieldType>
          name={'newPassword'}
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu' },
            { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
            { max: 32, message: 'Mật khẩu không được quá 32 ký tự' }
          ]}
        >
          <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
            <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>Mật khẩu mới</div>
            <Input.Password
              name='newPassword'
              id='newPassword'
              variant='borderless'
              placeholder='Nhập mật khẩu mới'
              allowClear
              className='text-base'
            />
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
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Mật khẩu không khớp'))
              }
            })
          ]}
        >
          <div className='flex flex-col gap-y-2.5 border-b transition-all focus-within:border-blue-600 group'>
            <div className='text-xs text-gray-500 uppercase group-focus-within:text-blue-600'>
              Xác nhận lại Mật khẩu mới
            </div>
            <Input.Password
              name='confirmPassword'
              id='confirmPassword'
              variant='borderless'
              placeholder='Xác nhận lại mật khẩu mới'
              allowClear
              className='text-base'
            />
          </div>
        </Form.Item>

        <button disabled={isPending} type='submit' className='w-full py-2 btn btn-danger'>
          {isPending ? <LoadingItem className='border-white' /> : 'Xác nhận đổi'}
        </button>
      </Form>
    </div>
  )
}

export default ChangePasswordPage
