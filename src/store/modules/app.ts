import { defineStore } from 'pinia'

interface State {
  // 触发响应式布局的断点标识符
  breakpoint: GridKeyType
  // 窗口宽度
  windowWidth: number
}

const useAppStore = defineStore({
  id: 'app',
  state: (): State => ({
    breakpoint: 'xl',
    windowWidth: 1920,
  }),
  actions: {
    setBreakpoint(breakpoint: GridKeyType) {
      this.breakpoint = breakpoint
    },
    setWindowWidth(width: number) {
      this.windowWidth = width
    },
  },
})

export default useAppStore
