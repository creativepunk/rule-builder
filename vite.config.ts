import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@my-ds/components': path.resolve('./node_modules/my-ds/packages/components/dist'),
      '@my-ds/tokens': path.resolve('./node_modules/my-ds/packages/tokens/dist'),
    },
  },
  optimizeDeps: {
    include: ['lit', '@lit/react'],
  },
})
