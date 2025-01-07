import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      'buffer': path.resolve(__dirname, 'node_modules/buffer'),
      'util': path.resolve(__dirname, 'node_modules/util'),
      'path': path.resolve(__dirname, 'node_modules/path-browserify'),
      'stream': path.resolve(__dirname, 'node_modules/stream-browserify'),
    },
  },
});
