<template>
    <div>
        <div>header</div>
        <router-view></router-view>
        <div>footer</div>
    </div>
</template>
<script  lang="ts" setup>
    defineOptions({
        name: 'BasicLayout',
    });

</script>
<style lang="less">
    
</style>