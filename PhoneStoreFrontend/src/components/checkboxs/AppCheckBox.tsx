import { Checkbox, ConfigProvider } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import classNames from 'classnames'
import React from 'react'

interface AppCheckBoxProps {
  value?: boolean
  onChange?: (e: CheckboxChangeEvent) => void
  children?: React.ReactNode
  className?: string
}

const AppCheckBox: React.FC<AppCheckBoxProps> = ({ value = false, onChange, children, className }) => {
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
      <Checkbox checked={value} onChange={onChange} className={classNames('text-[17px] text-black', className)}>
        {children}
      </Checkbox>
    </ConfigProvider>
  )
}

export default AppCheckBox
