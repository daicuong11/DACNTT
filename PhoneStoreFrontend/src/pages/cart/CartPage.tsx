import { FC, useState, useEffect, useMemo } from 'react'
import useSetDocTitle from '../../hooks/useSetDocTitle'
import { ArrowLeft, ChevronRight, TicketPercent } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AppCheckBox, AppDivider } from '../../components'
import CartItem from './components/CartItem'
import { listItems } from '../../datas'
import formatPrice from '../../utils/formatPrice'
import classNames from 'classnames'
import { FixedBottomLayout } from '../../layouts'

interface CartPageProps {}

const initialCartItemExample = listItems.slice(0, 5)
const CartPage: FC<CartPageProps> = () => {
  useSetDocTitle('PhoneStore Cart')
  const [selectAllProduct, setSelectAllProduct] = useState<boolean>(false)
  const [listSelected, setListSelected] = useState<number[]>([])

  const onSelectAllProduct = () => {
    if (selectAllProduct) {
      setListSelected([])
    } else {
      setListSelected(initialCartItemExample.map((product) => product.productId))
    }
    setSelectAllProduct(!selectAllProduct)
  }

  const getChecked = (id: number) => {
    return listSelected.includes(id)
  }

  const setSelectProduct = (id: number) => {
    if (listSelected.includes(id)) {
      setListSelected(listSelected.filter((item) => item !== id))
    } else {
      setListSelected([...listSelected, id])
    }
  }

  useEffect(() => {
    if (listSelected.length === initialCartItemExample.length) {
      setSelectAllProduct(true)
    } else {
      setSelectAllProduct(false)
    }
  }, [listSelected])

  const totalOrderAmount = useMemo(() => {
    return listSelected.reduce((total, id) => {
      const product = initialCartItemExample.find((item) => item.productId === id)
      return total + (product ? product.price : 0)
    }, 0)
  }, [listSelected])

  return (
    <FixedBottomLayout
      title='Giỏ hàng của bạn'
      body={
        <>
          <div className='flex items-center justify-between'>
            <AppCheckBox value={selectAllProduct} onChange={onSelectAllProduct}>
              {selectAllProduct ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
            </AppCheckBox>
            {listSelected.length > 0 && (
              <button className='py-0.5 text-sm italic font-medium text-gray-400' onClick={() => setListSelected([])}>
                Xóa sản phẩm đã chọn
              </button>
            )}
          </div>
          <div className='flex flex-col pb-16 mt-2 gap-y-4'>
            {initialCartItemExample.map((product, index) => (
              <CartItem
                checked={getChecked(product.productId)}
                onClick={() => setSelectProduct(product.productId)}
                product={product}
                key={index}
              />
            ))}
          </div>
        </>
      }
      footer={
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <div className='space-x-2 font-semibold'>
              Tạm tính: <span className='text-lg font-medium text-primary'>{formatPrice(totalOrderAmount)}</span>
            </div>
            <div className='text-xs text-gray-500'>Chưa bao gồm chiết khấu</div>
          </div>
          <Link
            to={'/cart/payment-info'}
            className={classNames('btn btn-danger', {
              'opacity-50 cursor-not-allowed bg-gray-300': listSelected.length === 0
            })}
            onClick={(e) => {
              if (listSelected.length === 0) {
                e.preventDefault()
              }
            }}
          >
            Mua ngay ({listSelected.length})
          </Link>
        </div>
      }
    />
  )
}

export default CartPage
