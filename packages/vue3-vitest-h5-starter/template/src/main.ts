import { createWebHashHistory } from 'vue-router';
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import type { UserModule } from './types'
import { deefaultRouterList } from './router'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import './styles/css-vars.scss'
import './styles/index.scss'
import 'uno.css'


// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  {
    history: createWebHashHistory(),
    routes: deefaultRouterList,
  },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true })).forEach((i) =>
      i.install?.(ctx)
    )
  }
)
