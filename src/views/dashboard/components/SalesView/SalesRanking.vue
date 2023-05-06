<script lang="ts" setup>
  const data = [
    {
      no: 1,
      name: '商品一号',
    },
    {
      no: 2,
      name: '商品二号',
    },
    {
      no: 3,
      name: '商品三号',
    },
    {
      no: 4,
      name: '商品四号',
    },
    {
      no: 5,
      name: '商品五号',
    },
    {
      no: 6,
      name: '商品六号',
    },
    {
      no: 7,
      name: '商品七号',
    },
  ]
</script>

<template>
  <ul class="list-wrap">
    <li class="list-item" v-for="(item, index) in data" :key="item.no">
      <span class="no" :class="{ 'top-np': index < 3 }">{{ index + 1 }}</span>
      <span class="name">{{ item.name }}</span>
    </li>
  </ul>
</template>

<style lang="less" scoped>
  .list-item {
    line-height: 36px;
    list-style: none;
  }
</style>
