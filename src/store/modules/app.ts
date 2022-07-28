import { defineStore } from 'pinia'

interface State {
  // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xx1' | 'xxx1'
  windowSize: GridKey
  windowWidth: number
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): State => ({
    windowSize: 'xl',
    windowWidth: 1920,
  }),
  actions: {
    setWindowSize(windowSize: GridKey) {
      this.windowSize = windowSize
    },
    setWindowWidth(width: number) {
      this.windowWidth = width
    },
  },
})
