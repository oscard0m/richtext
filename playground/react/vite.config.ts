import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'pathe'
import { qrcode } from 'vite-plugin-qrcode'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    qrcode(), // only applies in dev mode
  ],
  resolve: {
    alias: {
      '@storyblok/richtext-resolver': resolve(__dirname, '../../src/index.ts'),
    },
  },
})