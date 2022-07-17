<template>
  <router-view v-slot="{ Component }">
    <transition mode="out-in" name="fade-slide">
      <keep-alive>
        <component :is="Component" :key="activePath" />
      </keep-alive>
    </transition>
  </router-view>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'AppRouterView',
  setup() {
    const route = useRoute()
    const activePath = computed(() => route.path)

    return {
      activePath,
    }
  }
})
</script>
