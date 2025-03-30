import { fileURLToPath, URL } from 'node:url'
import fs from 'fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'preserve-user-ini',
      enforce: 'post',
      closeBundle() {
        const filePath = 'dist/.user.ini'
        if (!fs.existsSync(filePath)) {
          fs.writeFileSync(filePath, '') // 确保 .user.ini 存在
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
