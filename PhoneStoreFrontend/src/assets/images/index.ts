import banner_Chinhhang from './banner_Chinhhang.png'
import banner_Giaohang from './banner_Giaohang.png'
import banner_Smember from './banner_Smember.png'
import banner_Thucu from './banner_Thucu.png'
import logo from './logo.png'
import momo from './momo_1.png'
import vnpay from './vnpay-logo.png'
import youtube from './youtube.png'
import facebook from './facebook.png'
import tiktok from './tiktok.png'
import zalo from './zalo.png'
import instagram from './instagram.png'
import QC1 from './m55-10190-rightbanner-4-12-24.png'
import QC2 from './right-banner-mac-mini-m4.png'
import QC3 from './udsv-right-laptop.png'
import Not_Found from './not_found.png'
import robot_img from './robot.png'
import atm_card_img from './atm-card.png'
import flame_img from './flame.png'
import rigthbanner_dienthoai from './Rightbanner-mobile.jpg'
import rigthbanner_laptop from './Rightbanner_Laptop.jpg'
import robot_hello from './robot_hello.png'
import google_logo from './google_logo.png'
import cart_empty from './cart_empty.png'
import cart_empty_removebg from './cart_empty-removebg.png'
import cart_full_1 from './cart_full_1.png'
import cart_full_2 from './cart_full_2.png'

export * from './payment_methods'

import { GiaoHangIcon } from './svgs'
import {
  Iphone19_banner,
  manHinhLG_banner,
  OPPOFind_banner,
  samsungS24UltraHome20_banner,
  TecnoCamon_banner,
  TourPro3_banner,
  Xiaomi_banner
} from './banner'

export {
  robot_img,
  banner_Chinhhang,
  banner_Giaohang,
  banner_Smember,
  banner_Thucu,
  logo,
  GiaoHangIcon,
  momo,
  vnpay,
  Not_Found,
  atm_card_img,
  flame_img,
  robot_hello,
  google_logo,
  cart_empty,
  cart_empty_removebg,
  cart_full_1,
  cart_full_2
}

export const rightBannerImages = [
  {
    title: 'Điện thoại',
    image: rigthbanner_dienthoai
  },
  {
    title: 'Laptop',
    image: rigthbanner_laptop
  }
]

export const socialNetworkImages = [
  {
    link: 'https://www.youtube.com/',
    image: youtube
  },
  {
    link: 'https://www.facebook.com/',
    image: facebook
  },
  {
    link: 'https://www.instagram.com/',
    image: instagram
  },
  {
    link: 'https://www.tiktok.com/',
    image: tiktok
  },
  {
    link: 'https://zalo.me/',
    image: zalo
  }
]

export const listBanner = [
  {
    id: 1,
    queryUrl: '/mobiles/',
    title: 'GALAXY S21 ULTRA'.toLowerCase(),
    subTitle: 'Mua ngay',
    imageUrl: samsungS24UltraHome20_banner
  },
  {
    id: 2,
    queryUrl: '/monitors/',
    title: 'Màn hình LG Gaming'.toUpperCase(),
    subTitle: 'Mua ngay',
    imageUrl: manHinhLG_banner
  },
  {
    id: 3,
    queryUrl: '/mobiles/',
    title: 'Tecno Camon 30s'.toLowerCase(),
    subTitle: 'Mua ngay',
    imageUrl: TecnoCamon_banner
  },
  {
    id: 4,
    queryUrl: '/mobiles/',
    title: 'Xiaomi 14t'.toLowerCase(),
    subTitle: 'Mua ngay',
    imageUrl: Xiaomi_banner
  },
  {
    id: 5,
    queryUrl: '/mobiles/',
    title: 'Iphone 16 series'.toLowerCase(),
    subTitle: 'Mua ngay',
    imageUrl: Iphone19_banner
  },
  {
    id: 6,
    queryUrl: '/headphones/',
    title: 'Tai nghe JBL'.toLowerCase(),
    subTitle: 'Mua ngay',
    imageUrl: TourPro3_banner
  },
  {
    id: 7,
    queryUrl: '/mobiles/',
    title: 'Oppo find x8'.toLowerCase(),
    subTitle: 'Mua ngay',
    imageUrl: OPPOFind_banner
  }
]

export const listQCBanner = [
  {
    imageUrl: QC1
  },
  {
    imageUrl: QC2
  },
  {
    imageUrl: QC3
  }
]
