<script lang="tsx" setup>
  import { computed, PropType } from 'vue'
  import {
    ExclamationCircleOutlined,
    CheckCircleOutlined,
  } from '@ant-design/icons-vue'

  defineOptions({
    name: 'ExceptionTag',
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
      label: '正常',
      value: 1,
    },
    {
      label: '异常',
      value: 2,
    },
  ]
  const params = {
    1: 'success',
    2: 'error',
  }
  const cls = computed(() => {
    const v = []
    if (props.border) {
      v.push('border')
    }
    v.push(params[props.type])
    return v
  })
  const text = computed(() => {
    const o = options.find((item) => item.value === props.type)
    return o?.label
  })
  const iconComponentName = computed(() => {
    const n = {
      1: CheckCircleOutlined,
      2: ExclamationCircleOutlined,
    }

    return n[props.type]
  })
</script>

<template>
  <span class="teg-box" :class="cls">
    <a-space>
      <component :is="iconComponentName" />
      <span>{{ text }}</span>
    </a-space>
  </span>
</template>

<style lang="less" scoped>
  .teg-box {
    line-height: 22px;
    &.border {
      border: 1px solid @border-color-base;
      border-radius: 2px;
    }
    &.success {
      color: @success-color;
      &.border {
        border-color: lighten(@success-color, 0.5);
      }
    }
    &.error {
      color: @error-color;
      &.border {
        border-color: lighten(@error-color, 0.5);
      }
    }
  }
</style>
