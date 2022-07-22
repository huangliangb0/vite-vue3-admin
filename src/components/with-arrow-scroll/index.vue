<!--
 * @Description: 
 * @Date: 2022-07-21 08:55:41
 * @LastEditTime: 2022-07-22 17:25:38
 * @FilePath: \vite-vue3-admin\src\components\with-arrow-scroll\index.vue
-->
<script lang="ts" setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
  import elementResizeDetectorMaker from 'element-resize-detector'
  import { debounce } from 'lodash'
  const wrapperRef = ref<HTMLDivElement>()
  const contentRef = ref<HTMLDivElement>()
  const isVisibleArrow = ref(false)
  const width = ref(0)

  // 创建实例
  var erd = elementResizeDetectorMaker({
    strategy: 'scroll',
  })

  const getStyle = () => {
    // getBoundingClientRect window.getComputedStyle(元素).getPropertyValue("width");
    // console.log(1111, contentRef.value!.getBoundingClientRect())
    const { x: p_x, width: p_width } = wrapperRef.value!.getBoundingClientRect()

    const { x, width } = contentRef.value!.getBoundingClientRect()
    return {
      x,
      width,
      p_x,
      p_width,
      w_dif: width - p_width,
    }
  }

  // 向右滑动
  const moveRight = (dis?: number) => {
    const { width, p_width, p_x, x } = getStyle()
    // 子盒子和父盒子宽度的差, 也是滑动最大的距离
    const w_dif = width - p_width
    // 已滑动距离
    const start = p_x - x
    // 当前需要滑动距离
    let moveDis = start + (dis ?? p_width)

    // 不能大于最大滑动距离
    if (moveDis > w_dif) {
      moveDis = w_dif
    }
    contentRef.value!.style.transform = `translateX(${-moveDis}px)`
  }

  // 向左滑动
  const moveLeft = () => {
    const { p_width, p_x, x } = getStyle()
    const start = p_x - x
    let moveDis = start - p_width
    if (moveDis < 0) {
      moveDis = 0
    }
    contentRef.value!.style.transform = `translateX(${-moveDis}px)`
  }

  const onResize = debounce(() => {
    isVisibleArrow.value = getStyle().w_dif > 0
    if (!isVisibleArrow.value) {
      contentRef.value!.style.transform = `translateX(0px)`
    } else {
      moveRight()
    }
  }, 100)

  onMounted(() => {
    erd.listenTo(contentRef.value!, function (element) {
      isVisibleArrow.value = getStyle().w_dif > 0
      const w = element.clientWidth
      if (width.value === 0) {
        width.value = w
      } else {
        const dis = w - width.value + 40
        width.value = w
        if (isVisibleArrow.value) {
          moveRight(dis)
        } else {
          contentRef.value!.style.transform = `translateX(0px)`
        }
      }
    })
    window.addEventListener('resize', onResize, false)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', onResize, false)
  })
</script>

<template>
  <div class="with-arrow-scroll">
    <span
      v-if="isVisibleArrow"
      class="left-arrow arrow"
      @click="moveLeft(undefined)"
    >
      <LeftOutlined class="icon" />
    </span>
    <div ref="wrapperRef" class="scroll-wrapper">
      <div ref="contentRef" class="scroll-content">
        <slot></slot>
      </div>
    </div>
    <span
      v-if="isVisibleArrow"
      class="right-arrow arrow"
      @click="moveRight(undefined)"
    >
      <RightOutlined class="icon" />
    </span>
  </div>
</template>

<style lang="less" scoped>
  .with-arrow-scroll {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    .arrow {
      height: 100%;
      width: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: #fff;
      z-index: 11;

      .icon {
        font-size: 12px;
      }
      &.left-arrow {
        left: 0;
      }
      &.right-arrow {
        right: 0;
      }
    }
    .scroll-wrapper {
      flex: 1;
      width: 100%;
      overflow: hidden;
      position: relative;
    }
    .scroll-content {
      position: relative;
      display: table;
      white-space: nowrap;
      transition: transform 0.3s;
      transform: translateX(0px);
      overflow: visible;
    }
  }
</style>
