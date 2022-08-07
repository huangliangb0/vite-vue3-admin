import mitt from 'mitt'

// 往往搜索表单中，在重置值的时候，一些自定义表单控件会作一些重置后的操作，这时候就需要用到下面的发布订阅了
export const FILTER_SEARCH_RESET = 'FILTER_SEARCH_RESET'
export const emitter = mitt()
export const emitFilterSearchReset = () => {
  emitter.emit(FILTER_SEARCH_RESET)
}
export const onFilterSearchReset = (cb: () => void) => {
  emitter.on(FILTER_SEARCH_RESET, cb)
}

export const takeOffFilterSearchReset = () => {
  emitter.off(FILTER_SEARCH_RESET)
}
