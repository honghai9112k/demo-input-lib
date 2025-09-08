import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { injectCSS } from './inject-css-plugin.js'

export default defineConfig({
  plugins: [
    // Remove Vue plugin since we're going pure JS
    injectCSS()
  ],
  build: {
    target: 'es2015',
    lib: {
      entry: resolve(__dirname, 'src/vanilla-index.js'), // Use vanilla JS entry
      name: 'LowcodeInputLib',
      fileName: 'lowcode-input-lib',
      formats: ['umd']
    },
    rollupOptions: {
      external: [], // No external dependencies
      output: {
        globals: {},
        format: 'umd'
      }
    }
  }
})
