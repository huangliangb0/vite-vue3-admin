<script lang="tsx">
  import { defineComponent, PropType, VNode } from 'vue'
  import { Col, Row } from 'ant-design-vue'
  import { removeFragment } from './helper'
  export default defineComponent({
    name: 'App',
    props: {
      grid: {
        type: Object as PropType<Record<GridKey, number>>,
        default: () => ({
          xs: 24,
          sm: 12,
          md: 8,
          lg: 6,
          xl: 6,
          xxl: 4,
          xxxl: 4,
        }),
      },
    },
    setup(props, { attrs, slots }) {
      let children = slots.default ? (slots.default() as VNode[]) : null
      if (children) {
        children = removeFragment(children)
      }

      const renderCol = (children: VNode[] | null) => {
        if (!children) return null
        return children.map((c) => {
          return <Col {...props.grid}>{c}</Col>
        })
      }

      return () => <Row {...attrs}>{renderCol(children)}</Row>
    },
  })
</script>

<style lang="less" scoped></style>
