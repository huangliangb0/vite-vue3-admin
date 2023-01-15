// 全局组件类型声明提示
// components.d.ts
import PageLayout from './components/page-layout/index.vue'
import PageContent from './components/page-layout/PageContent.vue'
import PageHeader from './components/page-layout/PageHeader.vue'

// 引进本地组件文件

declare module 'vue' {
  // 全局组件需通过 GlobalComponents 接口定义(Volar文档中说明)
  export interface GlobalComponents {
    // 自己的全局组件注册类型声明, typeof 表示基于获取组件的TS类型
    PageLayout: typeof PageLayout
    PageHeader: typeof PageHeader
    PageContent: typeof PageContent
  }
}

export {}
