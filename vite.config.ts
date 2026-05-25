import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Продакшен: https://thisplug.github.io/main_site/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/main_site/' : '/',
  plugins: [react(), tailwindcss()],
}))
