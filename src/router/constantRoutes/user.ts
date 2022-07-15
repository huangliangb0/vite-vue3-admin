import { RouteRecordRaw } from 'vue-router'


export default [
  {
    path: '/login',
    name: 'Login',
    meta: {
        title: '登录页'
    },
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/user/login.vue'),
  },
] as RouteRecordRaw[]
