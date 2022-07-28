import { TableColumns } from '@/components/basic-table'
import {
  StudentsType,
  StudentsTreeType,
  studentsTreeData,
  StudentsItemType,
} from '@/models/studentsModel'
import { computed, onMounted, ref } from 'vue'

const handleData = (data: StudentsTreeType): StudentsType => {
  const values: StudentsType = []
  let fIndex = 0
  let sIndex = 0
  data.forEach((f: Recordable) => {
    let total = 0
    f.children.forEach((s: Recordable) => {
      const length = s.children.length

      total += length
      s.children.forEach((t: Recordable) => {
        values.push({
          grade: f.grade,
          gradeId: f.gradeId,
          class: s.class,
          classId: s.classId,
          ...t,
        } as StudentsItemType)
      })
      values[sIndex].class_rowSpan = length
      sIndex = sIndex + length
    })
    values[fIndex].grade_rowSpan = total
    fIndex = fIndex + total
  })

  return values
}

export const useSpanRowTable = () => {
  const data = ref<StudentsType>([])

  const columns = computed(() => {
    return [
      {
        title: '年级',
        dataIndex: 'grade',
        align: 'center',
        customCell: (record) => {
          return {
            rowSpan: record.grade_rowSpan || 0,
          }
        },
      },
      {
        title: '班级',
        dataIndex: 'class',
        align: 'center',
        customCell: (record) => {
          return {
            rowSpan: record.class_rowSpan || 0,
          }
        },
      },
      {
        title: '学生',
        dataIndex: 'name',
        align: 'center',
      },
    ] as TableColumns<StudentsItemType>
  })

  onMounted(() => {
    data.value = handleData(studentsTreeData)
  })

  return {
    data,
    columns,
  }
}
