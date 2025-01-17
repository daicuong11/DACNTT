import { Link } from 'react-router-dom'
import { FixedBottomLayout } from '../../layouts'
import formatPrice from '../../utils/formatPrice'
import classNames from 'classnames'
import { useState } from 'react'
import Item from './components/Item'
import { listItems } from '../../datas'
import { ChevronDown, ChevronUp } from 'lucide-react'

const listItemExample = listItems.slice(0, 5)

const PaymentInfoPage = () => {
  const [showAllProduct, setShowAllProduct] = useState<boolean>(false)
  const [isPaymentView, setIsPaymentView] = useState<boolean>(false)

  return (
    <FixedBottomLayout
      title='Thông tin'
      body={
        <div className='flex flex-col'>
          <div className='flex justify-between gap-x-6'>
            <div
              onClick={() => setIsPaymentView(false)}
              className={classNames(
                'border-b-[3px] w-full text-center font-bold text-primary cursor-pointer border-primary uppercase py-1.5',
                {
                  'text-slate-500 border-slate-500': isPaymentView
                }
              )}
            >
              1. thông tin
            </div>
            <div
              onClick={() => setIsPaymentView(true)}
              className={classNames(
                'border-b-[3px] w-full text-center font-bold text-primary cursor-pointer border-primary uppercase py-1.5',
                {
                  'text-slate-500 border-slate-500': !isPaymentView
                }
              )}
            >
              2. thanh toán
            </div>
          </div>
          <div
            className={classNames(
              'flex flex-col mt-5 bg-white border border-gray-200 rounded-lg px-4',
              'overflow-hidden transition-all duration-500 ease-in-out'
            )}
          >
            {listItemExample.map((item, index) => (
              <Item
                key={index}
                product={item}
                className={classNames('overflow-hidden transition-all duration-300 ease-in-out rounded-none', {
                  ' invisible py-0 max-h-0': !showAllProduct && index > 0,
                  'max-h-screen visible box-border border-b border-gray-200': showAllProduct
                })}
              />
            ))}
            {!showAllProduct && (
              <div
                onClick={() => setShowAllProduct(true)}
                className='flex py-1.5 mb-1 gap-x-2 items-center justify-center cursor-pointer text-gray-500 hover:underline'
              >
                và {listItemExample.length - 1} sản phẩm khác
                <ChevronDown size={16} strokeWidth={1.6} />
              </div>
            )}
            {showAllProduct && (
              <div
                onClick={() => setShowAllProduct(false)}
                className='flex py-1.5 mb-2 gap-x-2 items-center justify-center cursor-pointer text-gray-500 hover:underline'
              >
                thu gọn
                <ChevronUp size={16} strokeWidth={1.6} />
              </div>
            )}
          </div>
        </div>
      }
      footer={
        <div className='flex flex-col'>
          <div className='flex items-center justify-between w-full'>
            <div className='flex font-semibold'>Tổng tiền tạm tính:</div>
            <span className='text-lg font-semibold text-primary'>{formatPrice(1000000)}</span>
          </div>
          <div className='mb-3 text-xs text-gray-500'>Chưa bao gồm chiết khấu</div>
          <Link to={'/payment'} className='rounded-md btn btn-danger'>
            Tiếp tục
          </Link>
        </div>
      }
    />
  )
}

export default PaymentInfoPage
