<script lang="tsx">
  import { computed, defineComponent, PropType, VNode } from 'vue'
  import { Col, Row } from 'ant-design-vue'
  import { removeFragment } from './helper'
  export default defineComponent({
    name: 'App',
    props: {
      /* 可根据自己的需要进行分列 */
      grid: {
        type: Object as PropType<Partial<Record<GridKeyType, number>>>,
        default: () => ({}),
      },
      /* 你可以根据自己的需求设置间距默认值 */
      gutter: {
        type: [Number, Array] as PropType<number | [number, number]>,
        default: () => [20, 20],
      },
    },
    setup(props, { attrs, slots }) {
      const grid = computed(() =>
        Object.assign(
          {},
          // 默认分栏
          { xs: 24, sm: 12, md: 8, lg: 6, xl: 6, xxl: 4, xxxl: 4 },
          props.grid,
        ),
      )

      const renderCol = () => {
        let children = slots.default ? (slots.default() as VNode[]) : null
        if (children) {
          // 移除 <></> 等标签
          children = removeFragment(children)
        }
        if (!children) return null
        return children.map((c) => {
          return <Col {...grid.value}>{c}</Col>
        })
      }

      return () => (
        <Row gutter={props.gutter} {...attrs}>
          {renderCol()}
        </Row>
      )
    },
  })
</script>

<style lang="less" scoped></style>
