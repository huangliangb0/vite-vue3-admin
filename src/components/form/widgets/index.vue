<!--
 * @Description: 表单控件
 * @Date: 2022-06-22 16:25:22
 * @LastEditTime: 2022-07-05 10:28:01
 * @FilePath: \spvr-plat-web\src\components\core\bo-form\widgets\index.vue
-->
<script lang="tsx">
  import { defineComponent, PropType } from 'vue'
  import widgets from './index'
  import type { WidgetModifier } from '../type'

  export default defineComponent({
    name: 'Widget',
    props: {
      value: {
        // type: [String, Number, Array] as PropType<InputProps['value']>,
        type: [String, Number, Boolean, Array] as PropType<any>,
        default: undefined,
      },
      component: {
        type: String as PropType<keyof typeof widgets>,
        default: 'Input',
      },
      change: {
        type: Function as PropType<(e: any) => void>,
        required: true,
      },
      modifier: {
        type: Object as PropType<WidgetModifier>,
        default: () => ({}),
      },
    },
    setup(props, { attrs }) {
      const { onChange, ...reset } = attrs as any

      const handleChange = (e: any) => {
        let value = e?.target ? e.target.value : e

        if (props.modifier.trim) {
          value = value.trim()
        }

        props.change(value)
        onChange && onChange(value)
      }
      const Widget = widgets[props.component]
      return () => (
        <Widget
          {...reset}
          value={props.value}
          onChange={handleChange}
          class="form-widget"
        ></Widget>
      )
    },
  })
</script>

<style lang="less" scoped>
  .form-widget {
    width: 100%;
  }
</style>
