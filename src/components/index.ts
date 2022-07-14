// 导出组件
// export { default as AppSearch } from './AppSearch/index.vue'
// export { default as AppSetting } from './AppSetting/index.vue'
// export { default as AppMessage } from './AppMessage/index.vue'
// export { default as Identify } from './Identify/index.vue'

/**
 * 注册全局组件
 * 全局组件必须通过g.js导出
 * 必须有name属性, 即组件名
 * @param {*} app
 */
export const setupGlobalComponent = (app: AppInstance) => {
  const modules = import.meta.globEager('./*/g.ts')

  Object.keys(modules).forEach(path => {
    if (path.endsWith('/g.ts')) {
      let comp = modules[path].default || modules[path]
      if (!Array.isArray(comp)) {
        comp = [comp]
      }
      comp.forEach((item: any) => {
        app.component(item.name || item.diaplayName, item)
      })
    }
  })
}
