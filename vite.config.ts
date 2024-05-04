import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

const viteEnv = {};

Object.keys(process.env).forEach(key => {
  if (key.startsWith(`VITE_`)) {
    viteEnv[`import.meta.env.${key}`] = process.env[key];
  }
});
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3000,
  },
  plugins: [
    react(),
    svgr(),
  ],
  define: {...viteEnv, 'process.env': {}},
  optimizeDeps: {
    exclude: ['react-hook-form'],
  },
});
