<template>
  <div class="tags-view">
    <div class="scroll-bar-wrap">
      <a-tabs
        :animated="false"
        :tabBarGutter="8"
        :activeKey="activeIndex"
      >
        <a-tab-pane v-for="(item, index) in tagsList" :key="index"  :closable="!item.meta?.tags_affix && activeIndex === index">
          <template #tab>
            <Dropdown
              trigger="contextmenu"
              :on-close="handleClose"
              @contextmenu="handleMouseenter(index)"
                @mouseleave="handleMouseleave"
            >
              <a 
                href="javascript:;"
                class="tags-item"
                :class="{
                  'is-active': item.path === path,
                  'is-closeable': !item.meta?.tags_affix
                }"
                @click="jump(item.path)"
                
              >
                <span class="route-name">{{item.meta?.title}}</span>
                <CloseOutlined
                    v-if="!item.meta?.tags_affix"
                    class="icon-cls"
                    @click="removeView($event, item.path)"
                  />
              </a>
              
          </Dropdown>
          </template>
        </a-tab-pane>
      </a-tabs>
    </div>
    <span class="action-box">
      <Dropdown
        :on-close="handleClose"
      >
        <a class="ant-dropdown-link" @click.prevent>
          <MenuOutlined class="menu-icon"/>
        </a>
      </Dropdown>
    </span>
  </div>
</template>

<script lang="ts" setup>
  import { computed,  inject,  ref, watch } from 'vue'
  import { useRoute, useRouter, RouteRecordRaw } from 'vue-router'

  import { CloseOutlined, SmallDashOutlined, MenuOutlined } from '@ant-design/icons-vue'
  import { useTagsViewStore } from '@/store/modules/tagsView'
import Dropdown from './Dropdown.vue';
  const reload = inject('reload') as () => void
const store = useTagsViewStore()
      const route = useRoute()
      const router = useRouter()
      const tagsList = computed(() => store.tagsList)
      const path = computed(() => route.path)
      const actionDropDownVisible = ref(false)
      const activeIndex = ref(-1)
      const originIndex = ref(-1)

      // 添加路由的变化
      watch(
        () => route.path,
        () => {
          if (route.meta.hideInTags) {
            return
          }
          store.addTag(route as unknown as RouteRecordRaw)

          // 获取当前触发路由的tags索引
          const index = tagsList.value.findIndex(
            item => item.path === path.value,
          )
          store.changeActiveIndex(index)
          activeIndex.value = index
        },
        {
          immediate: true,
        },
      )
      // 移除当前标签页面
      function removeView(e: MouseEvent, _path: string) {
        e.stopPropagation()
        e.stopPropagation()
        store.delTag()
        if (path.value === _path) {
          // 当你移除的标签是当前的视图标签，那么就切换到最后一个标签的视图
          const lastItem = tagsList.value[tagsList.value.length - 1]
          router.push({
            path: lastItem ? lastItem.path : '/',
            replace: true,
          })
        }
      }
      function handleClose(actionType: string) {
        switch (actionType) {
          case 'other':
            store.delOtherTag()
            break
          case 'left':
            store.delLeftTag()
            break
          case 'right':
            store.delRightTag()
            break
          case 'all':
            store.delAllTag()
            break
        }
        // 如果当前页的标签已关闭，那就跳转到首页
        if (tagsList.value.some(item => item.path === path.value)) return
        router.push({
          path: '/',
          replace: true,
        })
      }
      // 跳转
      function jump(_path: string) {
        if (path.value === _path) {
          return
        }
        router.push(_path)
      }

      // 右侧操作图标下拉菜单显示隐藏回调函数
      function handleActionDropDownVisibleChange() {
        actionDropDownVisible.value = !actionDropDownVisible.value
      }

      const handleMouseenter = (index: number) => {
        originIndex.value = activeIndex.value
        activeIndex.value = index
      }

      const handleMouseleave = () => {
        activeIndex.value = originIndex.value

        console.log('activeIndex.valueactiveIndex.value', activeIndex.value)

      }

     

     function handleChange(activeKey: any) {
        console.log('activeKey', activeKey)
      }
      // Close the current tab
      function handleEdit(targetKey: string) {
        console.log('targetKey', targetKey)
      }

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
    line-height: height;
    flex: 1;
    width: 100%;
    padding: 0 8px;
    overflow: hidden;
    .tags-item {
      box-sizing: initial;
      display: inline-block;
      padding: 0 12px;
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
    text-align: center;
    font-size: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid #f0f0f0;
    .menu-icon {
      position: relative;
      color: var(--a-text-color-regular);
      transition: all 0.3s;
      transform: rotate(0deg);
      font-size: 20px;
      cursor: pointer;
      padding: 6px;
      &.is-active {
        transform: rotate(180deg);
        color: var(--a-color-primary);
      }
    }
  }
</style>

<style lang="less">
.scroll-bar-wrap {
  .ant-tabs {
    .ant-tabs-tab {
      padding: 0;
    }
    
    .ant-tabs-nav {
      margin-bottom: 0;
      &::before {
        display: none;
      }
    }
    .ant-tabs-content-holder {
      display: none;
    }
    .ant-tabs-ink-bar {
      display: none;
    }
  }
  
}
</style>