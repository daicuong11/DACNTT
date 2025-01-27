import { FC, useState, useEffect, useMemo } from 'react'
import useSetDocTitle from '../../hooks/useSetDocTitle'
import { useNavigate } from 'react-router-dom'
import { AppCheckBox } from '../../components'
import CartItem from './components/CartItem'
import { exampleProductVariant } from '../../datas'
import formatPrice from '../../utils/formatPrice'
import classNames from 'classnames'
import { FixedBottomLayout } from '../../layouts'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { removeCartItem, setNewCartItems } from '../../features/order/order.slice'
import { CartItemPayloadType } from '@/types/cart_item.type'

interface CartPageProps {}

const initialCartItemExample: CartItemPayloadType[] = exampleProductVariant.slice(0, 5).map((item) => ({
  productVariantID: item.productId,
  productVariant: item,
  quantity: 1
}))

const CartPage: FC<CartPageProps> = () => {
  useSetDocTitle('PhoneStore Cart')

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const orderTemp = useAppSelector((state) => state.order)

  const [cartItems, setCartItems] = useState<CartItemPayloadType[]>(initialCartItemExample)
  const [selectAllProduct, setSelectAllProduct] = useState<boolean>(false)
  const [listSelected, setListSelected] = useState<number[]>(orderTemp.cartItems.map((item) => item.productVariantID))

  const onSelectAllProduct = () => {
    if (selectAllProduct) {
      setListSelected([])
    } else {
      setListSelected(initialCartItemExample.map((item) => item.productVariantID))
    }
    setSelectAllProduct(!selectAllProduct)
  }

  const setSelectProduct = (productVariantID: number) => {
    if (listSelected.includes(productVariantID)) {
      setListSelected(listSelected.filter((item) => item !== productVariantID))
    } else {
      setListSelected([...listSelected, productVariantID])
    }
  }

  useEffect(() => {
    if (listSelected.length === initialCartItemExample.length) {
      setSelectAllProduct(true)
    } else {
      setSelectAllProduct(false)
    }
  }, [listSelected])

  const handleOnchangeQuantity = (product: CartItemPayloadType, quantity: number) => {
    if (quantity <= 0) {
      const removeCartItemList = cartItems.filter((item) => item.productVariantID !== product.productVariantID)
      setCartItems(removeCartItemList)
      return
    }
    const newCartItems = cartItems.map((item) => {
      if (item.productVariantID === product.productVariantID) {
        return {
          ...item,
          quantity
        }
      }
      return item
    })
    setCartItems(newCartItems)
  }

  const handleRemoveCartItem = (productVariantID: number) => {
    const newCartItems = cartItems.filter((item) => item.productVariantID !== productVariantID)
    setCartItems(newCartItems)
    setListSelected(listSelected.filter((item) => item !== productVariantID))
    dispatch(removeCartItem(productVariantID))
  }

  const totalOrderAmount = useMemo(() => {
    return listSelected.reduce((total, productVariantID) => {
      const cartItemFind = cartItems.find((item) => item.productVariantID === productVariantID)
      if (!cartItemFind) {
        return total
      }
      return total + cartItemFind.productVariant.price * cartItemFind.quantity
    }, 0)
  }, [listSelected, handleOnchangeQuantity])

  const handleSubmit = () => {
    if (listSelected.length === 0) {
      return
    }
    const newCartItems = cartItems.filter((item) => listSelected.includes(item.productVariantID))
    dispatch(setNewCartItems(newCartItems))
    navigate('/cart/payment-info')
  }

  return (
    <FixedBottomLayout
      navigateTo={() => navigate('/')}
      title='Giỏ hàng của bạn'
      body={
        <div className='pb-10'>
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
            {cartItems.map((product, index) => (
              <CartItem
                checked={listSelected.includes(product.productVariantID)}
                handleSelect={() => setSelectProduct(product.productVariantID)}
                cartItem={product}
                key={index}
                onChangeQuantity={(quantity) => handleOnchangeQuantity(product, quantity)}
                handleRemove={handleRemoveCartItem}
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
