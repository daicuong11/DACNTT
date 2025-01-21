import { ConfigProvider, Radio } from 'antd'
import classNames from 'classnames'
import React from 'react'

interface AppRadioButtonProps {
  value: any
  children?: React.ReactNode
  className?: string
  checked?: boolean
}

const AppRadioButton: React.FC<AppRadioButtonProps> = ({
  checked = false,
  value = false,
  className = '',
  children
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#d70018',
          colorPrimaryBorder: '#d70018',
          colorPrimaryHover: '#d70018'
        }
      }}
    >
      <Radio checked={checked} value={value} className={classNames('text-[17px] text-black', className)}>
        {children}
      </Radio>
    </ConfigProvider>
  )
}

export default AppRadioButton
