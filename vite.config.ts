import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@store': path.resolve(__dirname, './src/store'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@type': path.resolve(__dirname, './src/type'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utilities': path.resolve(__dirname, './src/utilities'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import '@styles/global.scss';",
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
  },
});
