import classNames from 'classnames'
import { FC } from 'react'
interface SwiperSlideItemProps {
  item: {
    title: string
    subTitle: string
    imageUrl: string
  }
  active: boolean
}
const SwiperSlideItem: FC<SwiperSlideItemProps> = ({ item, active }) => {
  return (
    <div
      className={classNames(
        'flex cursor-pointer flex-col items-center justify-center h-full gap-1.5 text-xs text-text',
        {
          'font-bold border-b-primary border-b-[3px]': active
        }
      )}
    >
      <div className='uppercase'>{item.title}</div>
      <div className=''>{item.subTitle}</div>
    </div>
  )
}

export default SwiperSlideItem
