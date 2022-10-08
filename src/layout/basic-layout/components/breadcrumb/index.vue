<script lang="ts" setup>
  import { computed, watch } from 'vue'
  import { useRoute } from 'vue-router'
  const route = useRoute()
  console.log('routeroute', route)
  watch(
    () => route.path,
    () => {
      console.log(console.log('routeroute', route))
    },
  )
  const matched = computed(() => route.matched)
</script>

<template>
  <a-breadcrumb>
    <template v-for="r in matched" :key="r.path">
      <a-breadcrumb-item v-if="route.path === r.path">
        {{ r.meta.title }}
      </a-breadcrumb-item>
      <a-breadcrumb-item
        v-else-if="
          r.children.length > 1 ||
          (r.children.length === 1 && r.meta.alwayShowChildInMenu)
        "
      >
        <router-link :to="r.path">{{ r.meta.title }}</router-link>
      </a-breadcrumb-item>
    </template>
  </a-breadcrumb>
</template>

<style lang="less" scoped></style>
