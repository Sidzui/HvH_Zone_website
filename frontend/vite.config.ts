import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  root: ".", // ✅ Указываем корневую папку проекта
  base: "./", // ✅ Нужно для Netlify, чтобы пути были относительные
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: "dist", // ✅ Убедись, что сборка идет в `dist/`
  },
});
