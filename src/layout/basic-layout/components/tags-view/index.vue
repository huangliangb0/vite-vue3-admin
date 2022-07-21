<template>
  <div class="tags-view">
    <div class="scroll-bar-wrap">
      <WithArrowScroll >
          <template v-for="(route, index) in tagsList" :key="route.path">
            <Dropdown
              trigger="contextmenu"
              :on-close="handleClose"
            >
              <a
                href="javascript:;"
                class="tags-item"
                :class="{
                  'is-active': activeIndex === index,
                  'is-closeable': !route.meta?.tags_affix
                }"
                @contextmenu="handleContextmenu(index)"
                @click="jump(route)"
              >
                <span class="route-name">{{route.meta?.title}}</span>
                <CloseOutlined
                    v-if="!route.meta?.tags_affix"
                    class="icon-cls"
                    @click="removeTag($event,  index)"
                  />
              </a>
          </Dropdown>
          </template>
      </WithArrowScroll>
    </div>
    <span class="action-box">
      <Dropdown
        :on-close="handleClose"
      >
        <a class="ant-dropdown-link" @click.prevent>
          <DashOutlined class="menu-icon"/>
        </a>
      </Dropdown>
    </span>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
  import { useRoute, useRouter, RouteLocationNormalizedLoaded } from 'vue-router'
  import WithArrowScroll from '@/components/with-arrow-scroll/index.vue'

  import { CloseOutlined, DashOutlined } from '@ant-design/icons-vue'
  import { useTagsViewStore } from '@/store/modules/tagsView'
import Dropdown from './Dropdown.vue';
const store = useTagsViewStore()
      const route = useRoute()
      const router = useRouter()
      const tagsList = computed(() => store.tagsList)
      const activeIndex = computed(() => store.activeIndex)
      const currentIndex = computed(() => store.currentIndex)
      const path = computed(() => route.path)


      // 添加路由的变化
      watch(
        () => route.path,
        () => {
          if (route.meta.hideInTags) {
            return
          }
          store.addTag(route)

          // 获取当前触发路由的tags索引
          const index = tagsList.value.findIndex(
            item => item.path === path.value,
          )
          store.setActiveIndex(index)
        },
        {
          immediate: true,
        },
      )
      // 移除当前标签
      function removeTag(e: MouseEvent, index: number) {
        e.stopPropagation()
        store.delTag(index)

        if (index === activeIndex.value) {
          // 当你移除的标签是当前的视图标签，那么就切换到它上一个标签
          const lastRoute = tagsList.value[activeIndex.value - 1]
          
          if (lastRoute) {
            jump(lastRoute)
          } else {
            router.push({
              path: '/',
              replace: true,
            })
          }
        }
        store.setActiveIndex(activeIndex.value - 1)
      }
      // 关闭
      function handleClose(actionType: string) {
        switch (actionType) {
          case 'other':
            store.delOtherTag()
            const route = tagsList.value[activeIndex.value]
            jump(route)
            break
          case 'left':
            store.delLeftTag()
            break
          case 'right':
            store.delRightTag()
            break
          case 'all':
            store.delAllTag()
            router.push({
              path: '/',
              replace: true,
            })
            break
        }
      }
      // 跳转
      function jump(route: RouteLocationNormalizedLoaded) {
        if (path.value === route.path) {
          return
        }
        router.push({
            path: route.path,
            query: route.query,
            replace: true,
          })
      }

      // 右键标签事件监听
      const handleContextmenu = (index: number) => {
        store.setCurrentIndex(index)
      }

      // window click 处理
      const handleWindowClick = () => {
        setTimeout(() => {
          store.setCurrentIndex(-1)
        }, 0)
      }

      onMounted(() => {
        window.addEventListener('click', handleWindowClick, false)
      })
      onUnmounted(() => {
        window.removeEventListener('click', handleWindowClick, false)
      })

</script>

<style lang="less" scoped>
  @tagsHeight: var(--app-tags-height);
  @tagItemHeight: 28px;
  .tags-view {
    height: @tagsHeight;
    background-color: #fff;
    display: flex;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  }

  .scroll-bar-wrap {
    height: @tagsHeight;
    line-height: @tagsHeight;
    flex: 1;
    width: 100%;
    overflow: hidden;
    .tags-item {
      position: relative;
      display: inline-block;
      padding: 0 12px;
      margin: 0 4px;
      height: @tagItemHeight;
      line-height: @tagItemHeight;
      border: 1px solid @border-color-base;
      color: @text-color;
      &.is-closeable {
        padding-right: 30px;
      }
      &:hover,
      &.is-active {
        border-color: @primary-color;
        color: @primary-color;
      }
      &.is-active {
        background-color: lighten(@primary-color, 60%);
      }
      .route-name {
        font-size: 12px;
        position: relative;
        top: -2px;
      }
      .icon-cls {
        font-size: 12px;
        position: absolute;
        margin: 0;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .action-box {
    flex: 0 0 @tagsHeight;
    width: @tagsHeight;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid #f0f0f0;
    .menu-icon {
      position: relative;
      color: var(--a-text-color-regular);
      color: #717171;
      font-size: 20px;
      cursor: pointer;
      padding: 6px;
    }
  }
</style>
