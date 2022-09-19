declare namespace Student {
  interface StudentsTreeItemType extends Recordable {
    children?: StudentsTreeItemType[]
  }

  type StudentsTreeType = Array<StudentsTreeItemType>

  interface StudentsItemType extends Recordable {
    grade: string
    gradeId: number
    class: string
    classId: number
    name: string
    id: number
  }

  type StudentsType = Array<StudentsItemType>
}
