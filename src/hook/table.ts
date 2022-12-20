import BasicTable from '@/components/basic-table/index.vue'
import { type TableColumns } from '@/components/basic-table/type'
import { type TableProps } from 'ant-design-vue'
import { h, isRef, type Ref, ref } from 'vue'

type Props = Partial<
  Omit<InstanceType<typeof BasicTable>, 'data' | 'columns' | 'loading'> &
    Omit<TableProps, 'columns'>
> & {
  data: Ref<any[]> | any[]
  columns: Ref<TableColumns> | TableColumns
  loading?: Ref<boolean> | boolean
}

const useTable = (props: Props) => {
  const { data, columns, loading, ...reset } = toRefs(props)

  /***** render 或者 component **********/
  const Table = (
    _props: Props,
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
      loading: isRef(loading) ? loading.value : loading,
      ...reset,
      ...attrs,
    })
  }
  // Table.props = ['columns', 'data']

  return Table
}

export default useTable
