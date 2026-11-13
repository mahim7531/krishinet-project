import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // যদি React ব্যবহার করো
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})