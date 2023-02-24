<!--
 * @Description: 表单控件
 * @Date: 2022-06-22 16:25:22
 * @LastEditTime: 2022-07-05 10:28:01
 * @FilePath: \spvr-plat-web\src\components\core\bo-form\widgets\index.vue
-->
<script lang="tsx">
  import { defineComponent, PropType, VNode } from 'vue'
  import widgets from './index'
  import type { FormSchemaItem, WidgetModifier } from '../type'

  export default defineComponent({
    name: 'Widget',
    inheritAttrs: false,
    props: {
      value: {
        // type: [String, Number, Array] as PropType<InputProps['value']>,
        type: [String, Number, Boolean, Array, Object] as PropType<any>,
        default: undefined,
      },
      component: {
        type: [String, Function, Object] as PropType<
          FormSchemaItem['component']
        >,
      },
      change: {
        type: Function as PropType<(e: any) => void>,
        // required: true,
      },
      modifier: {
        type: Object as PropType<WidgetModifier>,
        default: () => ({}),
      },
      extra: {
        type: [Function, String] as PropType<string | (() => VNode)>,
      },
    },
    emits: ['update:value'],
    setup(props, { attrs, emit }) {
      const { onChange, ...reset } = attrs as any

      const handleChange = (e: any) => {
        let value = e?.target ? e.target.value : e

        if (props.modifier.trim) {
          value = value.trim()
        }

        emit('update:value', value)
        props.change?.(value)
        onChange && onChange(value)
      }

      const component = props.component || 'Input'
      const Widget =
        typeof component === 'string' ? widgets[component] : component

      return () => (
        <div class="form-widget-box">
          <Widget
            {...reset}
            value={props.value}
            onChange={handleChange}
            class="form-widget"
          ></Widget>
          {typeof props.extra === 'function' ? props.extra() : props.extra}
        </div>
      )
    },
  })
</script>

<style lang="less" scoped>
  .form-widget-box {
    width: 100%;
    gap: 8px;
    display: flex;
  }
  .form-widget {
    flex: 1;
    &.ant-switch {
      flex: 0 0 auto;
    }
  }
</style>
