<script lang="ts" setup>
  import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons-vue'
  defineOptions({
    name: 'Compare',
  })

  const props = defineProps({
    name: String,
    value: {
      type: Number,
      default: 0,
    },
    size: {
      type: [Number, String],
      default: 14,
    },
  })

  const isGrowth = computed(() => props.value >= 0)
  const style = computed(() => {
    if (typeof props.size === 'number') {
      return {
        fontSize: `${props.size}px`,
      }
    }
    return {
      fontSize: `${props.size}`,
    }
  })
</script>

<template>
  <div class="compare-wrap" :style="style">
    <a-space>
      <span class="compare-name">{{ name }}</span>
      <span class="compare-value" v-if="isGrowth">
        {{ value }}%
        <CaretUpOutlined class="up-icon icon" />
      </span>
      <span class="compare-value" v-else>
        {{ -value }}%
        <CaretDownOutlined class="down-icon icon" />
      </span>
    </a-space>
  </div>
</template>
<style lang="less" scoped>
  .compare-wrap {
    .compare-name {
      color: #999;
    }
    .compare-value {
      color: #000;
    }
    .icon {
      font-size: 10px;
    }
    .up-icon {
      color: red;
    }
    .down-icon {
      color: green;
    }
  }
</style>
