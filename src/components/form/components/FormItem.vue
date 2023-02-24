<script lang="tsx">
  import { defineComponent, PropType } from 'vue'
  import { Widget } from '../widgets'
  import FormList from './FormList.vue'
  import _ from 'lodash-es'
  import { FormSchemaItem, WidgetProps } from '../type'
  import TableFormList from './TableFormList.vue'

  export default defineComponent({
    name: 'BasicFormItem',
    components: {
      Widget,
      FormList,
    },
    props: {
      item: {
        type: Object as PropType<FormSchemaItem<Recordable<any>>>,
        required: true,
      },
      formItemProps: {
        type: Object as PropType<FormSchemaItem['formItemProps']>,
        default: () => ({}),
      },
      componentProps: {
        type: Object as PropType<WidgetProps>,
        default: () => ({}),
      },
    },
    emits: ['create-submit', 'reset', 'edit-submit'],
    setup(props) {
      const formState = inject('__formState__') as Record<string, any[]>

      return () => (
        <a-form-item
          {...Object.assign(
            {
              label: props.item.label,
              name: props.item.field,
            },
            _.omit(props.formItemProps, ['label', 'extra', 'help']),
          )}
          v-slots={_.pick(props.formItemProps, ['label', 'extra', 'help'])}
        >
          {props.item.type === 'array' ? (
            <FormList
              field={props.item.field}
              component={props.item.component}
              value={formState[props.item.field]}
              value-format={props.item.valueFormat}
              schemas={props.item.schemas}
              change={(value: any) => {
                formState[props.item.field] = value
              }}
              componentProps={props.componentProps}
            ></FormList>
          ) : props.item.type === 'table' ? (
            <TableFormList
              field={props.item.field}
              valueFormat={props.item.valueFormat as Recordable}
              schemas={props.item.schemas}
            />
          ) : (
            <Widget
              field={props.item.field}
              component={props.item.component}
              value={formState[props.item.field]}
              change={(value: any) => {
                formState[props.item.field] = value
              }}
              {...props.componentProps}
            ></Widget>
          )}
        </a-form-item>
      )
    },
  })
</script>
