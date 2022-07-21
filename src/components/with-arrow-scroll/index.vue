<!--
 * @Description: 
 * @Date: 2022-07-21 08:55:41
 * @LastEditTime: 2022-07-21 10:59:13
 * @FilePath: \vite-vue3-admin\src\components\with-arrow-scroll\index.vue
-->
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
import elementResizeDetectorMaker  from 'element-resize-detector'
const wrapperRef = ref<HTMLDivElement>()
const contentRef = ref<HTMLDivElement>()
const isVisibleArrow = ref(false)

/**
 * !todo 存在以下bug
 * 一下子移动到右边，标签栏太长，可能看不到中间，
 */


  // 创建实例
  var erd = elementResizeDetectorMaker({
    strategy: "scroll",
  });


const getStyle = () => {
    // getBoundingClientRect window.getComputedStyle(元素).getPropertyValue("width");
    // console.log(1111, contentRef.value!.getBoundingClientRect())
    const {
        x: p_x,
        width: p_width
    } = wrapperRef.value!.getBoundingClientRect()

    const {
        x,
        width
    } = contentRef.value!.getBoundingClientRect()
    // const dif = width -( p_width + x + 20 - p_x)

    // const moveDis = dif > p_width ? p_width : dif

    const dif = width - p_width
    
    const moveDis = dif > p_width ? p_width : dif


    return {
        p_x,
        p_width,
        dif,
        moveDis: -moveDis
    }
}

const rightClick = () => {
    const { moveDis } = getStyle()
    contentRef.value!.style.transform = `translateX(${moveDis}px)`
}
const leftClick = () => {
    contentRef.value!.style.transform = `translateX(0)`
}

const setVisibleArrow = () => {
    isVisibleArrow.value = getStyle().dif > 0
    if(!isVisibleArrow.value) {
        leftClick()
    }
}

onMounted(() => {
    erd.listenTo(contentRef.value!, function(_element) {
        // var width = element.offsetWidth;
        // var height = element.offsetHeight;
        setVisibleArrow()
    });
    window.addEventListener('resize', setVisibleArrow, false)
})

onUnmounted(() => {
    window.removeEventListener('resize', setVisibleArrow, false)
})

</script>

<template>
<div class="with-arrow-scroll">
    <span v-if="isVisibleArrow" class="left-arrow arrow" @click="leftClick">
        <LeftOutlined class="icon"/>
    </span>
    <div class="scroll-wrapper" ref="wrapperRef">
        <div class="scroll-content" ref="contentRef">
            <slot></slot>
        </div>
    </div>
    <span v-if="isVisibleArrow" class="right-arrow arrow" @click="rightClick">
        <RightOutlined class="icon"/>
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
        overflow:visible
    }
}
</style>