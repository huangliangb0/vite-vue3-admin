import { TableColumns } from '@/components/basic-table'
import { getStudentList } from '@/server/student'
import { computed, onMounted, ref } from 'vue'

const handleSpanData = (
  data: Student.StudentsTreeType,
): Student.StudentsType => {
  const result: Student.StudentsType = []
  const oIndex: Record<number, number> = {}

  const r = (
    data: Student.StudentsTreeType,
    p: Student.StudentsTreeItemType = {},
    level = 0,
  ) => {
    if (oIndex[level] === undefined) {
      oIndex[level] = 0
    }

    data.forEach((item) => {
      const { children, ...reset } = item

      if (children) {
        const o = {
          ...p,
          ...reset,
        }
        r(children, o, level + 1)
      } else {
        const item = {
          ...p,
          ...reset,
        }
        result.push(item as Student.StudentsItemType)
      }
    })

    const index = oIndex[level]
    const total = result.length
    if (result[index]) {
      result[index]['rowSpan_' + level] = total - index
      oIndex[level] = total
    }
  }

  r(data)
  return result
}

export const useSpanRowTable = () => {
  const data = ref<Student.StudentsType>([])

  const columns = computed(() => {
    return [
      {
        title: '年级',
        dataIndex: 'grade',
        align: 'center',
        customCell: (record) => {
          return {
            rowSpan: record.rowSpan_1 || 0,
          }
        },
      },
      {
        title: '班级',
        dataIndex: 'class',
        align: 'center',
        customCell: (record) => {
          return {
            rowSpan: record.rowSpan_2 || 0,
          }
        },
      },
      {
        title: '学生',
        dataIndex: 'name',
        align: 'center',
      },
    ] as TableColumns<Student.StudentsItemType>
  })

  onMounted(() => {
    getStudentList().then((value) => {
      data.value = handleSpanData(value as Student.StudentsType)
    })
  })

  return {
    data,
    columns,
  }
}
