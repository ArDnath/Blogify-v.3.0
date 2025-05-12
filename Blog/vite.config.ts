import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';


// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
  },
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      filename: 'stats.html',
      open: true, // Automatically opens the report in the browser
      gzipSize: true,
      brotliSize: true,
    }),
    chunkSplitPlugin({
      strategy: 'all-in-one', // or 'single-vendor' / 'unbundle'
    }),
  ],
})

