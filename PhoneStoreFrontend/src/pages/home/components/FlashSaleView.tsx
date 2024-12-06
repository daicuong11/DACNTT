import classNames from 'classnames'
import { Flame } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface FlashSaleViewProps {
  startTime: string
  endTime: string
}

const FlashSaleView: React.FC<FlashSaleViewProps> = ({ startTime, endTime }) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [saleActive, setSaleActive] = useState<boolean>(false)

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime()
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

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)

    return () => clearInterval(timer)
  }, [startTime, endTime])

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60
    return { hours, minutes, seconds }
  }

  if (timeLeft === null) {
    return (
      <div className='flex items-center justify-center h-screen p-4 text-white bg-gradient-to-r-from-primary rounded-xl'>
        <span className='text-2xl font-bold'>
          {saleActive ? 'Flash Sale đang diễn ra!' : 'Flash Sale đã kết thúc!'}
        </span>
      </div>
    )
  }

  const { hours, minutes, seconds } = formatTime(timeLeft)

  return (
    <div className='h-screen p-4 bg-gradient-to-r-from-primary rounded-xl'>
      <div className='flex items-center justify-between'>
        <div className='flex items-end text-white'>
          <span className='mr-2 border-2 border-white rounded-full'>
            <Flame size={34} strokeWidth={1.6} />
          </span>
          <span className='text-[38px] font-extrabold leading-[40px] uppercase'>Flash Sale</span>
          <div className='flex items-center ml-4 gap-x-1'>
            {!saleActive && <span className='text-sm font-bold'>Diễn ra sau:</span>}
            <span className='text-sm h-6 w-6 cursor-default py-1.5 leading-none px-1.5 rounded btn bg-black font-bold'>
              {String(hours).padStart(2, '0')}
            </span>
            <span className='font-bold'>:</span>
            <span className='text-sm h-6 w-6 cursor-default py-1.5 leading-none px-1.5 rounded btn bg-black font-bold'>
              {String(minutes).padStart(2, '0')}
            </span>
            <span className='font-bold'>:</span>
            <span className='text-sm h-6 w-6 cursor-default py-1.5 leading-none px-1.5 rounded btn bg-black font-bold'>
              {String(seconds).padStart(2, '0')}
            </span>
          </div>
        </div>
        <div className='flex gap-x-2'>
          <button
            className={classNames('text-sm font-semibold btn ', {
              'btn-light': false,
              'btn-warning': true
            })}
          >
            Điện thoại, Tablet
          </button>
          <button className='text-sm font-semibold btn btn-light'>Phụ kiện, TV</button>
          <button className='text-sm font-semibold btn btn-light'>Gia dụng</button>
        </div>
      </div>
    </div>
  )
}

export default FlashSaleView
