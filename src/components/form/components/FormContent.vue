<script lang="tsx">
  import { defineComponent, PropType, computed } from 'vue'
  import { Widget } from '../widgets'
  import type { FormSchemas } from '../type'
  import _ from 'lodash-es'
  import { FormList, FormItem } from './'
  import { useInjectFormState } from '../hooks/useFormContext'

  export default defineComponent({
    name: 'BasicForm',
    components: {
      Widget,
      FormList,
    },
    props: {
      schemas: {
        type: Array as PropType<FormSchemas>,
        default: () => [],
      },
      grid: {
        type: Object as PropType<GridColType>,
        default: () => ({ xs: 24 }),
      },
      formState: {
        type: Object as PropType<Recordable>,
      },
    },
    setup(props, { slots }) {
      const formState = useInjectFormState()

      return () => (
        <a-row class="edit--form_row" gutter={[20, 20]}>
          {props.schemas.map((item) => {
            const componentProps =
              typeof item.componentProps === 'function'
                ? item.componentProps(formState)
                : item.componentProps
            const formItemProps =
              typeof item.formItemProps === 'function'
                ? item.formItemProps(formState)
                : item.formItemProps
            return (
              <a-col
                key={item.field}
                {...Object.assign({}, props.grid, item.grid)}
              >
                <FormItem
                  item={item}
                  formItemProps={formItemProps}
                  componentProps={componentProps}
                />
              </a-col>
            )
          })}
          {slots.default ? slots.default() : null}
        </a-row>
      )
    },
  })
</script>

<style lang="less" scoped>
  .edit--form_row {
    :deep(.ant-form-item) {
      margin-bottom: 0;
    }
  }
</style>
