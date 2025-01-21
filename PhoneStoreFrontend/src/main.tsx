import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { persistor, store } from './store.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.tsx'
import 'swiper/swiper-bundle.css'
import { PersistGate } from 'redux-persist/integration/react'
import { AppLoading } from './components/index.ts'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={<AppLoading />} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
)
