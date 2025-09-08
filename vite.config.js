import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { injectCSS } from './inject-css-plugin.js'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Compile to vanilla JS functions
          isCustomElement: () => false
        }
      }
    }),
    injectCSS()
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LowcoderInputLib',
      fileName: 'lowcode-input-lib',
      formats: ['umd']
    },
    rollupOptions: {
      external: [], // Don't externalize Vue - bundle it
      output: {
        globals: {}
      }
    }
  }
})
