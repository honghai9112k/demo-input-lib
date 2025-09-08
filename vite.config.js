import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { injectCSS } from './inject-css-plugin.js'

export default defineConfig({
  plugins: [
    vue(),
    injectCSS()
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LowcoderInputLib',
      fileName: 'lowcoder-input-lib',
      formats: ['umd']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
