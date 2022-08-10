<script lang="ts" setup>
  import { useModal } from '@/hook/modal'

  const { openModal, closeModal, visible, Modal } = useModal()
</script>

<template>
  <div>
    <a-button @click="openModal">open modal</a-button>
    <a-button @click="closeModal">close modal</a-button>
    <Modal :visible="visible" title="提示" @cancel="closeModal">
      这是模态框内容
    </Modal>
  </div>
</template>

<style lang="less" scoped></style>
