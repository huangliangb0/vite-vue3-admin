<script lang="ts" setup>
  import { useForm } from './hook'

  defineOptions({
    name: 'Menu',
  })
  const { openFormModal, FormModal } = useForm()
  const onSubmit = (arg: any) => {
    console.log(111, arg)
  }
</script>

<template>
  <page-layout>
    <template #header>
      <a-button @click="openFormModal">添加</a-button>
    </template>
    <FormModal @submit="onSubmit" />
  </page-layout>
</template>
<style lang="less" scoped></style>
