<script lang="tsx">
  import {
    defineComponent,
    reactive,
    toRaw,
    ref,
    computed,
    PropType,
    StyleValue,
  } from 'vue'
  import { FormInstance } from 'ant-design-vue'
  import { Widget } from './widgets'
  import ExpandToggle from './ExpandToggle.vue'
  import type { FormSchemas } from './type'
  import { RowWrapper } from '@/components/row-layout'
  import { useAppStore } from '@/store/modules/app'
  export default defineComponent({
    name: 'FilterSearch',
    // expose: ['formState', 'change', 'reset', 'submit'],
    props: {
      schemas: {
        type: Array as PropType<FormSchemas>,
        default: () => [],
      },
      showCount: {
        type: Number,
        default: 0,
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
          xs: 12,
          sm: 12,
          md: 12,
          lg: 8,
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

      const btnBoxStyle = computed<StyleValue>(() => {
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
          colon={props.colon}
          class="filter--search--form"
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
            <a-form-item>
              <div style={btnBoxStyle.value}>
                <a-button type="primary" onClick={submit}>
                  查询
                </a-button>
                <a-button
                  style="margin-left: 10px;width: 60px;"
                  onClick={reset}
                >
                  重置
                </a-button>
                {props.showCount > 0 ? (
                  <ExpandToggle
                    isExpand={isExpand.value}
                    onClick={toggleExpand}
                  ></ExpandToggle>
                ) : null}
              </div>
            </a-form-item>
          </RowWrapper>
        </a-form>
      )
    },
  })
</script>

<style lang="less" scoped>
  .filter--search--form {
    width: 100%;
    .ant-form-item {
      margin-bottom: 0;
    }
  }
</style>
