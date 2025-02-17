import axiosInstance from '@/configs/http'
import { CartType } from '@/types/cart.type'
import { CartItemType } from '@/types/cart_item.type'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface CartState {
  items: CartItemType[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: CartState = {
  items: [],
  status: 'idle',
  error: null
}

export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId: number): Promise<CartType> => {
  const response = await axiosInstance.get(`carts/${userId}`)
  return response.data
})

export const addCartItem = createAsyncThunk(
  'cart/addCartItem',
  async ({ userId, cartItem }: { userId: number; cartItem: CartItemType }): Promise<CartItemType> => {
    const response = await axiosInstance.post(`carts/${userId}/items`, cartItem)
    return response.data
  }
)

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({
    userId,
    itemId,
    cartItem
  }: {
    userId: number
    itemId: number
    cartItem: CartItemType
  }): Promise<CartItemType> => {
    const response = await axiosInstance.put(`carts/${userId}/items/${itemId}`, cartItem)
    return response.data
  }
)

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async ({ userId, itemId }: { userId: number; itemId: number }) => {
    await axiosInstance.delete(`carts/${userId}/items/${itemId}`)
    return itemId
  }
)

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
        state.items.push(action.payload)
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

export default cartSlice.reducer
