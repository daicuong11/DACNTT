import axiosInstance from '@/configs/http'
import { CartItemType } from '@/types/cart_item.type'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId: number): Promise<CartItemType[]> => {
  const res = await axiosInstance.get(`/carts/${userId}`)
  return res.data
})

export const updateCart = createAsyncThunk(
  'cart/updateCart',
  async ({ userId, items }: { userId: number; items: CartItemType[] }): Promise<CartItemType[]> => {
    const res = await axiosInstance.put(`/carts/${userId}`, { items })
    return res.data
  }
)

interface CartState {
  items: CartItemType[]
  status: 'idle' | 'loading' | 'failed'
}

const initialState: CartState = {
  items: [],
  status: 'idle'
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItemType>) => {
      const existingItem = state.items.find((item) => item.cartItemId === action.payload.cartItemId)
      if (existingItem) {
        existingItem.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.cartItemId !== action.payload)
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find((item) => item.cartItemId === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = 'idle'
      })
      .addCase(fetchCart.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.items = action.payload
      })
  }
})

export const { addItem, removeItem, updateQuantity } = cartSlice.actions
export default cartSlice.reducer
