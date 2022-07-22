<!--
 * @Description: svg 组件
 * @Date: 2022-07-22 11:41:55
 * @LastEditTime: 2022-07-22 17:41:41
 * @FilePath: \vite-vue3-admin\src\components\SvgIcon\index.vue
-->
<script lang="tsx">
  import { defineComponent, computed } from 'vue'

  export default defineComponent({
    name: 'SvgIcon',
    props: {
      prefix: {
        type: String,
        default: 'icon',
      },
      name: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        default: '',
      },
    },
    setup(props) {
      const symbolId = computed(() => `#${props.prefix}-${props.name}`)

      return () => (
        <svg aria-hidden="true" class="svg-icon">
          <use xlinkHref={symbolId.value} fill={props.color}></use>
        </svg>
      )
    },
  })
</script>

<style lang="less" scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
