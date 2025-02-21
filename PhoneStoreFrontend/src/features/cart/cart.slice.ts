import { CartItemResponse } from '@/types/cart_item.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addCartItem, fetchCart, removeCartItem, updateCartItem } from './cartThunks'

interface CartState {
  items: CartItemResponse[]
  listSelected: number[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: CartState = {
  items: [],
  status: 'idle',
  error: null,
  listSelected: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setListSelected(state, action: PayloadAction<number[]>) {
      state.listSelected = action.payload
    },
    clearCart(state) {
      state.items = []
      state.status = 'idle'
      state.error = null
      state.listSelected = []
    }
  },
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

export const { clearCart, setListSelected } = cartSlice.actions

const cartReducer = cartSlice.reducer

export default cartReducer
