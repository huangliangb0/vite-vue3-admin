<template>
  <div class="tags-view">
    <div class="scroll-bar-wrap">
      <a-tabs v-model:activeKey="activeIndex">
        <a-tab-pane v-for="(item, index) in tagsList" :key="index"  :closable="!item.meta?.tags_affix && activeIndex === index">
          <template #tab>
                <Dropdown
              :on-close="handleClose"
            >
              <route-content
                    class="tags-item"
                    :class="{
                      'is-active': item.path === path,
                      'is-mouseenter':
                        !item.meta?.tags_affix && activeIndex === index,
                    }"
                    :index="index"
                    :title="item.meta?.title"
                    @click="jump(item.path)"
                    @mouseenter="handleMouseenter(index)"
                    @mouseleave="handleMouseleave"
                  >
                  <CloseOutlined
                    v-if="!item.meta?.tags_affix && activeIndex === index"
                    class="icon-cls"
                    @click="removeView($event, item.path)"
                  />
                  </route-content>
          </Dropdown>
          </template>
        </a-tab-pane>
      </a-tabs>
        <!-- <a-space align="center" style="height: 100%">
        <template v-for="(item, index) in tagsList" :key="item.path">
            <Dropdown
              :on-close="handleClose"
            >
              <route-content
                    class="tags-item"
                    :class="{
                      'is-active': item.path === path,
                      'is-mouseenter':
                        !item.meta?.tags_affix && activeIndex === index,
                    }"
                    :index="index"
                    :title="item.meta?.title"
                    @click="jump(item.path)"
                    @mouseenter="handleMouseenter(index)"
                    @mouseleave="handleMouseleave"
                  >
                  <CloseOutlined
                    v-if="!item.meta?.tags_affix && activeIndex === index"
                    class="icon-cls"
                    @click="removeView($event, item.path)"
                  />
                  </route-content>
          </Dropdown>
        </template>
        </a-space> -->
    </div>
    <span class="action-box">
      <Dropdown
        :on-close="handleClose"
      >
        <a class="ant-dropdown-link" @click.prevent>
          <SmallDashOutlined class="menu-icon"/>
        </a>
      </Dropdown>
    </span>
  </div>
</template>

<script lang="ts" setup>
  import { computed,  inject,  ref, watch } from 'vue'
  import { useRoute, useRouter, RouteRecordRaw } from 'vue-router'

  import { CloseOutlined, SmallDashOutlined } from '@ant-design/icons-vue'
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
    overflow-x: auto;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    white-space: nowrap;
    .tags-item {
      vertical-align: middle;
      cursor: pointer;
      display: inline-block;
      padding: 0 12px;
      height: @tagItemHeight;
      line-height: @tagItemHeight;
      border: 1px solid @border-color-base;
      color: @text-color;
      transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
      &.is-mouseenter {
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
      .icon-cls {
        font-size: 16px;
        position: absolute;
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
  .ant-tabs-tab {
    padding: 0;
  }
  .ant-tabs-nav {
    margin-bottom: 0;
  }
  .ant-tabs-content-holder {
    display: none;
  }
}
</style>