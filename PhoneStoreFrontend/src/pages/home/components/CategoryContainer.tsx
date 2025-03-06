import {
  Cable,
  Camera,
  Headphones,
  HousePlus,
  Laptop,
  PcCase,
  Printer,
  Smartphone,
  TabletSmartphone,
  Tv,
  Tv2,
  Watch
} from 'lucide-react'
import CategoryItem from './CategoryItem'
import { CategoryRenderType } from '../../../types/category.type'
const listCategory: CategoryRenderType[] = [
  {
    icon: <Smartphone strokeWidth={1.4} size={24} />,
    name: 'Điện thoại',
    options: [
      {
        title: 'Hãng điện thoại',
        baseUrl: '/mobile',
        listSelection: [
          { title: 'Apple' },
          { id: 2, title: 'Samsung' },
          { id: 3, title: 'Xiaomi' },
          { id: 4, title: 'OPPO' }
        ]
      },
      {
        title: 'Mức giá hiện tại',
        baseUrl: '/mobile',
        listSelection: [
          { title: 'Dưới 2 triệu', params: 'price=0-2000000' },
          { title: 'Từ 2 - 4 triệu', params: 'price=2000000-4000000' },
          { title: 'Từ 4 - 7 triệu', params: 'price=4000000-7000000' },
          { title: 'Từ 7 - 13 triệu', params: 'price=7000000-13000000' },
          { title: 'Từ 13 - 20 triệu', params: 'price=13000000-20000000' },
          { title: 'Trên 20 triệu', params: 'price=20000000-100000000' }
        ]
      },
      {
        title: 'Điện thoại HOT',
        baseUrl: '/mobile',
        listSelection: [
          { id: 1, title: 'Iphone 13 Pro Max' },
          { id: 2, title: 'Samsung Galaxy S21 Ultra' }, // Fixed typo: "Samsum" -> "Samsung"
          { id: 3, title: 'Xiaomi Redmi Note 10 Pro' },
          { id: 4, title: 'OPPO Reno 6 Pro' },
          { id: 5, title: 'Iphone 12 Pro Max' }
        ]
      }
    ]
  },
  {
    icon: <Laptop strokeWidth={1.4} size={24} />,
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
        baseUrl: '/laptop',
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
          { id: 5, title: 'Dell Inspiron 15' }
        ]
      }
    ]
  },
  {
    icon: <TabletSmartphone strokeWidth={1.4} size={24} />,
    name: 'Máy tính bảng',
    options: [
      {
        title: 'Hãng Tablet',
        baseUrl: '/brand/tablet',
        listSelection: [
          { id: 1, title: 'Ipad' },
          { id: 2, title: 'Samsung' }, // Fixed typo: "Samsum" -> "Samsung"
          { id: 3, title: 'Xiaomi' },
          { id: 4, title: 'Huawei' },
          { id: 5, title: 'Lenovo' }
        ]
      },
      {
        title: 'Mức giá hiện tại',
        baseUrl: '/tablet',
        listSelection: [
          { title: 'Dưới 2 triệu', params: 'price=0-2000000' },
          { title: 'Từ 2 - 4 triệu', params: 'price=2000000-4000000' },
          { title: 'Từ 4 - 7 triệu', params: 'price=4000000-7000000' },
          { title: 'Từ 7 - 13 triệu', params: 'price=7000000-13000000' },
          { title: 'Trên 13 triệu', params: 'price=13000000-100000000' }
        ]
      },
      {
        title: 'Tablet HOT',
        baseUrl: '/tablet',
        listSelection: [
          { id: 1, title: 'Ipad Pro 2021' },
          { id: 2, title: 'Samsung Galaxy Tab S7+' }, // Fixed typo: "Samsum" -> "Samsung"
          { id: 3, title: 'Xiaomi Pad 5' },
          { id: 4, title: 'Huawei MatePad Pro 12.6' },
          { id: 5, title: 'Ipad Air 2020' }
        ]
      }
    ]
  },
  {
    icon: <Headphones strokeWidth={1.4} size={24} />,
    name: 'Âm thanh',
    options: [
      {
        title: 'Hãng âm thanh',
        baseUrl: '/brand/audio',
        listSelection: [
          { id: 1, title: 'Sony' },
          { id: 2, title: 'JBL' },
          { id: 3, title: 'Bose' },
          { id: 4, title: 'Sennheiser' }
        ]
      },
      {
        title: 'Mức giá hiện tại',
        baseUrl: '/audio',
        listSelection: [
          { title: 'Dưới 500 nghìn', params: 'price=0-500000' },
          { title: 'Từ 500 nghìn - 1 triệu', params: 'price=500000-1000000' },
          { title: 'Từ 1 - 3 triệu', params: 'price=1000000-3000000' },
          { title: 'Trên 3 triệu', params: 'price=3000000-10000000' }
        ]
      },
      {
        title: 'Âm thanh HOT',
        baseUrl: '/audio',
        listSelection: [
          { id: 1, title: 'Sony WH-1000XM4' },
          { id: 2, title: 'JBL Flip 5' },
          { id: 3, title: 'Bose QuietComfort 35 II' },
          { id: 4, title: 'Sennheiser Momentum 3' }
        ]
      }
    ]
  },
  {
    icon: <Watch strokeWidth={1.4} size={24} />,
    name: 'Đồng hồ',
    options: [
      {
        title: 'Hãng đồng hồ',
        baseUrl: '/brand/watch',
        listSelection: [
          { id: 1, title: 'Rolex' },
          { id: 2, title: 'Casio' },
          { id: 3, title: 'Seiko' },
          { id: 4, title: 'Apple Watch' }
        ]
      },
      {
        title: 'Mức giá hiện tại',
        baseUrl: '/watch',
        listSelection: [
          { title: 'Dưới 1 triệu', params: 'price=0-1000000' },
          { title: 'Từ 1 - 5 triệu', params: 'price=1000000-5000000' },
          { title: 'Từ 5 - 20 triệu', params: 'price=5000000-20000000' },
          { title: 'Trên 20 triệu', params: 'price=20000000-1000000000' }
        ]
      },
      {
        title: 'Đồng hồ HOT',
        baseUrl: '/watch',
        listSelection: [
          { id: 1, title: 'Rolex Submariner' },
          { id: 2, title: 'Casio G-Shock' },
          { id: 3, title: 'Seiko Prospex' },
          { id: 4, title: 'Apple Watch Series 8' }
        ]
      }
    ]
  },
  {
    icon: <Camera strokeWidth={1.4} size={24} />,
    name: 'Camera',
    options: [
      {
        title: 'Hãng Camera',
        baseUrl: '/brand/camera',
        listSelection: [
          { id: 1, title: 'Canon' },
          { id: 2, title: 'Sony' },
          { id: 3, title: 'Nikon' },
          { id: 4, title: 'Fujifilm' }
        ]
      },
      {
        title: 'Mức giá hiện tại',
        baseUrl: '/camera',
        listSelection: [
          { title: 'Dưới 5 triệu', params: 'price=0-5000000' },
          { title: 'Từ 5 - 15 triệu', params: 'price=5000000-15000000' },
          { title: 'Từ 15 - 30 triệu', params: 'price=15000000-30000000' },
          { title: 'Trên 30 triệu', params: 'price=30000000-100000000' }
        ]
      },
      {
        title: 'Camera HOT',
        baseUrl: '/camera',
        listSelection: [
          { id: 1, title: 'Canon EOS R6' },
          { id: 2, title: 'Sony A7 III' },
          { id: 3, title: 'Nikon Z6 II' },
          { id: 4, title: 'Fujifilm X-T4' }
        ]
      }
    ]
  },
  {
    icon: <Cable strokeWidth={1.4} size={24} />,
    name: 'Phụ kiện',
    options: [
      {
        title: 'Hãng phụ kiện',
        baseUrl: '/brand/accessory',
        listSelection: [
          { id: 1, title: 'Anker' },
          { id: 2, title: 'Belkin' },
          { id: 3, title: 'Xiaomi' },
          { id: 4, title: 'Samsung' }
        ]
      },
      {
        title: 'Mức giá hiện tại',
        baseUrl: '/accessory',
        listSelection: [
          { title: 'Dưới 200 nghìn', params: 'price=0-200000' },
          { title: 'Từ 200 - 500 nghìn', params: 'price=200000-500000' },
          { title: 'Từ 500 nghìn - 1 triệu', params: 'price=500000-1000000' },
          { title: 'Trên 1 triệu', params: 'price=1000000-5000000' }
        ]
      },
      {
        title: 'Phụ kiện HOT',
        baseUrl: '/accessory',
        listSelection: [
          { id: 1, title: 'Anker PowerCore 10000' },
          { id: 2, title: 'Belkin USB-C Hub' },
          { id: 3, title: 'Xiaomi Mi Band 6' },
          { id: 4, title: 'Samsung Wireless Charger' }
        ]
      }
    ]
  },
  {
    icon: <Tv strokeWidth={1.4} size={24} />,
    name: 'Tivi',
    options: [
      {
        title: 'Hãng Tivi',
        baseUrl: '/brand/tv',
        listSelection: [
          { id: 1, title: 'Samsung' },
          { id: 2, title: 'LG' },
          { id: 3, title: 'Sony' },
          { id: 4, title: 'TCL' }
        ]
      },
      {
        title: 'Mức giá hiện tại',
        baseUrl: '/tv',
        listSelection: [
          { title: 'Dưới 5 triệu', params: 'price=0-5000000' },
          { title: 'Từ 5 - 10 triệu', params: 'price=5000000-10000000' },
          { title: 'Từ 10 - 20 triệu', params: 'price=10000000-20000000' },
          { title: 'Trên 20 triệu', params: 'price=20000000-100000000' }
        ]
      },
      {
        title: 'Tivi HOT',
        baseUrl: '/tv',
        listSelection: [
          { id: 1, title: 'Samsung QLED Q80A' },
          { id: 2, title: 'LG OLED C1' },
          { id: 3, title: 'Sony Bravia X90J' },
          { id: 4, title: 'TCL 6-Series' }
        ]
      }
    ]
  },
  {
    icon: <PcCase strokeWidth={1.4} size={24} />,
    name: 'PC',
    options: [
      {
        title: 'Hãng PC',
        baseUrl: '/brand/pc',
        listSelection: [
          { id: 1, title: 'Dell' },
          { id: 2, title: 'HP' },
          { id: 3, title: 'Asus' },
          { id: 4, title: 'Lenovo' }
        ]
      },
      {
        title: 'Mức giá hiện tại',
        baseUrl: '/pc',
        listSelection: [
          { title: 'Dưới 10 triệu', params: 'price=0-10000000' },
          { title: 'Từ 10 - 20 triệu', params: 'price=10000000-20000000' },
          { title: 'Từ 20 - 40 triệu', params: 'price=20000000-40000000' },
          { title: 'Trên 40 triệu', params: 'price=40000000-100000000' }
        ]
      },
      {
        title: 'PC HOT',
        baseUrl: '/pc',
        listSelection: [
          { id: 1, title: 'Dell Alienware Aurora' },
          { id: 2, title: 'HP Omen 30L' },
          { id: 3, title: 'Asus ROG Strix' },
          { id: 4, title: 'Lenovo Legion Tower 5' }
        ]
      }
    ]
  },
  {
    icon: <Tv2 strokeWidth={1.4} size={24} />,
    name: 'Màn hình',
    options: [
      {
        title: 'Hãng màn hình',
        baseUrl: '/brand/monitor',
        listSelection: [
          { id: 1, title: 'Dell' },
          { id: 2, title: 'LG' },
          { id: 3, title: 'Samsung' },
          { id: 4, title: 'Asus' }
        ]
      },
      {
        title: 'Mức giá hiện tại',
        baseUrl: '/monitor',
        listSelection: [
          { title: 'Dưới 3 triệu', params: 'price=0-3000000' },
          { title: 'Từ 3 - 7 triệu', params: 'price=3000000-7000000' },
          { title: 'Từ 7 - 15 triệu', params: 'price=7000000-15000000' },
          { title: 'Trên 15 triệu', params: 'price=15000000-50000000' }
        ]
      },
      {
        title: 'Màn hình HOT',
        baseUrl: '/monitor',
        listSelection: [
          { id: 1, title: 'Dell UltraSharp U2720Q' },
          { id: 2, title: 'LG UltraGear 27GP950' },
          { id: 3, title: 'Samsung Odyssey G7' },
          { id: 4, title: 'Asus TUF Gaming VG27AQ' }
        ]
      }
    ]
  },
  {
    icon: <Printer strokeWidth={1.4} size={24} />,
    name: 'Máy in',
    options: [
      {
        title: 'Hãng máy in',
        baseUrl: '/brand/monitor',
        listSelection: [
          { id: 1, title: 'HP' },
          { id: 2, title: 'Canon' },
          { id: 3, title: 'Epson' },
          { id: 4, title: 'Brother' }
        ]
      },
      {
        title: 'Mức giá hiện tại',
        baseUrl: '/printer',
        listSelection: [
          { title: 'Dưới 2 triệu', params: 'price=0-2000000' },
          { title: 'Từ 2 - 5 triệu', params: 'price=2000000-5000000' },
          { title: 'Từ 5 - 10 triệu', params: 'price=5000000-10000000' },
          { title: 'Trên 10 triệu', params: 'price=10000000-50000000' }
        ]
      },
      {
        title: 'Máy in HOT',
        baseUrl: '/printer',
        listSelection: [
          { id: 1, title: 'HP LaserJet Pro M15w' },
          { id: 2, title: 'Canon PIXMA G3020' },
          { id: 3, title: 'Epson EcoTank L3150' },
          { id: 4, title: 'Brother HL-L2350DW' }
        ]
      }
    ]
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
