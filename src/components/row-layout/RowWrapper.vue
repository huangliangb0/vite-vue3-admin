<script lang="tsx">
  import { computed, defineComponent, PropType, VNode } from 'vue'
  import { Col, Row } from 'ant-design-vue'
  import { removeFragment } from './helper'
  export default defineComponent({
    name: 'App',
    props: {
      /* 可根据自己的需要进行分列 */
      grid: {
        type: Object as PropType<Record<GridKey, number>>,
        default: () => ({}),
      },
    },
    setup(props, { attrs, slots }) {
      const grid = computed(() =>
        Object.assign(
          {},
          { xs: 24, sm: 12, md: 8, lg: 6, xl: 6, xxl: 4, xxxl: 4 },
          props.grid,
        ),
      )

      let children = slots.default ? (slots.default() as VNode[]) : null
      if (children) {
        // 移除 <></> 等标签
        children = removeFragment(children)
      }

      const renderCol = (children: VNode[] | null) => {
        if (!children) return null
        return children.map((c) => {
          return <Col {...grid.value}>{c}</Col>
        })
      }

      return () => <Row {...attrs}>{renderCol(children)}</Row>
    },
  })
</script>

<style lang="less" scoped></style>
