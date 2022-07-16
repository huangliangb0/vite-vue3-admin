
<script  lang="ts" setup>
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
const props = defineProps({
    collapsed: Boolean
})
const emit = defineEmits<{
    (e:'update:collapsed', value: boolean) : void
}>()
const collapseClick = () => {
    emit('update:collapsed', !props.collapsed)
}
</script>
<template>
    <a-layout-header class="app-header" >
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="collapseClick"
        />
        <menu-fold-outlined v-else class="trigger" @click="collapseClick" />
    </a-layout-header>
</template>
<style lang="less" scoped>
.app-header {
    padding: 0 @margin;
    background: #fff;
    color: @text-color;
    font-size: @font-size-base;
    box-shadow: @box-shadow-base;
}
</style>