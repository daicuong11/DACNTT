import { FC, useState, useEffect, useMemo, useCallback } from 'react'
import useSetDocTitle from '../../hooks/useSetDocTitle'
import { useNavigate } from 'react-router-dom'
import { AppCheckBox, LoadingOpacity } from '../../components'
import CartItem from './components/CartItem'
import formatPrice from '../../utils/formatPrice'
import classNames from 'classnames'
import { FixedBottomLayout } from '../../layouts'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setNewCartItems } from '../../features/order/order.slice'
import { fetchCart } from '@/features/cart/cart.slice'

interface CartPageProps {}

const CartPage: FC<CartPageProps> = () => {
  useSetDocTitle('BC Mobile Cart')

  const navigate = useNavigate()

  const { items, status, error } = useAppSelector((state) => state.cart)
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const [selectAll, setSelectAll] = useState<boolean>(false)
  const [listSelected, setListSelected] = useState<number[]>([])

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCart(user.id))
    }
  }, [dispatch, user])

  const onSelectAllProduct = useCallback(() => {
    if (selectAll) {
      setListSelected([])
    } else {
      setListSelected(items.map((item) => item.cartItemId))
    }
    setSelectAll(!selectAll)
  }, [selectAll, items])

  const handleSelectCartItem = useCallback(
    (cartItemId: number) => {
      if (listSelected.includes(cartItemId)) {
        setListSelected(listSelected.filter((item) => item !== cartItemId))
      } else {
        setListSelected([...listSelected, cartItemId])
      }
    },
    [listSelected]
  )

  const handleSubmit = useCallback(() => {
    if (listSelected.length === 0) {
      return
    }
    const newCartItems = items.filter((item) => listSelected.includes(item.cartItemId))
    dispatch(setNewCartItems(newCartItems))
    navigate('/cart/payment-info')
  }, [listSelected, items, dispatch, navigate])

  const totalOrderAmount = useMemo(() => {
    return listSelected.reduce((total, cartItemId) => {
      const cartItemFind = items.find((item) => item.cartItemId === cartItemId)
      if (!cartItemFind) {
        return total
      }
      return total + cartItemFind.productVariant.price * cartItemFind.quantity
    }, 0)
  }, [listSelected, items])

  if (status === 'loading') {
    return (
      <FixedBottomLayout
        title='Giỏ hàng của bạn'
        body={
          <div className='pb-10'>
            <div className='flex items-center justify-between'>
              <AppCheckBox>Chọn tất cả</AppCheckBox>
            </div>
            <div className='flex flex-col pb-16 mt-2 gap-y-4'>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <div
                  key={index}
                  className='max-w-[600px] relative px-3 py-4 pl-8 shadow-sm border rounded-lg cursor-pointer border-gray-200 bg-white min-h-[100px] animate-pulse bg-gray-300'
                ></div>
              ))}
            </div>
          </div>
        }
        footer={
          <div className='flex items-center justify-between'>
            <div className='flex flex-col'>
              <div className='space-x-2 font-semibold'>
                Tạm tính: <span className='text-lg font-medium text-primary'>{formatPrice(0)}</span>
              </div>
              <div className='text-xs text-gray-500'>Chưa bao gồm chiết khấu</div>
            </div>
            <div
              className={classNames('btn btn-danger', {
                'opacity-50 cursor-not-allowed bg-gray-300': true
              })}
            >
              Mua ngay (0)
            </div>
          </div>
        }
      />
    )
  }

  if (status === 'failed') {
    return (
      <div className='flex flex-col items-center justify-center h-full'>
        <p className='text-lg font-medium text-red-500'>Lỗi: {error}</p>
        <button onClick={() => dispatch(fetchCart(user!.id))} className='mt-4 btn btn-primary'>
          Thử lại
        </button>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <FixedBottomLayout
        navigateTo={() => navigate('/')}
        title='Giỏ hàng của bạn'
        body={
          <div className='flex flex-col items-center justify-center h-full'>
            <p className='text-lg font-medium text-gray-500'>Giỏ hàng của bạn đang trống</p>
            <button onClick={() => navigate('/')} className='mt-4 btn btn-primary'>
              Tiếp tục mua sắm
            </button>
          </div>
        }
        footer={
          <div onClick={() => navigate('/')} className={classNames('btn btn-danger rounded-md')}>
            Quay lại trang chủ
          </div>
        }
      />
    )
  }
  return (
    <FixedBottomLayout
      navigateTo={() => navigate('/')}
      title='Giỏ hàng của bạn'
      body={
        <div className='pb-10'>
          <div className='flex items-center justify-between'>
            <AppCheckBox value={selectAll} onChange={onSelectAllProduct}>
              {selectAll ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
            </AppCheckBox>
            {listSelected.length > 0 && (
              <button className='py-0.5 text-sm italic font-medium text-gray-400' onClick={() => setListSelected([])}>
                Xóa sản phẩm đã chọn
              </button>
            )}
          </div>
          <div className='flex flex-col pb-16 mt-2 gap-y-4'>
            {items.map((cartItem, index) => (
              <CartItem
                checked={listSelected.includes(cartItem.cartItemId)}
                handleSelect={() => handleSelectCartItem(cartItem.cartItemId)}
                cartItem={cartItem}
                key={index}
              />
            ))}
          </div>
        </div>
      }
      footer={
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <div className='space-x-2 font-semibold'>
              Tạm tính: <span className='text-lg font-medium text-primary'>{formatPrice(totalOrderAmount)}</span>
            </div>
            <div className='text-xs text-gray-500'>Chưa bao gồm chiết khấu</div>
          </div>
          <div
            onClick={handleSubmit}
            className={classNames('btn btn-danger', {
              'opacity-50 cursor-not-allowed bg-gray-300': listSelected.length === 0
            })}
          >
            Mua ngay ({listSelected.length})
          </div>
        </div>
      }
    />
  )
}

export default CartPage
