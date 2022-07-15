<script lang="tsx">
  import { renderMenuContent } from './render'
  // import { useStore } from 'vuex'
  import { watch, nextTick, ref, defineComponent, PropType } from 'vue'
  import { RouteRecordRaw } from 'vue-router'

  export default defineComponent({
    name: 'SlideBar',
    props: {
      menus: {
        type: Array as PropType<RouteRecordRaw[]>,
        required: true,
      },
      route: {
        type: Object as PropType<RouteRecordRaw>,
        required: true,
      },
      activePath: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      return () => {
        return (
          <div class={'app-slide-bar-wrap'}>
            <div class="scrollbar-wrapper">
              <router-link to="/" class="app-title">
                <h3 class="title">
                  <svg-icon icon="vuejs-fill" class="logo-svg"></svg-icon>
                  后台管理系统
                </h3>
              </router-link>
              <div class="menus-wrap">
                <a-menu
                  style={{ border: 'none' }}
                  unique-opened={false}
                  default-active={props.activePath}
                  // default-openeds={defaultOpeneds}
                >
                  {renderMenuContent(props.menus)}
                </a-menu>
              </div>
            </div>
          </div>
        )
      }
    },
  })
</script>

<style lang="scss" scoped></style>
