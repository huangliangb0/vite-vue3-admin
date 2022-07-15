import { RouteRecordRaw } from 'vue-router'

let constantRoutes: RouteRecordRaw[] = []

const modules = import.meta.globEager('./*.ts')

Object.keys(modules).forEach(path => {
  if (path !== './index.ts') {
    const routes = modules[path].default || modules[path]
    if (Array.isArray(routes)) {
        constantRoutes = constantRoutes.concat(...routes)
    }
  }
})

export default constantRoutes
