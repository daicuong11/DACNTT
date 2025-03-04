import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SearchHistoryState {
  history: string[]
}

const initialState: SearchHistoryState = {
  history: []
}

const searchHistorySlice = createSlice({
  name: 'searchHistory',
  initialState,
  reducers: {
    addSearchTerm(state, action: PayloadAction<string>) {
      state.history = [action.payload, ...state.history.filter((term) => term !== action.payload)].slice(0, 10) // Giữ tối đa 10 từ khóa gần nhất
    },
    removeSearchTerm(state, action: PayloadAction<string>) {
      state.history = state.history.filter((term) => term !== action.payload)
    },
    clearSearchHistory(state) {
      state.history = []
    }
  }
})

export const { addSearchTerm, removeSearchTerm, clearSearchHistory } = searchHistorySlice.actions

const searchHistoryReducer = searchHistorySlice.reducer

export default searchHistoryReducer
