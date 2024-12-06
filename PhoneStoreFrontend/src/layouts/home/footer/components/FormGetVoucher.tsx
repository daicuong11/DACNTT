import { Button, Checkbox, Input, FormProps, Form } from 'antd'
import { FC } from 'react'

type FieldType = {
  email?: string
  phoneNumber?: string
}

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values)
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo)
}

const FormGetVoucher: FC = () => {
  return (
    <Form
      name='basic'
      style={{ maxWidth: 600 }}
      initialValues={{}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      className='w-full'
    >
      <Form.Item<FieldType>
        name='email'
        rules={[
          { required: true, message: 'Vui lòng điền email!' },
          { type: 'email', message: 'Email không hợp lệ!' }
        ]}
      >
        <Input placeholder='Email' />
      </Form.Item>

      <Form.Item<FieldType>
        name='phoneNumber'
        rules={[
          { required: true, message: 'Vui lòng điền số điện thoại!' },
          { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' }
        ]}
      >
        <Input
          type='number'
          placeholder='Số điện thoại'
          style={{ appearance: 'textfield', MozAppearance: 'textfield' }}
          className='reset-default-input-number'
        />
      </Form.Item>

      <Form.Item<FieldType>>
        <Checkbox checked className='text-xs text-red-600 cursor-not-allowed'>
          Tôi đồng ý với điều khoản của PhoneStore
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' className='w-full uppercase btn btn-primary'>
          Đăng ký ngay
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FormGetVoucher
