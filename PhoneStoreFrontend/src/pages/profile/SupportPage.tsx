import { supportImages } from '@/assets/images'

const suportInfo: { img: string; title: string; content: string }[] = [
  {
    img: supportImages.headphones,
    title: 'Tư vấn mua hàng (8:00 - 22:00)',
    content: '1800.2097'
  },
  {
    img: supportImages.waranty,
    title: 'Bảo hành (8:00 - 22:00)',
    content: '1800.2064'
  },
  {
    img: supportImages.bad_review,
    title: 'Khiếu nại (8:00 - 21:00)',
    content: '1800.2063'
  },
  {
    img: supportImages.message,
    title: 'Email',
    content: 'cskh@bcmobile.com.vn'
  }
]

const SupportPage = () => {
  return (
    <div className='flex flex-col min-h-screen p-5 mt-1 bg-white rounded-md'>
      <div className='text-2xl font-semibold text-black'>Thông tin liện hệ</div>
      <div className='grid grid-cols-1 sm:grid-cols-2 mt-6 md:gap-3 gap-6'>
        {suportInfo.map((info, index) => (
          <div key={index} className='flex items-center gap-x-3 bg-white p-2 border rounded-lg'>
            <img className='object-contain w-16 h-16' src={info.img} />
            <div className='flex flex-col gap-y-1'>
              <span className='text-base text-black font-semibold'>{info.title}</span>
              <span className='text-sm text-primary'>{info.content}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SupportPage
