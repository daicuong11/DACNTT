import { CartItemResponse } from '@/types/cart_item.type'
import { createSlice } from '@reduxjs/toolkit'
import { addCartItem, fetchCart, removeCartItem, updateCartItem } from './cartThunks'

interface CartState {
  items: CartItemResponse[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: CartState = {
  items: [],
  status: 'idle',
  error: null
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload.cartItems
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch cart'
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.cartItemId === action.payload.cartItemId)

        if (index !== -1) {
          state.items[index] = action.payload
        } else {
          state.items.push(action.payload)
        }
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.cartItemId === action.payload.cartItemId)

        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.cartItemId !== action.payload)
      })
  }
})

const cartReducer = cartSlice.reducer

export default cartReducer
