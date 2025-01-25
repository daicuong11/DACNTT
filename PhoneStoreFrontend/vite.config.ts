import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths() // Tự động ánh xạ các alias từ jsconfig.json
  ],
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  },
})
