import { useState } from 'react'

function useLocalStorage<T>(key: string, initialValue: T) {
  // Lấy giá trị từ localStorage khi hook được sử dụng
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return initialValue
    }
  })

  // Hàm lưu giá trị vào localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error('Error setting localStorage:', error)
    }
  }

  // Hàm xóa giá trị trong localStorage
  const removeValue = () => {
    try {
      localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.error('Error removing localStorage:', error)
    }
  }

  return [storedValue, setValue, removeValue] as const
}

export default useLocalStorage
