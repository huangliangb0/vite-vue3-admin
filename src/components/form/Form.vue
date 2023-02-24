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
  import type { FormSchemas } from './type'
  import useAppStore from '@/store/modules/app'
  import _ from 'lodash-es'
  import { FormList, FormContent } from './components'

  export default defineComponent({
    name: 'BasicForm',
    components: {
      Widget,
      FormList,
    },
    props: {
      hideAction: {
        type: Boolean,
        default: false,
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
      grid: {
        type: Object as PropType<GridColType>,
        default: () => ({ xs: 24 }),
      },
    },
    emits: ['create-submit', 'reset', 'edit-submit'],
    setup(props, { emit, attrs, expose, slots }) {
      const o: Recordable = {}
      props.schemas.forEach((item) => {
        o[item.field] = item.default
      })
      const formState = reactive({ ...o, ...props.initialState })
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

      provide('__formState__', formState)

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
          {slots.body ? (
            slots.body(props)
          ) : (
            <FormContent schemas={props.schemas} grid={props.grid}>
              {slots.default ? (
                <a-col span={24}>
                  {slots.default({
                    submit: submit,
                    reset: reset,
                    state: formState,
                    instance: formRef,
                  })}
                </a-col>
              ) : null}
              {!props.hideAction ? (
                <a-col span={24}>
                  <a-form-item wrapperCol={btnWrapperCol.value}>
                    <a-space>
                      <a-button type="primary" onClick={submit}>
                        提交
                      </a-button>
                      <a-button onClick={reset}>重置</a-button>
                    </a-space>
                  </a-form-item>
                </a-col>
              ) : null}
            </FormContent>
          )}

          {slots.action
            ? slots.action({
                submit: submit,
                reset: reset,
                state: formState,
                instance: formRef.value,
              })
            : null}
        </a-form>
      )
    },
  })
</script>

<style lang="less" scoped></style>
