<script lang="tsx">
  import { defineComponent, ref, PropType, toRaw } from 'vue'
  import widgets, { Widget } from './widgets'
  import type { FilterSearchSchemas, WidgetProps } from './type'
  import { cloneDeep } from 'lodash'
  export default defineComponent({
    name: 'FormList',
    props: {
      schemas: {
        type: Array as PropType<FilterSearchSchemas>,
        default: () => [],
      },
      initialValue: {
        type: Array as PropType<any[]>,
        default: () => [],
      },
      component: {
        type: String as PropType<keyof typeof widgets>,
        default: 'Input',
      },
      componentProps: {
        type: Object as PropType<WidgetProps>,
        default: () => ({}),
      },
      change: {
        type: Function as PropType<(e: any) => void>,
        required: true,
      },
    },
    setup(props) {
      const formState = ref<any[]>(cloneDeep(props.initialValue))
      const handleAdd = () => {
        formState.value.push(cloneDeep(props.initialValue))
        console.log('formState.valueformState.value', formState.value)
      }

      const handleChange = () => {
        props.change(toRaw(formState))
      }

      return () => (
        <a-row gutter={[20, 20]}>
          {typeof props.initialValue[0] === 'object'
            ? formState.value.map((_p, p_index) => (
                <>
                  {props.schemas.map((item) => (
                    <a-col
                      key={item.field}
                      span={item.span || 24 / props.schemas.length}
                    >
                      <a-form-item label={item.label} name={item.field}>
                        <Widget
                          component={item.component}
                          value={formState.value[p_index][item.field]}
                          change={(value) => {
                            formState.value[p_index][item.field] = value
                            handleChange()
                          }}
                          componentProps={
                            typeof item.componentProps === 'function'
                              ? item.componentProps(formState)
                              : item.componentProps
                          }
                        ></Widget>
                      </a-form-item>
                    </a-col>
                  ))}
                </>
              ))
            : formState.value.map((_item, index) => (
                <a-col span={24}>
                  <Widget
                    component={props.component}
                    value={formState.value[index]}
                    change={(value) => {
                      formState.value[index] = value
                      handleChange()
                    }}
                    {...props.componentProps}
                  ></Widget>
                </a-col>
              ))}
          <a-col span={24}>
            <a-button onClick={handleAdd}>添加字段</a-button>
          </a-col>
        </a-row>
      )
    },
  })
</script>
