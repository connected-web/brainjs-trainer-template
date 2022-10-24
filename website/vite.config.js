import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/brainjs-trainer-template',
  server: {
    fs: {
      allow: ['..']
    }
  }
})
