
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // Changed to react-swc which is installed
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080, // Set server port to 8080 as required
    host: "::", // Allow connections from all network interfaces
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env': {},
    'global': {},
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
