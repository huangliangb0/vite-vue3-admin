import { TableFormList } from '../components'
import { useInjectFormState } from './useFormContext'

export const useListForm = (
  props: InstanceType<typeof TableFormList>['$props'],
) => {
  const formState = useInjectFormState()

  const addDisabled = computed(() => {
    if (formState[props.field] === undefined || props.max === undefined) {
      return false
    }

    return formState[props.field].length >= props.max
  })

  const removeDisabled = computed(() => {
    if (formState[props.field] === undefined) {
      return false
    }

    return formState[props.field].length <= props.min!
  })

  onMounted(() => {
    if (
      (!Array.isArray(formState[props.field]) ||
        formState[props.field].length === 0) &&
      props.min! > 0
    ) {
      formState[props.field] = new Array(props.min)
        .fill(null)
        .map(() => ({ ...props.valueFormat }))
    }
  })

  return {
    addDisabled,
    removeDisabled,
  }
}
