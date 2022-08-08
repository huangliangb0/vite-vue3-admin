<script lang="ts" setup>
  import { useModal } from '@/hook/modal'

  const { openModal, closeModal, Modal } = useModal()
</script>

<template>
  <div>
    <a-button @click="openModal">open modal</a-button>
    <a-button @click="closeModal">close modal</a-button>
    <!-- <Modal /> -->
  </div>
</template>

<style lang="less" scoped></style>
