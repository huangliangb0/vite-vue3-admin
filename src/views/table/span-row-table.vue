<template>
  <page-layout>
    <template #header>
      <h3> span-row-table 页面 </h3>
    </template>
    <basic-table bordered :columns="columns" :data="data" />
  </page-layout>
</template>
<script lang="ts" setup>
  import { cloneDeep } from 'lodash'
  import { useSpanRowTable } from './hook/useSpanRowTable'
  const { data, columns } = useSpanRowTable()

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
</script>
<style lang="less"></style>
