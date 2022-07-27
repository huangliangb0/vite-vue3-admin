<template>
  <h3> span-row-table 页面 </h3>
</template>
<script lang="ts" setup>
  import { cloneDeep } from 'lodash'

  const data = [
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

  const handleSpanData = (data: any[]): any[] => {
    const result: any[] = []
    let counts: Recordable = {}
    let level = 0

    const r = (data: any[], p: Recordable = {}) => {
      let total = 0
      data.forEach((item, i) => {
        const { children, ...reset } = item
        p = {
          ...p,
          ...reset,
        }

        if (children && children.length > 0) {
          if (counts[level] === undefined) {
            counts[level] = 0
          }
          level++
          r(children, p)

          level--
          console.log(level, cloneDeep(result))
        } else {
          total++
          result.push(p)
        }
      })
      const index = counts[level] || 0
      result[index][`row_span_${level}`] = result[index][`row_span_${level}`]
        ? result[index][`row_span_${level}`] + total
        : total
      counts[level] = index + total

      // if (result[index]) {
      //   const pre = level - 1
      //   if (result[index][`rowSpan_${pre}`] === undefined) {
      //     result[index][`rowSpan_${pre}`] = 0
      //   }
      //   result[index][`rowSpan_${pre}`] += total
      //   index = index + result[index][`rowSpan_${pre}`]
      // }

      // console.log('counts', counts)
      // console.log('resultresult', result.length)
    }

    r(data)
    return result
  }

  console.log(handleSpanData(data))
</script>
<style lang="less"></style>
