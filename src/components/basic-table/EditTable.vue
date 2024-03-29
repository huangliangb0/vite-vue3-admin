<script lang="tsx">
  import { computed, defineComponent, PropType, ref, watch } from 'vue'
  import { TableColumns } from './type'
  import { Widget } from '../form/widgets'
  import _ from 'lodash-es'

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
    },
    emits: ['finish'],
    setup(props, { attrs, emit, slots }) {
      const isEdit = ref(false)
      const data = ref<any[]>(_.cloneDeep(props.data))
      // const _data = computed(() => (isEdit.value ? data.value : props.data))

      const columns = computed(() => {
        if (isEdit.value) {
          const columns = _.cloneDeep(props.columns)
          return columns
            .filter((col) => !col.hideInEdit)
            .map((col) => {
              const { options, isEdit, dataIndex, widgetProps = {} } = col
              const { component = 'Input', ...reset } = widgetProps

              if (isEdit) {
                col.slot = ({ record }) => (
                  <Widget
                    component={component}
                    value={record[dataIndex as string]}
                    change={(value: string | number) => {
                      record[dataIndex as string] = value
                    }}
                    options={options}
                    {...reset}
                  ></Widget>
                )
                col.ellipsis = false
              }
              return col
            })
            .concat({
              dataIndex: 'my--action',
              title: '编辑',
              width: 76,
              fixed: 'right',
              slot: ({ record }) => (
                <a-space>
                  <a-button
                    size="small"
                    type="primary"
                    onClick={() => onFinish(record)}
                  >
                    完成
                  </a-button>
                </a-space>
              ),
            })
        }

        return props.columns
      })

      const onEdit = (v: boolean) => {
        isEdit.value = v
      }
      const onFinish = (record: any) => {
        isEdit.value = false
        emit('finish', record || data.value)
      }
      const onCancel = () => {
        isEdit.value = false
        data.value = _.cloneDeep(props.data)
      }

      watch(
        () => props.data,
        (d) => {
          data.value = _.cloneDeep(d)
        },
      )
      return () => (
        <div class="edit-table">
          <page-layout
            v-slots={{
              header: () => (
                <div class="edit-table-header">
                  {slots.header ? (
                    <div class={'edit-table-header-left'}>{slots.header()}</div>
                  ) : null}
                  <div class="edit-table-action">
                    <a-space>
                      {!isEdit.value ? (
                        <a-button
                          size="small"
                          type="primary"
                          onClick={() => onEdit(true)}
                        >
                          编辑
                        </a-button>
                      ) : (
                        <>
                          <a-button
                            size="small"
                            type="primary"
                            onClick={onFinish}
                          >
                            完成
                          </a-button>
                          <a-button size="small" onClick={() => onCancel()}>
                            取消
                          </a-button>
                        </>
                      )}
                    </a-space>
                  </div>
                </div>
              ),
            }}
          >
            <basic-table
              class="basic-table"
              columns={columns.value}
              data={data.value}
              {...attrs}
            />
          </page-layout>
        </div>
      )
    },
  })
</script>

<style lang="less">
  .edit-table-header {
    display: flex;
    justify-content: space-between;
  }
</style>
