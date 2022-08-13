<script lang="tsx">
  import { defineComponent, PropType } from 'vue'
  import widgets, { Widget } from './widgets'
  import type { FormSchemas, WidgetProps } from './type'
  import { cloneDeep } from 'lodash'
  import { MinusOutlined } from '@ant-design/icons-vue'
  export default defineComponent({
    name: 'FormList',
    components: {
      MinusOutlined,
      Widget,
    },
    props: {
      schemas: {
        type: Array as PropType<FormSchemas>,
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
      const handleAdd = () => {
        const data = props.value
        data.push(cloneDeep(props.valueFormat))
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
          <>
            {value.map((_p, p_index) => (
              <a-row gutter={[20, 0]} class="form--list" align="bottom">
                <a-col key={p_index} style="flex: 1">
                  <a-row gutter={[20, 0]}>
                    {props.schemas.map((item) => (
                      <a-col
                        key={item.field}
                        lg={item.span || 24 / props.schemas.length}
                        md={24}
                      >
                        <a-form-item label={item.label} name={item.field}>
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
          </>
        ) : (
          <>
            {props.value.map((_item, index) => (
              <a-form-item key={index}>
                <a-row gutter={[20, 20]}>
                  <a-col style="flex: 1">
                    <Widget
                      component={props.component}
                      value={value[index]}
                      change={(value) => {
                        handleChange(index, value)
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
                      onClick={() => handleRemove(index)}
                    ></a-button>
                  </a-col>
                </a-row>
              </a-form-item>
            ))}
            <a-button onClick={handleAdd} style="width: 100%">
              添加字段
            </a-button>
          </>
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
