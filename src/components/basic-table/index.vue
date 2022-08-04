<script lang="tsx">
  import { computed, defineComponent, PropType, ref, watch } from 'vue'
  import { QuestionCircleOutlined } from '@ant-design/icons-vue'
  import { BodyCellType, TableColumns, TableColumnItem } from './type'

  export default defineComponent({
    name: 'BasicTable',
    props: {
      columns: {
        type: Array as PropType<TableColumns<any>>,
        default: () => [],
      },
      data: {
        type: Array as PropType<Array<any>>,
        default: () => [],
      },
      showIndex: {
        type: Boolean,
        default: true,
      },
      indexProps: {
        type: Object as PropType<TableColumnItem>,
        default: () => ({}),
      },
      pagination: {
        type: Object as PropType<PaginationType>,
        default: () => ({
          current: 1,
          pageSize: 10,
          total: 0,
        }),
      },
    },
    setup(props, { attrs, slots }) {
      const data = ref<any[]>(props.data)
      const columns = computed(() => {
        const { columns, showIndex, pagination } = props
        const columnsList = [...columns]
        if (
          showIndex &&
          !columns.some((item) => item.dataIndex === 'my--index')
        ) {
          columnsList.unshift({
            title: '序号',
            dataIndex: 'my--index',
            width: 72,
            minWidth: 72,
            fixed: 'left',
            slot: ({ index }) =>
              pagination
                ? (pagination.current - 1) * pagination.pageSize + index + 1
                : index + 1,
            ...props.indexProps,
          })
        }
        return columnsList
      })

      watch(
        () => props.data,
        (d) => {
          data.value = [...d]
        },
      )

      return () => (
        <a-table
          class="basic-table"
          columns={columns.value}
          dataSource={props.data}
          pagination={
            props.pagination
              ? {
                  showQuickJumper: true,
                  showTotal: (total: number) => `共 ${total} 条内容`,
                  ...props.pagination,
                }
              : false
          }
          scroll={{
            x: true,
          }}
          {...attrs}
          v-slots={{
            bodyCell: (arg: BodyCellType) => {
              let { column, text } = arg
              /**
               * 优先渲染插槽
               */
              const element = column.slot ? column.slot(arg) : text

              if (column.ellipsis) {
                return (
                  <a-tooltip placement="topLeft" title={element}>
                    <span>{element}</span>
                  </a-tooltip>
                )
              }

              return element
            },
            headerCell: (arg: BodyCellType) => {
              const { column, text } = arg
              const element = text
              if (column.headerTip) {
                return (
                  <span>
                    {column.title}
                    <a-tooltip placement="topLeft" title={column.headerTip}>
                      <QuestionCircleOutlined style="font-size:14px;margin-left: 8px" />
                    </a-tooltip>
                  </span>
                )
              }

              return element
            },
            // 这里保持了table插槽之前使用的特性
            ...slots,
          }}
        ></a-table>
      )
    },
  })
</script>

<style lang="less"></style>
