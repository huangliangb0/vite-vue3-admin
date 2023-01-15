<script lang="ts" setup>
  import { message } from 'ant-design-vue'
  import useArticleFormModal from './hooks/useArticleFormModal'
  import useArticleTable from './hooks/useArticleTable'

  defineOptions({
    name: 'Article',
  })

  const {
    startLoading,
    stopLoading,
    openFormModal,
    openEditFormModal,
    closeFormModal,
    FormModal,
  } = useArticleFormModal()

  const { pagination, onCreate, onUpdate, ArticleTable, onPageChange } =
    useArticleTable({
      openEditFormModal,
    })

  // 创建逻辑
  const handleCreate = async (formState: Article.ArticleItem) => {
    startLoading()
    try {
      await onCreate(formState)
      stopLoading()
      closeFormModal()
      message.success('创建成功')
    } catch (error) {
      console.log(error)
    }
  }
  // 创建逻辑
  const handleUpdate = async (formState: Article.ArticleItem) => {
    startLoading()
    try {
      await onUpdate(formState.id, formState)
      stopLoading()
      closeFormModal()
      message.success('更新成功')
    } catch (error) {
      console.log(error)
    }
  }
</script>

<template>
  <page-layout>
    <page-header>
      <a-button type="primary" @click="openFormModal">添加文章</a-button>
    </page-header>
    <page-content>
      <ArticleTable :pagination="pagination" @change="onPageChange" />
      <FormModal @create-submit="handleCreate" @edit-submit="handleUpdate" />
    </page-content>
  </page-layout>
</template>

<style lang="less" scoped></style>
