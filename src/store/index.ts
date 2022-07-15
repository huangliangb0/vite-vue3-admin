import { createPinia } from 'pinia'

export function setupStore(app: AppInstance) {
  app.use(createPinia())
}
