<script lang="tsx">
  import {
    defineComponent,
    reactive,
    toRaw,
    ref,
    PropType,
    computed,
    watch,
  } from 'vue'
  import { FormInstance } from 'ant-design-vue'
  import { Widget } from './widgets'
  import FormList from './components/FormList.vue'
  import type { FormSchemas } from './type'
  import useAppStore from '@/store/modules/app'
  import { omit, pick } from 'lodash'

  const FormItemGrid: GridColType = {
    xs: 24,
  }

  export default defineComponent({
    name: 'BasicForm',
    components: {
      Widget,
      FormList,
    },
    props: {
      hideAction: {
        type: Boolean,
        default: true,
      },
      schemas: {
        type: Array as PropType<FormSchemas>,
        default: () => [],
      },
      initialState: {
        type: Object as PropType<Recordable>,
      },
      colon: {
        type: Boolean,
        default: false,
      },
      labelCol: {
        type: Object as PropType<Recordable>,
      },
      labelWidth: {
        type: [Number, String],
      },
      isEdit: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['create-submit', 'reset', 'edit-submit'],
    setup(props, { emit, attrs, expose, slots }) {
      const o: Recordable = {}
      props.schemas.forEach((item) => {
        o[item.field] = item.default
      })
      const formState = reactive({ ...o })
      const formRef = ref<FormInstance>()
      const appStore = useAppStore()

      const labelCol = computed(() => {
        if (props.labelCol) {
          return props.labelCol
        }
        if (props.labelWidth) {
          return {
            style: {
              width: +props.labelWidth + 'px',
            },
          }
        }
        return undefined
      })

      const btnWrapperCol = computed(() => {
        if (props.labelCol) {
          const o: Recordable = {}

          Object.keys(props.labelCol).forEach((k) => {
            const v = props.labelCol![k]
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
        }
        if (props.labelWidth && appStore.breakpoint !== 'xs') {
          return {
            style: {
              paddingLeft: +props.labelWidth + 'px',
            },
          }
        }
        return undefined
      })

      // watch
      watch(
        () => props.initialState,
        (state) => {
          if (state) {
            Object.assign(formState, state)
          } else {
            reset()
          }
        },
      )

      // 提交
      const submit = (e: Event) => {
        e.preventDefault()

        console.log(formState)

        formRef.value
          ?.validate()
          .then(() => {
            if (props.isEdit) {
              emit('edit-submit', toRaw(formState))
            } else {
              emit('create-submit', toRaw(formState))
            }
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
          labelCol={labelCol.value}
          autocomplete="off"
          colon={props.colon}
          {...attrs}
        >
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
                  {...Object.assign({}, FormItemGrid, item.grid)}
                >
                  <a-form-item
                    label={item.label}
                    name={item.field}
                    {...omit(formItemProps, ['label', 'extra', 'help'])}
                    v-slots={pick(formItemProps, ['label', 'extra', 'help'])}
                  >
                    {item.type === 'array' ? (
                      <FormList
                        component={item.component}
                        value={formState[item.field]}
                        value-format={item.valueFormat}
                        schemas={item.schemas}
                        change={(value: any) => {
                          formState[item.field] = value
                        }}
                        componentProps={componentProps}
                      ></FormList>
                    ) : (
                      <Widget
                        component={item.component}
                        value={formState[item.field]}
                        change={(value) => {
                          formState[item.field] = value
                        }}
                        {...componentProps}
                      ></Widget>
                    )}
                  </a-form-item>
                </a-col>
              )
            })}
            {slots.default ? (
              <a-col span={24}>
                {slots.default({
                  state: formState,
                  instance: formRef,
                })}
              </a-col>
            ) : null}
            {props.hideAction ? (
              <a-col span={24}>
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
              </a-col>
            ) : null}
          </a-row>
        </a-form>
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
