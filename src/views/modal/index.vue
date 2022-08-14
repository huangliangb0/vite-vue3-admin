<script lang="ts" setup>
  import { useModal } from '@/hook'

  const { openModal, closeModal, visible, Modal } = useModal()
</script>

<template>
  <page-layout>
    <template #header>
      <h3>模态框/对话框</h3>
      <p>
        以hook的方式编写模态框,本文对以下两个例子的编写，怎么演示复杂的功能进行简单化
      </p>
      <p><RouterLink to="/form/edit-form-modal">编辑表单模态框</RouterLink></p>
      <p>
        <RouterLink to="/form/filter-search-modal"> 搜索表单模态框 </RouterLink>
      </p>
      <p><em>为何不根据自己的业务进行扩展呢</em></p>
    </template>

    <a-space>
      <a-button @click="openModal">打开 modal</a-button>
      <a-button @click="closeModal">关闭 modal</a-button>
      <Modal :visible="visible" title="提示" @cancel="closeModal">
        这是模态框内容
      </Modal>

      <a-button
        @click="() => Modal.confirm({ title: 'confirm', content: '内容' })"
      >
        confirm
      </a-button>
      <a-button
        @click="() => Modal.confirm({ title: 'success', content: '内容' })"
      >
        success
      </a-button>
      <a-button @click="() => Modal.info({ title: 'info', content: '内容' })">
        info
      </a-button>
      <a-button @click="() => Modal.error({ title: 'error', content: '内容' })">
        error
      </a-button>
      <a-button
        @click="() => Modal.confirm({ title: 'warning', content: '内容' })"
      >
        warning
      </a-button>
    </a-space>
  </page-layout>
</template>

<style lang="less" scoped></style>
