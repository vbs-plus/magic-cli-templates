/// <reference types="vitest" />

import { rmSync } from 'fs'
import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import electron, { onstart } from 'vite-plugin-electron'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import dynamicImport from 'vite-plugin-dynamic-import'
import pkg from './package.json'

rmSync('dist', { recursive: true, force: true }) // v14.14.0

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@/': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    Vue({
      reactivityTransform: true,
    }),
    electron({
      main: {
        entry: 'electron/main/index.ts',
        vite: {
          build: {
            // For Debug
            sourcemap: true,
            outDir: 'dist/electron/main',
          },
          // Will start Electron via VSCode Debug
          plugins: [process.env.VSCODE_DEBUG ? onstart() : null],
        },
      },
      preload: {
        input: {
          // You can configure multiple preload here
          index: path.join(__dirname, 'electron/preload/index.ts'),
        },
        vite: {
          build: {
            // For Debug
            sourcemap: 'inline',
            outDir: 'dist/electron/preload',
          },
        },
      },
      // Enables use of Node.js API in the Renderer-process
      // https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#electron-renderervite-serve
      renderer: {
      },
    }),
    AutoImport({
      imports: ['vue', 'vue/macros', 'vue-router', '@vueuse/core'],
      dts: 'auto-imports.d.ts',
      vueTemplate: true,
    }),
    Components({ dts: true }),
    Unocss(),
    dynamicImport(),
  ],
  server: process.env.VSCODE_DEBUG
    ? {
        host: pkg.debug.env.VITE_DEV_SERVER_HOST,
        port: pkg.debug.env.VITE_DEV_SERVER_PORT,
      }
    : undefined,
  test: {
    environment: 'jsdom',
  },
})
