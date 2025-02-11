import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer, PersistConfig } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './features/auth/auth.slice'
import orderReducer from './features/order/order.slice'
import createProductReducer from './features/admin/create_product.slice'
const rootReducer = combineReducers({
  auth: authReducer,
  order: orderReducer,
  createProduct: createProductReducer
})

export type RootState = ReturnType<typeof rootReducer>

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  whitelist: ['auth', 'order', 'createProduct']
}

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer)

// Tạo store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: process.env.NODE_ENV !== 'production'
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
