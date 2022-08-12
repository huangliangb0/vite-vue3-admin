<script lang="tsx">
  import {
    defineComponent,
    reactive,
    toRaw,
    ref,
    PropType,
    watch,
    computed,
  } from 'vue'
  import { FormInstance } from 'ant-design-vue'
  import { Widget } from './widgets'
  import FormList from './FormList.vue'
  import type { FormSchemas } from './type'

  export default defineComponent({
    name: 'EditForm',
    components: {
      Widget,
      FormList,
    },
    props: {
      schemas: {
        type: Array as PropType<FormSchemas>,
        default: () => [],
      },
      initialValue: {
        type: Object as PropType<Recordable>,
        default: () => ({}),
      },
      colon: {
        type: Boolean,
        default: false,
      },
      labelCol: {
        type: Object as PropType<Recordable>,
        default: () => ({}),
      },
    },
    emits: ['submit', 'reset'],
    setup(props, { emit, attrs, expose, slots }) {
      const o: Recordable = {}
      props.schemas.forEach((item) => {
        if (item.type === 'array') {
          o[item.field] = item.defaultValue || []
        } else {
          o[item.field] = item.defaultValue
        }
      })
      const formState = reactive({ ...o, ...props.initialValue })
      const formRef = ref<FormInstance>()

      const btnWrapperCol = computed(() => {
        const o: Recordable = {}

        Object.keys(props.labelCol).forEach((k) => {
          const v = props.labelCol[k]
          if (typeof v === 'object') {
            Object.keys(v).forEach((i) => {
              if (i === 'span') {
                o[k] = {
                  span: 24 - (v[i] || 0),
                  offset: v[k] || 0,
                }
              }
            })
          } else if (k === 'span') {
            o.span = 24 - (v || 0)
            o.offset = v || 0
          }
        })

        return o
      })
      // 提交
      const submit = (e: Event) => {
        e.preventDefault()

        formRef.value
          ?.validate()
          .then(() => {
            emit('submit', toRaw(formState))
          })
          .catch((error) => {
            console.error('表单验证失败', error)
          })
      }

      // 重置
      const reset = () => {
        formRef.value?.resetFields()

        emit('reset', toRaw(formState))
      }

      const change = (o: Record<string, any>) => {
        Object.keys(o).forEach((key) => {
          formState[key] = o[key]
        })
      }

      watch(
        () => props.initialValue,
        (value) => {
          if (value) {
            Object.keys(value).forEach((k) => {
              formState[k] = value[k]
            })
          }
        },
        {
          deep: true,
        },
      )

      expose({
        formState,
        change,
        reset,
        submit,
      })

      return () => (
        <a-form
          id="edit--form"
          ref={formRef}
          model={formState}
          labelCol={props.labelCol}
          autocomplete="off"
          {...attrs}
        >
          {props.schemas.map((item) => (
            <a-form-item
              key={item.field}
              label={item.label}
              colon={props.colon}
              name={item.field}
              {...item.formItemProps}
            >
              {item.type === 'array' ? (
                <FormList
                  component={item.component}
                  initialValue={props.initialValue[item.field]}
                  value-format={item.valueFormat}
                  schemas={item.schemas}
                  change={(value: any) => {
                    formState[item.field] = value
                  }}
                  componentProps={
                    typeof item.componentProps === 'function'
                      ? item.componentProps(formState)
                      : item.componentProps
                  }
                ></FormList>
              ) : (
                <Widget
                  component={item.component}
                  value={formState[item.field]}
                  change={(value) => {
                    formState[item.field] = value
                  }}
                  {...(typeof item.componentProps === 'function'
                    ? item.componentProps(formState)
                    : item.componentProps)}
                ></Widget>
              )}
            </a-form-item>
          ))}
          <a-form-item wrapperCol={btnWrapperCol.value}>
            {slots.action ? (
              slots.action({
                submit: submit,
                reset: reset,
                instance: formRef.value,
              })
            ) : (
              <a-space>
                <a-button type="primary" onClick={submit}>
                  提交
                </a-button>
                <a-button onClick={reset}>重置</a-button>
              </a-space>
            )}
          </a-form-item>
        </a-form>
      )
    },
  })
</script>

<style lang="less" scoped></style>
