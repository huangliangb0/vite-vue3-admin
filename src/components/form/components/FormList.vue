<script lang="tsx">
  import { computed, defineComponent, PropType } from 'vue'
  import { Widget } from '../widgets'
  import type { FormSchemaItem, WidgetProps } from '../type'
  import _ from 'lodash-es'
  import { MinusOutlined } from '@ant-design/icons-vue'
  import { GRID_KEYS } from '@/constant/app'
  export default defineComponent({
    name: 'FormList',
    components: {
      MinusOutlined,
      Widget,
    },
    props: {
      field: String,
      min: {
        type: Number,
        default: 1,
        validator(value: number) {
          return value >= 0
        },
      },
      max: {
        type: Number,
        validator(value?: number) {
          return value === undefined || value >= 1
        },
      },
      schemas: {
        type: Array as PropType<FormSchemaItem['schemas']>,
        default: () => [],
      },
      value: {
        type: Array as PropType<any[]>,
        default: () => [],
      },
      valueFormat: {
        type: [String, Number, Boolean, Object] as PropType<
          string | number | boolean | Recordable
        >,
        default: () => '',
      },
      component: {
        type: String as PropType<FormSchemaItem['component']>,
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
      grid: {
        type: Object as PropType<Record<GridKeyType, number>>,
        default: () => ({}),
      },
    },
    setup(props) {
      const grid = computed(() => {
        const o: GridColType = {}
        GRID_KEYS.forEach((key) => {
          o[key] = props.grid[key] || 24 / props.schemas!.length
        })
        return o
      })

      const handleAdd = () => {
        const data = props.value
        data.push(_.cloneDeep(props.valueFormat))
        props.change(data)
      }
      const handleRemove = (index: number) => {
        const data = props.value

        data.splice(index, 1)
        props.change(data)
      }

      const handleChange = (...arg: any[]) => {
        const data = props.value
        if (arg.length === 2) {
          const [index, value] = arg as [number, any]
          data[index] = value
        } else if (arg.length === 3) {
          const [index, field, value] = arg as [number, string, any]
          data[index][field] = value
        }
        props.change(data)
      }

      return () => {
        const { valueFormat, value } = props
        return typeof valueFormat === 'object' ? (
          <a-space size={20} direction="vertical" style={{ width: '100%' }}>
            {value.map((_p, p_index) => (
              <a-row gutter={[20, 0]} class="form--list" align="top">
                <a-col key={p_index} style="flex: 1">
                  <a-row gutter={[20, 20]}>
                    {props.schemas!.map((item) => (
                      <a-col
                        key={item.field}
                        {...Object.assign({}, grid.value, item.grid)}
                      >
                        <a-form-item
                          {...Object.assign(
                            {
                              label: item.label,
                              name: [props.field, p_index, item.field],
                            },
                            typeof item.formItemProps === 'function'
                              ? item.formItemProps(item, p_index)
                              : item.formItemProps || {},
                          )}
                        >
                          <Widget
                            component={item.component}
                            value={value[p_index][item.field]}
                            change={(value) => {
                              handleChange(p_index, item.field, value)
                            }}
                            {...(typeof item.componentProps === 'function'
                              ? item.componentProps(value)
                              : item.componentProps)}
                          ></Widget>
                        </a-form-item>
                      </a-col>
                    ))}
                  </a-row>
                </a-col>
                <a-col>
                  <a-form-item>
                    <a-button
                      shape="circle"
                      v-slots={{
                        icon: () => (
                          <MinusOutlined
                            style={{ color: '#999' }}
                          ></MinusOutlined>
                        ),
                      }}
                      onClick={() => handleRemove(p_index)}
                    ></a-button>
                  </a-form-item>
                </a-col>
              </a-row>
            ))}
            <a-button onClick={handleAdd} style="width: 100%">
              添加字段
            </a-button>
          </a-space>
        ) : (
          <a-space size={20} direction="vertical" style={{ width: '100%' }}>
            {props.value.map((item, p_index) => (
              <a-form-item
                key={p_index}
                {...Object.assign(
                  {
                    name: [props.field, p_index],
                  },
                  typeof item.formItemProps === 'function'
                    ? item.formItemProps(item, p_index)
                    : item.formItemProps || {},
                )}
              >
                <a-row gutter={[20, 20]}>
                  <a-col style="flex: 1">
                    <Widget
                      component={props.component}
                      value={value[p_index]}
                      change={(value) => {
                        handleChange(p_index, value)
                      }}
                      {...props.componentProps}
                    ></Widget>
                  </a-col>
                  <a-col>
                    <a-button
                      shape="circle"
                      v-slots={{
                        icon: () => (
                          <MinusOutlined
                            style={{ color: '#999' }}
                          ></MinusOutlined>
                        ),
                      }}
                      onClick={() => handleRemove(p_index)}
                    ></a-button>
                  </a-col>
                </a-row>
              </a-form-item>
            ))}
            <a-button onClick={handleAdd} style="width: 100%">
              添加字段
            </a-button>
          </a-space>
        )
      }
    },
  })
</script>

<style lang="less">
  .form--list {
    .ant-col-md-24 {
      width: 100%;
    }
    .ant-form-item {
      height: auto;
      .ant-form-item-label {
        flex: inherit;
      }
      .ant-form-item-control {
        flex: 1;
      }
    }

    @media (max-width: 575px) {
      .ant-form-item-label {
        padding-bottom: 0;
        label {
          margin: 0 8px 0 2px;
        }
      }
    }
  }
</style>
