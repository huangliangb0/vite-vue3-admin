export interface StudentsTreeItemType extends Recordable {
  children?: StudentsTreeItemType[]
}

export type StudentsTreeType = Array<StudentsTreeItemType>

export interface StudentsItemType extends Recordable {
  grade: string
  gradeId: number
  class: string
  classId: number
  name: string
  id: number
}

export type StudentsType = Array<StudentsItemType>

export const studentsTreeData: StudentsTreeType = [
  {
    grade: '一年级',
    gradeId: 1,
    children: [
      {
        class: '一班',
        classId: 1,
        children: [
          {
            name: '小花',
            id: 1,
          },
          {
            name: '小明',
            id: 2,
          },
        ],
      },
      {
        class: '二班',
        classId: 2,
        children: [
          {
            name: '小丽',
            id: 3,
          },
          {
            name: '小张',
            id: 4,
          },
        ],
      },
    ],
  },
  {
    grade: '二年级',
    gradeId: 2,
    children: [
      {
        class: '一班',
        classId: 3,
        children: [
          {
            name: '小赞',
            id: 5,
          },
          {
            name: '哔哩',
            id: 6,
          },
          {
            name: '八百',
            id: 7,
          },
        ],
      },
      {
        class: '二班',
        classId: 4,
        children: [
          {
            name: '麋鹿',
            id: 8,
          },
          {
            name: '青蛙',
            id: 9,
          },
        ],
      },
      {
        class: '三班',
        classId: 5,
        children: [
          {
            name: '热熔',
            id: 10,
          },
          {
            name: '突然',
            id: 11,
          },
        ],
      },
    ],
  },
  {
    grade: '三年级',
    gradeId: 3,
    children: [
      {
        class: '一班',
        classId: 6,
        children: [
          {
            name: '大得',
            id: 12,
          },
          {
            name: '倘若',
            id: 13,
          },
          {
            name: '广泛',
            id: 14,
          },
        ],
      },
      {
        class: '二班',
        classId: 7,
        children: [
          {
            name: '框架',
            id: 15,
          },
          {
            name: '拉跨',
            id: 16,
          },
        ],
      },
    ],
  },
]
