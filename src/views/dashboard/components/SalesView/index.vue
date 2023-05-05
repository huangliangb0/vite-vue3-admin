<script lang="ts" setup>
  defineOptions({
    name: 'SalesView',
  })

  const menuSelected = ref('mail')
</script>

<template>
  <a-card :body-style="{ padding: 0 }">
    <page-layout>
      <page-header>
        <a-menu v-model:selectedKeys="menuSelected" mode="horizontal">
          <a-menu-item key="mail"> Navigation One </a-menu-item>
          <a-menu-item key="app"> Navigation Two </a-menu-item>
        </a-menu>
      </page-header>
      <!-- <page-content></page-content> -->
    </page-layout>
  </a-card>
</template>
<style lang="less" scoped></style>
