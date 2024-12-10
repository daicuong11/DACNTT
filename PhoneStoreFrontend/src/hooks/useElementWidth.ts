import { useState, useEffect, useRef } from 'react'

const useElementWidth = (): [React.RefObject<HTMLDivElement>, number] => {
  const elementRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState<number>(0)

  useEffect(() => {
    const updateWidth = () => {
      if (elementRef.current) {
        setWidth(elementRef.current.offsetWidth)
      }
    }

    window.addEventListener('resize', updateWidth)

    updateWidth()

    return () => {
      window.removeEventListener('resize', updateWidth)
    }
  }, [])

  return [elementRef, width]
}

export default useElementWidth
