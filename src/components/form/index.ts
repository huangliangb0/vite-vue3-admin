/*
 * @Description: 表单
 * @Date: 2022-07-25 09:13:19
 * @LastEditTime: 2022-07-25 09:19:07
 * @FilePath: \vite-vue3-admin\src\components\form\index.ts
 */
import EditForm from './EditForm.vue'
export * from './type'
export { default as widgets } from './widgets'
export { default as FilterSearch } from './FilterSearch.vue'
export { default as EditForm } from './EditForm.vue'
export type EditFormInstance = InstanceType<typeof EditForm>
