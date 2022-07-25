<script lang="tsx">
  import {
    defineComponent,
    reactive,
    toRaw,
    ref,
    onMounted,
    nextTick,
    computed,
    PropType,
  } from 'vue'
  import { ConfigProvider, FormInstance } from 'ant-design-vue'
  import { Widget } from './widgets'
  import ExpandToggle from './ExpandToggle.vue'
  import type { FilterSearchSchemas } from './type'
  import { RowWrapper } from '@/components/row-layout'
  import { useAppStore } from '@/store/modules/app'
  export default defineComponent({
    name: 'FilterSearch',
    // expose: ['formState', 'change', 'reset', 'submit'],
    props: {
      width: {
        type: String,
      },
      schemas: {
        type: Array as PropType<FilterSearchSchemas>,
        default: () => [],
      },
      showCount: {
        type: Number,
        default: 0,
      },
      showSubmitBtn: {
        type: Boolean,
        default: true,
      },
      showResetBtn: {
        type: Boolean,
        default: true,
      },
      col: {
        type: [Number, Array] as PropType<number | number[]>,
        default: 4,
      },
      gutter: {
        type: [Number, Array, Object] as PropType<
          number | number[] | { xs: number; sm: number; md: number }
        >,
        default: () => [24, 24],
      },

      colon: {
        type: Boolean,
        default: false,
      },
      grid: {
        type: Object as PropType<Record<GridKey, number>>,
        default: () => ({
          // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xx1' | 'xxx1'
          xs: 12,
          sm: 12,
          md: 8,
          lg: 6,
          xl: 6,
          xxl: 4,
          xxxl: 4,
        }),
      },
    },
    emits: ['submit', 'reset'],
    setup(props, { emit, attrs, expose }) {
      const o: Recordable = {}
      props.schemas.forEach((item) => {
        o[item.field] = item.defaultValue
      })
      const formState = reactive(o)
      const formRef = ref<FormInstance>()
      const isExpand = ref(false)
      const appStore = useAppStore()
      const windowSize = computed(() => appStore.windowSize)
      const col = computed(() => 24 / props.grid[windowSize.value])
      const remainder = computed(() => {
        return props.schemas.length % col.value
      })

      const justify = computed(() => {
        return remainder.value === 0 ? 'end' : 'start'
      })

      const btnBoxStyle = computed(() => {
        return { textAlign: remainder.value === 0 ? 'right' : 'left' }
      })

      // 提交
      const submit = (e: Event) => {
        e.preventDefault()
        emit('submit', toRaw(formState))
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

      // 展开收缩
      const toggleExpand = () => {
        isExpand.value = !isExpand.value
      }

      onMounted(() => {
        nextTick(() => {
          props.schemas.forEach((item) => {
            if (item.initialValue !== undefined) {
              formState[item.field] = item.initialValue
            }
          })
        })
      })

      expose({
        formState,
        change,
        reset,
        submit,
      })

      return () => (
        <a-form
          ref={formRef}
          model={formState}
          autocomplete="off"
          class="bo--form"
          {...attrs}
        >
          <RowWrapper
            gutter={props.gutter}
            justify={justify.value}
            grid={props.grid}
          >
            {props.schemas
              .slice(
                0,
                props.showCount === 0
                  ? props.schemas.length
                  : isExpand.value
                  ? props.schemas.length
                  : props.showCount,
              )
              .map((item) => (
                <a-form-item
                  key={item.field}
                  label={item.label}
                  colon={props.colon}
                  name={item.field}
                >
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
                </a-form-item>
              ))}
            <ConfigProvider autoInsertSpaceInButton={false}>
              <a-form-item style={btnBoxStyle.value}>
                {props.showSubmitBtn && (
                  <a-button type="primary" onClick={submit}>
                    查询
                  </a-button>
                )}
                {props.showResetBtn && (
                  <a-button
                    style="margin-left: 10px;width: 60px;"
                    onClick={reset}
                  >
                    重置
                  </a-button>
                )}
                {props.showCount > 0 ? (
                  <ExpandToggle
                    isExpand={isExpand.value}
                    onClick={toggleExpand}
                  ></ExpandToggle>
                ) : null}
              </a-form-item>
            </ConfigProvider>
          </RowWrapper>
        </a-form>
      )
    },
  })
</script>

<style lang="less" scoped>
  .bo--form {
    width: 100%;
    :deep(.ant-row.ant-form-item) {
      margin-bottom: 0;
    }
    :deep(.ant-btn-primary) {
      width: 90px;
      height: 32px;
      background: #2265d1;
      background: #2265d1;
      border-color: #2265d1;
    }
    :deep(.ant-btn-default) {
      width: 90px;
      height: 32px;
      border-radius: 2px;
      color: #2265d1;
      border: 1px solid #2265d1;
    }
  }
</style>