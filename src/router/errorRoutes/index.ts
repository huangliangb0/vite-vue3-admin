import { RouteRecordRaw } from 'vue-router'

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/not-found',
    name: 'NotFound',
    meta: {
      title: '页面找不到',
    },
    component: () =>
      import(/* webpackChunkName: "not-found" */ '@/views/error/not-found.vue'),
  },
]
export default constantRoutes
