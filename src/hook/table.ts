import BasicTable from '@/components/basic-table/index.vue'
import { type TableColumns } from '@/components/basic-table/type'
import { type TableProps } from 'ant-design-vue'
import { h, isRef, type Ref, ref } from 'vue'

type Props = Partial<
  Omit<InstanceType<typeof BasicTable>, 'data' | 'columns'> &
    Omit<TableProps, 'columns'>
> & {
  data: Ref<any[]> | any[]
  columns: Ref<TableColumns> | TableColumns
}

const useTable = (props: Props) => {
  const { data, columns, loading: _loading = true, ...reset } = props

  const loading = ref(_loading)

  // 数据加载完成
  const done = (cb?: (arg?: any) => void) => {
    loading.value = false
    cb && cb()
  }

  /***** render 或者 component **********/
  const Table = (
    _props: Partial<Props>,
    {
      attrs,
    }: {
      attrs?: Partial<Props>
    },
  ) => {
    // @ts-ignore
    return h(BasicTable, {
      data: isRef(data) ? data.value : data,
      columns: isRef(columns) ? columns.value : columns,
      loading: loading.value,
      ...reset,
      ...attrs,
    })
  }
  // Table.props = ['columns', 'data']

  return {
    Table,
    done,
  }
}

export default useTable
