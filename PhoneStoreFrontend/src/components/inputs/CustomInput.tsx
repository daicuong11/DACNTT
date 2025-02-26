import classNames from 'classnames'
import { EditIcon } from 'lucide-react'
import React, { FC, ReactElement, useEffect, useRef, useState } from 'react'

interface CustomInputProps {
  title?: string
  defaultValue?: string
  value?: string
  onChange?: (value: string) => void
  iconRight?: ReactElement
  iconRightOnClick?: () => void
  isShowIconRight?: boolean
  onClick?: () => void
}

const CustomInput: FC<CustomInputProps> = ({
  defaultValue = '',
  title,
  iconRight,
  value,
  onChange,
  iconRightOnClick,
  isShowIconRight = true,
  onClick
}) => {
  const [isEdit, setIsEdit] = useState(false)
  const [inputValue, setInputValue] = useState(defaultValue)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEdit) {
      inputRef.current?.focus()
    }
  }, [isEdit])

  const handleIconRightClick = () => {
    if (iconRightOnClick) {
      iconRightOnClick()
      return
    }
    setIsEdit(true)
    setInputValue('') // Clear nội dung khi vào chế độ edit
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  const handleOnBlur = () => {
    if (!inputValue.trim()) {
      // Nếu input rỗng, trả về defaultValue và tắt edit
      setIsEdit(false)
      setInputValue(defaultValue)
      if (onChange) {
        onChange(defaultValue)
      }
    }
  }

  return (
    <div
      onClick={onClick}
      className={classNames('flex relative flex-col z-10 justify-center group', { 'cursor-pointer': onClick })}
    >
      {title && (
        <div
          className={classNames(
            'text-sm font-medium text-gray-600 transition-transform duration-300 group-focus-within:text-primary',
            {
              'translate-y-0 opacity-100 text-xs': isEdit,
              'translate-y-7 translate-x-4 opacity-0': !isEdit
            }
          )}
        >
          {title}
        </div>
      )}
      <input
        ref={inputRef}
        className={classNames(
          'border-b w-full outline-none disabled:bg-white px-4 text-sm font-normal text-gray-600 py-1.5',
          {
            'pr-12': isShowIconRight,
            'cursor-pointer': onClick,
            'focus:border-primary': isEdit
          }
        )}
        readOnly={!isEdit}
        value={inputValue}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
      />
      {isShowIconRight && !isEdit && (
        <span onClick={handleIconRightClick} className='absolute right-2 p-2 rounded cursor-pointer'>
          {iconRight || <EditIcon size={16} strokeWidth={1.6} />}
        </span>
      )}
    </div>
  )
}

export default CustomInput
