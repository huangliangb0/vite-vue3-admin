<script lang="ts" setup>
  import { createMenu, updateMenu } from '@/server/menu'
  import { useForm } from './hook'
  import MenuTable from './components/MenuTable.vue'
  import { message } from 'ant-design-vue'
  import useMenuStore from '@/store/modules/menu'
  import { omit } from 'lodash-es'
  import { ref } from 'vue'

  defineOptions({
    name: 'Menu',
  })
  const currentId = ref('')
  const name = ref('') // 路由名称
  const menuStore = useMenuStore()
  const { openFormModal, openEditFormModal, closeFormModal, FormModal } =
    useForm({ name: name })
  const onSubmit = (arg: Menu.MenuItem) => {
    const key = 'created'
    message.loading({ content: '菜单创建中...', key })
    createMenu(arg).then(() => {
      message.success({
        content: '创建成功',
        key,
        duration: 2,
        onClose: () => {
          closeFormModal()
          menuStore.getMenuList()
        },
      })
    })
  }

  const onEditSubmit = (arg: Omit<Menu.MenuItem, 'id'>) => {
    const key = 'updatable'
    message.loading({ content: '菜单修改中...', key })
    updateMenu(currentId.value, arg).then(() => {
      message.success({
        content: '修改成功',
        key,
        duration: 2,
        onClose: () => {
          closeFormModal()
          menuStore.getMenuList()
        },
      })
    })
  }

  const onEdit = (record: Menu.MenuItem) => {
    const { id, ...reset } = record
    currentId.value = id
    name.value = record.name
    openEditFormModal(reset)
  }
</script>

<template>
  <page-layout>
    <template #header>
      <a-button @click="openFormModal">添加</a-button>
    </template>
    <FormModal @create-submit="onSubmit" @edit-submit="onEditSubmit" />
    <MenuTable @edit="onEdit" />
  </page-layout>
</template>
<style lang="less" scoped></style>
