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
        <div class="app-slide-bar-wrap">
            <router-link to="/" class="app-title">
              <h3 class="title">
                后台管理系统
              </h3>
            </router-link>
            <a-menu
                class="slide-bar"
                style={{ border: 'none' }}
                v-model:openKeys={openKeys.value}
                v-model:selectedKeys={selectedKeys.value}
                { ...attrs }
              >
                {renderMenuContent(props.routes)}
              </a-menu>
          </div>
    },
  })
</script>

<style lang="less" scoped>
.app-slide-bar-wrap{
  @appHeaderHeight: var(--app-header-height);
  position: relative;
  background-color: #fff;
  height: 100vh;
  width: 100%;
  position: relative;
  box-sizing: border-box;
  z-index: 11;
  overflow-x: hidden;
  transition: width 0.3s;
  position: relative;
  .slide-bar {
    min-height: 100%;
    padding-top: @appHeaderHeight;
  }
 
  .app-title {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: @appHeaderHeight;
    display: block;
    .title {
      font-size: 16px;
      line-height: @appHeaderHeight;
      margin: 0;
      text-align: center;
      color: #fff;
      box-shadow: 0 0 1px #999;
    }
  }
}

</style>
