import React, { useEffect, useState } from 'react'

interface CountdownTimerProps {
  startTime: string
  endTime: string
  onSaleStatusChange?: (isActive: boolean) => void
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ startTime, endTime, onSaleStatusChange }) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [saleActive, setSaleActive] = useState(false)

  const calculateTimeLeft = () => {
    const now = Date.now()
    const start = new Date(startTime).getTime()
    const end = new Date(endTime).getTime()

    if (now < start) {
      setTimeLeft(Math.floor((start - now) / 1000))
      setSaleActive(false)
    } else if (now >= start && now <= end) {
      setTimeLeft(Math.floor((end - now) / 1000))
      setSaleActive(true)
    } else {
      setTimeLeft(null)
      setSaleActive(false)
    }
  }

  useEffect(() => {
    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [startTime, endTime])

  useEffect(() => {
    if (onSaleStatusChange) {
      onSaleStatusChange(saleActive)
    }
  }, [saleActive, onSaleStatusChange])

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60
    return { hours, minutes, seconds }
  }

  if (timeLeft === null) {
    return (
      <span className='text-2xl font-bold'>{saleActive ? 'Flash Sale đang diễn ra!' : 'Flash Sale đã kết thúc!'}</span>
    )
  }

  const { hours, minutes, seconds } = formatTime(timeLeft)

  return (
    <div className='flex items-center gap-x-1'>
      {!saleActive && <span className='text-sm font-bold'>Diễn ra sau:</span>}
      <span className='text-sm h-6 flex justify-center text-center py-1.5 px-1 rounded btn bg-black font-bold'>
        {String(hours).padStart(2, '0')}
      </span>
      <span className='font-bold'>:</span>
      <span className='text-sm h-6 flex justify-center text-center py-1.5 px-1 rounded btn bg-black font-bold'>
        {String(minutes).padStart(2, '0')}
      </span>
      <span className='font-bold'>:</span>
      <span className='text-sm h-6 flex justify-center text-center py-1.5 px-1 rounded btn bg-black font-bold'>
        {String(seconds).padStart(2, '0')}
      </span>
    </div>
  )
}

export default CountdownTimer
