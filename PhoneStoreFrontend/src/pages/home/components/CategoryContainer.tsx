import { Smartphone } from 'lucide-react'
import CategoryItem from './CategoryItem'
import { CategoryRenderType } from '../../../types/category.type'

const listCategory: CategoryRenderType[] = [
  {
    icon: <Smartphone strokeWidth={1.4} size={24} />,
    name: 'Điện thoại',
    options: [
      {
        title: 'Hãng điện thoại',
        baseUrl: '/brand/mobile',
        listSelection: [
          { id: 1, title: 'Iphone' },
          { id: 2, title: 'Samsum' },
          { id: 3, title: 'Xiaomi' },
          { id: 4, title: 'OPPO' }
        ]
      },
      {
        title: 'Mức giá hiện tại',
        baseUrl: '/filter/mobile',
        listSelection: [
          { title: 'Dưới 2 triệu', params: 'price=0-2000000' },
          { title: 'Từ 2 - 4 triệu', params: 'price=2000000-4000000' },
          { title: 'Từ 4 - 7 triệu', params: 'price=4000000-7000000' },
          { title: 'Từ 7 - 13 triệu', params: 'price=7000000-13000000' }
        ]
      },
      {
        title: 'Điện thoại HOT',
        baseUrl: '/mobile',
        listSelection: [
          { id: 1, title: 'Iphone 13 Pro Max' },
          { id: 2, title: 'Samsum Galaxy S21 Ultra' },
          { id: 3, title: 'Xiaomi Redmi Note 10 Pro' },
          { id: 4, title: 'OPPO Reno 6 Pro' },
          { id: 5, title: 'Iphone 12 Pro Max' }
        ]
      },
      {
        title: 'Phụ kiện điện thoại',
        baseUrl: '/accessory/mobile',
        listSelection: [
          { id: 1, title: 'Ốp lưng' },
          { id: 2, title: 'Dán cường lực' },
          { id: 3, title: 'Tai nghe' },
          { id: 4, title: 'Sạc dự phòng' }
        ]
      }
    ]
  },
  {
    icon: <Smartphone strokeWidth={1.4} size={24} />,
    name: 'Laptop',
    options: [
      {
        title: 'Hãng Laptop',
        baseUrl: '/brand/laptop',
        listSelection: [
          { id: 1, title: 'Dell' },
          { id: 2, title: 'HP' },
          { id: 3, title: 'Asus' },
          { id: 4, title: 'Macbook' }
        ]
      },
      {
        title: 'Mức giá hiện tại',
        baseUrl: '/filter/laptop',
        listSelection: [
          { title: 'Dưới 10 triệu', params: 'price=0-10000000' },
          { title: 'Từ 10 - 20 triệu', params: 'price=10000000-20000000' },
          { title: 'Từ 20 - 30 triệu', params: 'price=20000000-30000000' },
          { title: 'Trên 30 triệu', params: 'price=30000000-100000000' }
        ]
      },
      {
        title: 'Laptop HOT',
        baseUrl: '/laptop',
        listSelection: [
          { id: 1, title: 'Dell XPS 13' },
          { id: 2, title: 'HP Spectre x360' },
          { id: 3, title: 'Asus ZenBook 14' },
          { id: 4, title: 'Macbook Pro 2021' },
          { id: 5, title: 'Dell Inspiron 15' },
          { id: 6, title: 'HP Envy 13' },
          { id: 7, title: 'Asus VivoBook 15' },
          { id: 8, title: 'Macbook Air 2021' },
          { id: 9, title: 'Dell G5 15' }
        ]
      }
    ]
  },
  {
    icon: <Smartphone strokeWidth={1.4} size={24} />,
    name: 'Tablet',
    options: [
      {
        title: 'Hãng Tablet',
        baseUrl: '/brand/tablet',
        listSelection: [
          { id: 1, title: 'Ipad' },
          { id: 2, title: 'Samsum' },
          { id: 3, title: 'Xiaomi' },
          { id: 4, title: 'Huawei' },
          { id: 5, title: 'Lenovo' },
          { id: 6, title: 'Asus' },
          { id: 7, title: 'Microsoft' },
          { id: 8, title: 'Amazon' }
        ]
      },
      {
        title: 'Mức giá hiện tại',
        baseUrl: '/filter/tablet',
        listSelection: [
          { title: 'Dưới 5 triệu', params: 'price=0-5000000' },
          { title: 'Từ 5 - 10 triệu', params: 'price=5000000-10000000' },
          { title: 'Từ 10 - 15 triệu', params: 'price=10000000-15000000' },
          { title: 'Trên 15 triệu', params: 'price=15000000-100000000' },
          { title: 'Trên 15 triệu', params: 'price=15000000-100000000' },
          { title: 'Trên 15 triệu', params: 'price=15000000-100000000' },
          { title: 'Trên 15 triệu', params: 'price=15000000-100000000' }
        ]
      },
      {
        title: 'Tablet HOT',
        baseUrl: '/tablet',
        listSelection: [
          { id: 1, title: 'Ipad Pro 2021' },
          { id: 2, title: 'Samsum Galaxy Tab S7+' },
          { id: 3, title: 'Xiaomi Pad 5' },
          { id: 4, title: 'Huawei MatePad Pro 12.6' },
          { id: 5, title: 'Ipad Air 2020' },
          { id: 1, title: 'Ipad Pro 2021' },
          { id: 2, title: 'Samsum Galaxy Tab S7+' },
          { id: 3, title: 'Xiaomi Pad 5' },
          { id: 4, title: 'Huawei MatePad Pro 12.6' },
          { id: 5, title: 'Ipad Air 2020' }
        ]
      }
    ]
  },
  {
    icon: <Smartphone strokeWidth={1.4} size={24} />,
    name: 'Âm thanh',
    options: []
  },
  {
    icon: <Smartphone strokeWidth={1.4} size={24} />,
    name: 'Đồng hồ',
    options: []
  },
  {
    icon: <Smartphone strokeWidth={1.4} size={24} />,
    name: 'Camera',
    options: []
  },
  {
    icon: <Smartphone strokeWidth={1.4} size={24} />,
    name: 'Phụ kiện',
    options: []
  },
  {
    icon: <Smartphone strokeWidth={1.4} size={24} />,
    name: 'Âm thanh',
    options: []
  },
  {
    icon: <Smartphone strokeWidth={1.4} size={24} />,
    name: 'Đồng hồ',
    options: []
  },
  {
    icon: <Smartphone strokeWidth={1.4} size={24} />,
    name: 'Camera',
    options: []
  },
  {
    icon: <Smartphone strokeWidth={1.4} size={24} />,
    name: 'Phụ kiện',
    options: []
  }
]

const CategoryContainer = () => {
  return (
    <div className='relative md:block hidden flex-shrink-0 bg-white rounded-xl w-[220px] text-xs shadow shadow-slate-900/20'>
      {listCategory.map((item, index) => (
        <CategoryItem isFirst={index === 0} isLast={index === listCategory.length - 1} key={index} data={item} />
      ))}
    </div>
  )
}

export default CategoryContainer
