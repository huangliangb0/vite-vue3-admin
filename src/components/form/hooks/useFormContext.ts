import { provide, inject } from 'vue'

const KEY = '__formState__gdfiuyremnsd'

export const useProvideFormState = (formState: Recordable) => {
  provide(KEY, formState)
}

export const useInjectFormState = () => {
  const formState = inject(KEY) as Record<string | number, any[]>

  return formState
}
