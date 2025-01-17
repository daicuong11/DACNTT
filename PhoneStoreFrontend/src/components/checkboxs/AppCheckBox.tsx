import { Checkbox, ConfigProvider } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import React from 'react'

interface AppCheckBoxProps {
  value?: boolean
  onChange?: (e: CheckboxChangeEvent) => void
  children?: React.ReactNode
}

const AppCheckBox: React.FC<AppCheckBoxProps> = ({ value = false, onChange, children }) => {
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
      <Checkbox checked={value} onChange={onChange} className='text-[17px] text-black'>
        {children}
      </Checkbox>
    </ConfigProvider>
  )
}

export default AppCheckBox
