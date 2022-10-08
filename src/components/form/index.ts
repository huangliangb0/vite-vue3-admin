import { defineAsyncComponent, h } from 'vue'
import { default as FormComp } from './Form.vue'

export * from './type'
export { default as widgets } from './widgets'
export { default as FilterSearch } from './FilterSearch.vue'
// export { default as Form } from './Form.vue'

export const Form = defineAsyncComponent({
  loader: () => import('./Form.vue'),
  delay: 5000,
  timeout: 3000,
  errorComponent: h(
    'div',
    {},
    {
      default: () => 'error',
    },
  ),
  loadingComponent: h(
    'div',
    {},
    {
      default: () => 'loading',
    },
  ),
})
