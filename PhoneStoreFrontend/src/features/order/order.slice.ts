import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ShippingInfoType } from '../../types/app.type'
import { CartItemPayloadType, CartItemResponse } from '../../types/cart_item.type'
import { AddressFormType, AddressType } from '../../types/address.type'
import { getTotalAmountOfCartItems } from '../../utils/getTotalAmountOfCartItems'
import { CouponType } from '../../types/coupon.type'
import { getCouponDiscount } from '../../utils/getCouponDiscount'
import { clear } from 'console'

interface OrderState {
  cartItems: CartItemResponse[]
  shippingInfo: ShippingInfoType | null
  coupon: CouponType | null
  totalAmount: number
  paymentMethod: string | null
  email: string | null
  shippingAddress: AddressType | null
  note: string | null
  shippingFee: number | null
}

const initialState: OrderState = {
  cartItems: [],
  shippingInfo: null,
  coupon: null,
  totalAmount: 0,
  paymentMethod: null,
  email: null,
  shippingAddress: null,
  note: null,
  shippingFee: null
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<CartItemResponse>) => {
      const findIndex = state.cartItems.findIndex((item) => item.cartItemId === action.payload.cartItemId)
      if (findIndex !== -1) {
        state.cartItems[findIndex].quantity = action.payload.quantity
        state.totalAmount = getTotalAmountOfCartItems(state.cartItems)
        return
      }
      state.cartItems.push(action.payload)
      state.totalAmount = getTotalAmountOfCartItems(state.cartItems)
    },
    setNewCartItems: (state, action: PayloadAction<CartItemResponse[]>) => {
      state.cartItems = action.payload
      state.totalAmount = getTotalAmountOfCartItems(state.cartItems)
    },
    removeCartItem: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter((item) => item.cartItemId !== action.payload)
      state.totalAmount = getTotalAmountOfCartItems(state.cartItems)
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const index = state.cartItems.findIndex((item) => item.cartItemId === action.payload)
      state.cartItems[index].quantity += 1
      state.totalAmount = getTotalAmountOfCartItems(state.cartItems)
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const index = state.cartItems.findIndex((item) => item.cartItemId === action.payload)
      if (state.cartItems[index].quantity === 1) {
        state.cartItems.splice(index, 1)
      } else {
        state.cartItems[index].quantity -= 1
      }
      state.totalAmount = getTotalAmountOfCartItems(state.cartItems)
    },
    setInfoShipping: (
      state,
      action: PayloadAction<{ customerInfo: ShippingInfoType; address: AddressType | null }>
    ) => {
      state.shippingInfo = action.payload.customerInfo
      state.shippingAddress = action.payload.address
    },
    setShippingInfo: (state, action: PayloadAction<ShippingInfoType>) => {
      state.shippingInfo = action.payload
    },
    setCoupon: (state, action: PayloadAction<CouponType | null>) => {
      state.coupon = action.payload
      state.totalAmount = getTotalAmountOfCartItems(state.cartItems) - getCouponDiscount(state.coupon).discountValue
    },
    setTotalAmount: (state, action: PayloadAction<number>) => {
      state.totalAmount = action.payload
    },
    setPaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setNote: (state, action: PayloadAction<string>) => {
      state.note = action.payload
    },
    setShippingAddress: (state, action: PayloadAction<AddressType | null>) => {
      state.shippingAddress = action.payload
      state.shippingFee = null
    },
    clearListCartItems: (state) => {
      state.cartItems = []
    },
    clearShippingAddress: (state) => {
      state.shippingAddress = null
      state.shippingFee = null
    },
    clearCoupon: (state) => {
      state.coupon = null
    },
    clearEmail: (state) => {
      state.email = null
    },
    clearNote: (state) => {
      state.note = null
    },
    clearOrder: (state) => {
      state.cartItems = []
      state.shippingInfo = null
      state.coupon = null
      state.totalAmount = 0
      state.paymentMethod = null
      state.email = null
      state.shippingAddress = null
      state.note = null
      state.shippingFee = null
    },
    removeOrderDetail: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter((item) => item.cartItemId !== action.payload)
    },
    setShippingFee: (state, action: PayloadAction<number>) => {
      state.shippingFee = action.payload
    },
    clearShippingFee: (state) => {
      state.shippingFee = null
    }
  }
})

export const {
  addCartItem,
  setNewCartItems,
  removeCartItem,
  clearOrder,
  increaseQuantity,
  decreaseQuantity,
  clearCoupon,
  clearListCartItems,
  clearShippingAddress,
  clearEmail,
  clearNote,
  removeOrderDetail,
  setCoupon,
  setPaymentMethod,
  setShippingAddress,
  setInfoShipping,
  setShippingInfo,
  setTotalAmount,
  setEmail,
  setNote,
  setShippingFee,
  clearShippingFee
} = orderSlice.actions

export const selectOrder = (state: { order: OrderState }) => state.order

export default orderSlice.reducer
