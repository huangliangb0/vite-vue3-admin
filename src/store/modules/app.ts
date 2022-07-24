import { defineStore } from 'pinia'

interface State {
  // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xx1' | 'xxx1'
  windowSize: GridKey
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): State => ({
    windowSize: 'xl',
  }),
  actions: {
    setWindowSize(windowSize: GridKey) {
      this.windowSize = windowSize
    },
  },
})
