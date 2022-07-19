<!--
 * @Description: 
 * @Date: 2022-07-19 14:17:29
 * @LastEditTime: 2022-07-19 18:29:55
 * @FilePath: \vite-vue3-admin\src\layout\basic-layout\components\menu\index.vue
-->
<script lang="tsx">
  import { renderMenuContent } from './render'
  // import { useStore } from 'vuex'
  import { watch,  ref, defineComponent, PropType, computed, onMounted, useAttrs } from 'vue'
  import { RouteLocationMatched, RouteLocationNormalizedLoaded, RouteRecordRaw, useRoute, useRouter } from 'vue-router'

  export default defineComponent({
    name: 'SlideBar',
    props: {
      routes: {
        type: Array as PropType<RouteRecordRaw[]>,
        required: true,
      },
  
    },
    setup(props) {
      const attrs = useAttrs()
      // const route = useRoute()
      const router = useRouter()
      const selectedKeys =  ref<string[]>([])
      const openKeys =  ref<string[]>([])

      /* const getOpenKeys = (routes: RouteRecordRaw[], path: string) : string[] => {
        const arr: string[] = []
        const activeItem = routes.find(item => path.startsWith(item.path === '/' ? item.path : item.path  + '/'))
        if (activeItem?.children) {
          arr.push(activeItem.path)
          getOpenKeys(activeItem.children, path)
        }
        return arr
      } */

      onMounted(() => {
        const paths = router.currentRoute.value.matched.map(item => item.path)
        selectedKeys.value = [...paths]
        // openKeys.value = getOpenKeys(props.routes, route.path)

        openKeys.value = [...paths]
      })

      return () => 
        <a-menu
          class="app-menu"
          style={{ border: 'none' }}
          v-model:openKeys={openKeys.value}
          v-model:selectedKeys={selectedKeys.value}
          { ...attrs }
        >
          {renderMenuContent(props.routes)}
        </a-menu>
    },
  })
</script>

<style lang="less" scoped>
.app-menu{
  width: 100%;
  box-sizing: border-box;
  z-index: 11;
  overflow-x: hidden;
  position: relative;
}

</style>
