import { Component } from 'vue'
// import { RouteRecordRaw } from 'vue-router'

export type RoutesMap = Record<string, Component>

let permissionRoutes: RoutesMap = {}
let keys = [] as string[]

const modules = import.meta.globEager('./*.ts')

Object.keys(modules).forEach(path => {
  if (path !== './index.ts') {
    const routes = modules[path].default || modules[path]
    for (const [key, component] of Object.entries(routes)) {
      if (keys.includes(key)) {
        console.error(`有重复的key值：${key}，请检查你的路由并进行修改`)
      } else {
        keys.push(key)
        permissionRoutes[key] = component as Component
      }
    }
  }
})

export default permissionRoutes
