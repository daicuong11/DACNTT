import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ShippingInfoType } from '../../types/app.type'
import { CartItemPayloadType } from '../../types/cart_item.type'
import { AddressFormType } from '../../types/address.type'
import { get } from 'http'
import { getTotalAmountOfCartItems } from '../../utils/getTotalAmountOfCartItems'
import { CouponType } from '../../types/coupon.type'
import { getCouponDiscount } from '../../utils/getCouponDiscount'

interface OrderState {
  cartItems: CartItemPayloadType[]
  shippingInfo: ShippingInfoType | null
  coupon: CouponType | null
  totalAmount: number
  paymentMethod: string | null
  email: string | null
  shippingAddress: Omit<AddressFormType, 'isDefault'> | null
  note: string | null
}

const initialState: OrderState = {
  cartItems: [],
  shippingInfo: null,
  coupon: null,
  totalAmount: 0,
  paymentMethod: null,
  email: null,
  shippingAddress: null,
  note: null
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<CartItemPayloadType>) => {
      state.cartItems.push(action.payload)
      state.totalAmount = getTotalAmountOfCartItems(state.cartItems)
    },
    setNewCartItems: (state, action: PayloadAction<CartItemPayloadType[]>) => {
      state.cartItems = action.payload
      state.totalAmount = getTotalAmountOfCartItems(state.cartItems)
    },
    removeCartItem: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter((item) => item.productVariantID !== action.payload)
      state.totalAmount = getTotalAmountOfCartItems(state.cartItems)
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const index = state.cartItems.findIndex((item) => item.productVariantID === action.payload)
      state.cartItems[index].quantity += 1
      state.totalAmount = getTotalAmountOfCartItems(state.cartItems)
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const index = state.cartItems.findIndex((item) => item.productVariantID === action.payload)
      if (state.cartItems[index].quantity === 1) {
        state.cartItems.splice(index, 1)
      } else {
        state.cartItems[index].quantity -= 1
      }
      state.totalAmount = getTotalAmountOfCartItems(state.cartItems)
    },
    setInfoShipping: (
      state,
      action: PayloadAction<{ customerInfo: ShippingInfoType; address: Omit<AddressFormType, 'isDefault'> }>
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
    setShippingAddress: (state, action: PayloadAction<Omit<AddressFormType, 'isDefault'>>) => {
      state.shippingAddress = action.payload
    },
    clearListCartItems: (state) => {
      state.cartItems = []
    },
    clearShippingAddress: (state) => {
      state.shippingAddress = null
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
    },
    removeOrderDetail: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter((item) => item.productVariantID !== action.payload)
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
  setNote
} = orderSlice.actions

export const selectOrder = (state: { order: OrderState }) => state.order

export default orderSlice.reducer
