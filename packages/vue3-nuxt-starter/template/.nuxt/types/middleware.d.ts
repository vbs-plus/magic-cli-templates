import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "/Users/zhongan/Documents/zhongan/magic-cli-templates/node_modules/.pnpm/nuxt@3.0.0-rc.11_wyqvi574yv7oiwfeinomdzmc3m/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}