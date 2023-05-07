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
      <a-space :size="6">
        <span class="no" :class="{ 'top-no': index < 3 }">
          <strong>{{ index + 1 }}</strong>
        </span>
        <span class="name">{{ item.name }}</span>
      </a-space>
    </li>
  </ul>
</template>

<style lang="less" scoped>
  .list-item {
    height: 32px;
    display: flex;
    align-items: center;
    span {
      font-size: 12px;
    }
    .no {
      display: block;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      &.top-no {
        background: #3398db;
        color: #fff;
        border-radius: 50%;
      }
    }
    .name {
      display: block;
      line-height: 20px;
    }
  }
</style>
