<script lang="tsx">
  import { defineComponent, ref, PropType, watch } from 'vue'
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
      initialValue: {
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
      const formListState = ref<any[]>(cloneDeep(props.initialValue))
      const handleAdd = () => {
        formListState.value.push(cloneDeep(props.valueFormat))
      }
      const handleRemove = (index: number) => {
        formListState.value.splice(index, 1)
      }

      const handleChange = () => {
        props.change(formListState.value)
      }

      watch(
        () => props.initialValue,
        (value) => {
          formListState.value = cloneDeep(value)
        },
      )

      return () =>
        typeof props.valueFormat === 'object' ? (
          <>
            {formListState.value.map((_p, p_index) => (
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
                            value={formListState.value[p_index][item.field]}
                            change={(value) => {
                              formListState.value[p_index][item.field] = value
                              handleChange()
                            }}
                            {...(typeof item.componentProps === 'function'
                              ? item.componentProps(formListState)
                              : item.componentProps)}
                            placeholder="请选择"
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
            {formListState.value.map((_item, index) => (
              <a-form-item key={index}>
                <a-row gutter={[20, 20]}>
                  <a-col style="flex: 1">
                    <Widget
                      component={props.component}
                      value={formListState.value[index]}
                      change={(value) => {
                        formListState.value[index] = value
                        handleChange()
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
