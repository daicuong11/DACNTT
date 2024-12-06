import { Copyright } from 'lucide-react'
import { Link } from 'react-router-dom'
import { logo, momo, socialNetworkImages, vnpay } from '../../../assets/images'
import { FormGetVoucher } from './components'

export default function Footer() {
  return (
    <footer className='w-full bg-[#181821] text-base text-[#a9b3bb]'>
      <div className='w-[1200px] mx-auto py-4'>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          <div className='flex flex-col gap-2'>
            <Link className='flex items-center h-9' to={'/'}>
              <img className='object-cover h-[30px] cursor-pointer border rounded-md p-1' src={logo} alt='' />
            </Link>
            <div className='flex flex-col gap-y-1.5 text-sm'>
              <div className='py-1 text-xl font-semibold text-white'>Tổng đài hỗ trợ miễn phí</div>
              <div className='flex items-end gap-1'>
                <div className='font-semibold'>Gọi mua hàng:</div>
                <a href='tel:0366 288 457' className='font-semibold hover:underline'>
                  1800.2062
                </a>
                <span className='text-xs'>(7h30 - 22h00)</span>
              </div>
              <div className='flex items-end gap-1'>
                <div className='font-semibold'>Gọi khiếu nại:</div>
                <a href='tel:0366 288 457' className='font-semibold hover:underline'>
                  1800.2063
                </a>
                <span className='text-xs'>(8h00 - 21h00)</span>
              </div>
              <div className='flex items-end gap-1'>
                <div className='font-semibold'>Gọi bảo hành:</div>
                <a href='tel:0366 288 457' className='font-semibold hover:underline'>
                  1800.2064
                </a>
                <span className='text-xs'>(8h00 - 21h00)</span>
              </div>
            </div>
            <div className='flex flex-col gap-y-1.5 text-sm'>
              <div className='py-1 mt-2 text-xl font-semibold text-white'>Phương thức thanh toán</div>
              <div className='flex gap-2'>
                <img
                  className='w-[48px] cursor-pointer h-[30px] border-[1px] border-gray-100 rounded-md object-cover'
                  src={vnpay}
                />
                <img
                  className='w-[48px] cursor-pointer h-[30px] border-[1px] border-gray-100 rounded-md object-cover'
                  src={momo}
                />
              </div>
            </div>
            <div className='flex flex-col gap-y-1.5 text-sm'>
              <div className='py-1 text-xl font-semibold text-white'>Kết nối với PhoneStore</div>
              <div className='flex gap-2'>
                {socialNetworkImages.map((item, index) => (
                  <img
                    key={index}
                    className='w-[48px] cursor-pointer h-[30px] border-[1px] border-gray-100 rounded-md object-cover'
                    src={item.image}
                    onClick={() => window.open(item.link, '_blank')}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex items-center gap-3 py-1 text-xl font-semibold text-white'>Về PhoneStore</div>
            <div className='flex flex-col gap-2 mt-5 text-sm'>
              <Link to={''} className='font-semibold hover:text-white hover:underline'>
                Mua hàng và thanh toán Online
              </Link>
              <Link to={''} className='font-semibold hover:text-white hover:underline'>
                Mua hàng trả góp Online
              </Link>
              <Link to={''} className='font-semibold hover:text-white hover:underline'>
                Mua hàng trả góp bằng thẻ tín dụng
              </Link>
              <Link to={''} className='font-semibold hover:text-white hover:underline'>
                Chính sách giao hàng
              </Link>
              <Link to={''} className='font-semibold hover:text-white hover:underline'>
                Tra điểm Smember
              </Link>
              <Link to={''} className='font-semibold hover:text-white hover:underline'>
                Xem ưu đãi Smember
              </Link>
              <Link to={''} className='font-semibold hover:text-white hover:underline'>
                Tra thông tin bảo hành
              </Link>
              <Link to={''} className='font-semibold hover:text-white hover:underline'>
                Tra cứu hoá đơn điện tử
              </Link>
              <Link to={''} className='font-semibold hover:text-white hover:underline'>
                Thông tin hoá đơn mua hàng
              </Link>
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex items-center gap-3 py-1 text-xl font-semibold text-white'>
              Dịch vụ và thông tin khác
            </div>
            <div className='flex flex-col gap-2 mt-5 text-sm'>
              <Link to={''} className='font-semibold hover:text-white hover:underline'>
                Khách hàng doanh nghiệp (B2B)
              </Link>
              <Link to={''} className='font-semibold hover:text-white hover:underline'>
                Ưu đãi thanh toán
              </Link>
              <Link to={''} className='font-semibold hover:text-white hover:underline'>
                Quy chế hoạt động
              </Link>
              <Link to={''} className='font-semibold hover:text-white hover:underline'>
                Chính sách bảo mật thông tin cá nhân
              </Link>
              <Link to={''} className='font-semibold hover:text-white hover:underline'>
                Chính sách Bảo hành
              </Link>
              <Link to={''} className='font-semibold hover:text-white hover:underline'>
                Liên hệ hợp tác kinh doanh
              </Link>
              <Link to={''} className='font-semibold hover:text-white hover:underline'>
                Tuyển dụng
              </Link>
              <Link to={''} className='font-semibold hover:text-white hover:underline'>
                Dịch vụ bảo hành mở rộng
              </Link>
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-col gap-y-1.5 text-sm'>
              <div className='py-1 text-xl font-semibold text-white uppercase'>Đăng ký nhận tin khuyến mãi</div>
              <div className='text-red-600'>(*) Nhận ngay voucher 10%</div>
              <div className=''>*Voucher sẽ được gửi sau 24h, chỉ áp dụng cho khách hàng mới</div>
              <div className='mt-4'>
                <FormGetVoucher />
              </div>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center gap-1 mt-12 text-sm lg:justify-start'>
          <Copyright size={18} />
          <div className=''>2024 Biên Cương</div>
        </div>
      </div>
    </footer>
  )
}
