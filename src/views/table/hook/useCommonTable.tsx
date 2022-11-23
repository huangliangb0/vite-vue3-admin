import { TableColumns } from '@/components/basic-table'
import { ExceptionTag, SexTag } from '@/components/tags'
import { useTable } from '@/hook'
import { onMounted, reactive, ref } from 'vue'

const useCommonTable = () => {
  const columns: TableColumns = [
    {
      title: '年级',
      dataIndex: 'grade',
      options: [
        {
          label: '一年级',
          value: 1,
        },
        {
          label: '二年级',
          value: 2,
        },
        {
          label: '三年级',
          value: 3,
        },
      ],
    },
    {
      title: '班级',
      dataIndex: 'class',
      options: [
        {
          label: '一班',
          value: 1,
        },
        {
          label: '二班',
          value: 2,
        },
        {
          label: '三班',
          value: 3,
        },
        {
          label: '四班',
          value: 4,
        },
      ],
    },
    {
      title: '姓名',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      slot: ({ value }) => <SexTag type={value}></SexTag>,
    },
    {
      title: '状态',
      dataIndex: 'exception',
      slot: ({ value }) => <ExceptionTag type={value}></ExceptionTag>,
    },
  ]
  const data = ref<any[]>([])
  const pagination = reactive<PaginationType>({
    pageSize: 10,
    current: 1,
    total: 100,
  })

  onMounted(() => {
    setTimeout(() => {
      data.value = [
        {
          grade: 1,
          class: 1,
          name: '小花',
          sex: 2,
          exception: 1,
        },
        {
          grade: 2,
          class: 1,
          name: '小丽',
          sex: 2,
          exception: 1,
        },
        {
          grade: 3,
          class: 4,
          name: '小明',
          sex: 1,
          exception: 2,
        },
      ]
      done()
    }, 3000)
  })

  const { Table, done } = useTable({ columns, data, pagination })

  return Table
}

export default useCommonTable
