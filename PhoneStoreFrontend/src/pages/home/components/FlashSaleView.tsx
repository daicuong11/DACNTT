import classNames from 'classnames'
import { Flame } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { ProductType } from '../../../types/product.type'
import CarouselProduct from './CarouselProduct'

interface FlashSaleViewProps {
  startTime: string
  endTime: string
}

const listItems: ProductType[] = [
  {
    productId: 1,
    name: 'Apple MacBook Air M2 2024 8CPU 8GPU 16GB 256GB I Chính hãng Apple Việt Nam',
    description: 'Flagship killer with Snapdragon 888',
    price: 729,
    stock: 20,
    imageUrl: 'https://example.com/oneplus9.jpg',
    category: {
      categoryId: 1,
      name: 'Điện thoại, Tablet',
      description: 'Smartphones and tablets',
      imageUrl: 'https://example.com/category1.jpg'
    },
    brand: { brandId: 3, name: 'OnePlus', description: 'Leading smartphone manufacturer' },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    productId: 2,
    name: 'Sony WH-1000XM4',
    description: 'Industry leading noise cancelling headphones',
    price: 349,
    stock: 100,
    imageUrl: 'https://example.com/sonywh1000xm4.jpg',
    category: {
      categoryId: 2,
      name: 'Phụ kiện, TV',
      description: 'Accessories and televisions',
      imageUrl: 'https://example.com/category2.jpg'
    },
    brand: { brandId: 4, name: 'Sony', description: 'Renowned electronics manufacturer' },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    productId: 3,
    name: 'iPhone 13',
    description: 'Latest Apple iPhone with A15 Bionic chip',
    price: 999,
    stock: 50,
    imageUrl: 'https://example.com/iphone13.jpg',
    category: {
      categoryId: 1,
      name: 'Điện thoại, Tablet',
      description: 'Smartphones and tablets',
      imageUrl: 'https://example.com/category1.jpg'
    },
    brand: { brandId: 1, name: 'Apple', description: 'Innovative technology company' },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    productId: 4,
    name: 'Samsung Galaxy S21',
    description: 'Latest Samsung Galaxy with Exynos 2100',
    price: 899,
    stock: 30,
    imageUrl: 'https://example.com/galaxys21.jpg',
    category: {
      categoryId: 1,
      name: 'Điện thoại, Tablet',
      description: 'Smartphones and tablets',
      imageUrl: 'https://example.com/category1.jpg'
    },
    brand: { brandId: 2, name: 'Samsung', description: 'Global electronics leader' },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    productId: 5,
    name: 'OnePlus 9',
    description: 'Flagship killer with Snapdragon 888',
    price: 729,
    stock: 20,
    imageUrl: 'https://example.com/oneplus9.jpg',
    category: {
      categoryId: 1,
      name: 'Điện thoại, Tablet',
      description: 'Smartphones and tablets',
      imageUrl: 'https://example.com/category1.jpg'
    },
    brand: { brandId: 3, name: 'OnePlus', description: 'Leading smartphone manufacturer' },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    productId: 6,
    name: 'Sony WH-1000XM4',
    description: 'Industry leading noise cancelling headphones',
    price: 349,
    stock: 100,
    imageUrl: 'https://example.com/sonywh1000xm4.jpg',
    category: {
      categoryId: 2,
      name: 'Phụ kiện, TV',
      description: 'Accessories and televisions',
      imageUrl: 'https://example.com/category2.jpg'
    },
    brand: { brandId: 4, name: 'Sony', description: 'Renowned electronics manufacturer' },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    productId: 7,
    name: 'iPhone 13',
    description: 'Latest Apple iPhone with A15 Bionic chip',
    price: 999,
    stock: 50,
    imageUrl: 'https://example.com/iphone13.jpg',
    category: {
      categoryId: 1,
      name: 'Điện thoại, Tablet',
      description: 'Smartphones and tablets',
      imageUrl: 'https://example.com/category1.jpg'
    },
    brand: { brandId: 1, name: 'Apple', description: 'Innovative technology company' },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    productId: 8,
    name: 'Samsung Galaxy S21',
    description: 'Latest Samsung Galaxy with Exynos 2100',
    price: 899,
    stock: 30,
    imageUrl: 'https://example.com/galaxys21.jpg',
    category: {
      categoryId: 1,
      name: 'Điện thoại, Tablet',
      description: 'Smartphones and tablets',
      imageUrl: 'https://example.com/category1.jpg'
    },
    brand: { brandId: 2, name: 'Samsung', description: 'Global electronics leader' },
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const initListCategorySale = [
  {
    categoryId: 1,
    categoryName: 'Điện thoại, Tablet'
  },
  {
    categoryId: 2,
    categoryName: 'Phụ kiện, TV'
  },
  {
    categoryId: 3,
    categoryName: 'Gia dụng'
  }
]

const FlashSaleView: React.FC<FlashSaleViewProps> = ({ startTime, endTime }) => {
  const [categoryActive, setCategoryActive] = useState<number>(initListCategorySale[0].categoryId)
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
    <div className='p-[10px] bg-gradient-to-r-from-primary rounded-xl'>
      <div className='flex items-center justify-between px-2'>
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
          {initListCategorySale.map((category, index) => (
            <button
              key={index}
              disabled={category.categoryId === categoryActive}
              onClick={() => setCategoryActive(category.categoryId)}
              className={classNames('text-sm font-semibold btn ', {
                'btn-light': category.categoryId !== categoryActive,
                'btn-warning': category.categoryId === categoryActive
              })}
            >
              {category.categoryName}
            </button>
          ))}
        </div>
      </div>

      <CarouselProduct dataSource={listItems} />
    </div>
  )
}

export default FlashSaleView
