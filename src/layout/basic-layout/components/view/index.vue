<!--
 * @Description: 页面视图 router-view
 * @Date: 2022-07-19 14:17:29
 * @LastEditTime: 2022-07-20 09:37:20
 * @FilePath: \vite-vue3-admin\src\layout\basic-layout\components\view\index.vue
-->
<template>
  <router-view v-slot="{ Component }">
    <transition mode="out-in" name="fade-slide">
      <keep-alive>
        <component :is="Component" v-if="isRouterAlive" :key="activePath" />
      </keep-alive>
    </transition>
  </router-view>
</template>
<script lang="ts" setup>
  import { computed, watch } from 'vue'
  import { useRoute } from 'vue-router'

  defineProps({
    isRouterAlive: Boolean,
  })

  const route = useRoute()
  const activePath = computed(() => route.fullPath)
</script>
