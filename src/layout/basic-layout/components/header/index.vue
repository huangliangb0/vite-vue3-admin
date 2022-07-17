
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
        <div class="app-sider-collapsed" @click="collapseClick">
            <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            
            />
            <menu-fold-outlined v-else class="trigger" />
        </div>
    </a-layout-header>
</template>
<style lang="less" scoped>
.app-header {
    // padding: 0 var(--app-margin);
    padding: 0;
    background: #fff;
    color: @text-color;
    font-size: @font-size-base;
    box-shadow: @box-shadow-base;
}
.app-sider-collapsed {
    padding: 0 12px;
    cursor: pointer;
}
</style>