<script lang="tsx">
  import { renderMenuContent } from './render'
  // import { useStore } from 'vuex'
  import { watch,  ref, defineComponent, PropType, computed, onMounted, useAttrs } from 'vue'
  import { RouteRecordRaw, useRoute } from 'vue-router'

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
      const route = useRoute()
      const selectedKeys =  ref(['/form/edit-form'])
      const openKeys =  ref(['/form'])

      const getOpenKeys = (routes: RouteRecordRaw[], path: string) : string[] => {
        const arr: string[] = []
        const activeItem = routes.find(item => path.startsWith(item.path === '/' ? item.path : item.path  + '/'))
        if (activeItem?.children) {
          arr.push(activeItem.path)
          getOpenKeys(activeItem.children, path)
        }
        
        return arr
      }

      onMounted(() => {
        selectedKeys.value = [route.path]
        openKeys.value = getOpenKeys(props.routes, route.path)
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
