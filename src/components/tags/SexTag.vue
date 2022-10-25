<script lang="tsx" setup>
  import { computed, PropType } from 'vue'

  defineOptions({
    name: 'SexTag',
  })

  const props = defineProps({
    border: Boolean,
    type: {
      type: Number as PropType<1 | 2>,
      default: 1,
    },
  })
  // 这些数据字典，应该存放在pinia
  const options = [
    {
      label: '男',
      value: 1,
    },
    {
      label: '女',
      value: 2,
    },
  ]
  const text = computed(() => {
    const o = options.find((item) => item.value === props.type)
    return o?.label
  })
</script>

<template>
  <span class="teg-box">
    {{ text }}
  </span>
</template>

<style lang="less" scoped>
  .teg-box {
    line-height: 22px;
  }
</style>
