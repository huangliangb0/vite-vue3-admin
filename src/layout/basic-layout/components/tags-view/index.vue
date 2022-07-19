<template>
  <div class="tags-view">
    <div class="scroll-bar-wrap">
        <template v-for="(item, index) in tagsList" :key="item.path">
          <a-dropdown>
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
              @click="removeView($event, index, item.path)"
            />
            </route-content>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;" @click="closeClick('other', index)">
                <CloseOutlined />
                关闭其它
              </a>
            </a-menu-item>
            <a-menu-item >
              <a href="javascript:;" @click="closeClick('left', index)">
                <SwapLeftOutlined />
                关闭左则
              </a>
            </a-menu-item>
            <a-menu-item @click="closeClick('right', index)">
              <a href="javascript:;">
                <SwapRightOutlined/>
                关闭右侧
              </a>
            </a-menu-item>
            <a-menu-item @click="closeClick('all', index)">
              <a href="javascript:;">
                <CloseSquareOutlined />
                关闭全部
              </a>
            </a-menu-item>
            
          </a-menu>
        </template>
      </a-dropdown>
        </template>
    </div>
    <span class="action-box">
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          <SmallDashOutlined class="menu-icon"/>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;" @click="closeClick('other')">
                <CloseOutlined />
                关闭其它
              </a>
            </a-menu-item>
            <a-menu-item >
              <a href="javascript:;" @click="closeClick('left')">
                <SwapLeftOutlined />
                关闭左则
              </a>
            </a-menu-item>
            <a-menu-item @click="closeClick('right')">
              <a href="javascript:;">
                <SwapRightOutlined/>
                关闭右侧
              </a>
            </a-menu-item>
            <a-menu-item @click="closeClick('all')">
              <a href="javascript:;">
                <CloseSquareOutlined />
                关闭全部
              </a>
            </a-menu-item>
            
          </a-menu>
        </template>
      </a-dropdown>
    </span>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, watch } from 'vue'
  import { useRoute, useRouter, RouteRecordRaw } from 'vue-router'

  import { SwapLeftOutlined, SwapRightOutlined, CloseOutlined, CloseSquareOutlined, SmallDashOutlined } from '@ant-design/icons-vue'
  import { useTagsViewStore } from '@/store/modules/tagsView'

  export default defineComponent({
    name: 'TagsView',
    components: {
      SwapLeftOutlined, SwapRightOutlined, CloseOutlined, CloseSquareOutlined, SmallDashOutlined
    },
    setup() {
      const store = useTagsViewStore()
      const route = useRoute()
      const router = useRouter()
      const tagsList = computed(() => store.tagsList)
      const path = computed(() => route.path)
      const actionDropDownVisible = ref(false)
      const activeIndex = ref(-1)

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
        },
        {
          immediate: true,
        },
      )
      // 移除当前标签页面
      function removeView(e, index, _path) {
        e.stopPropagation()
        e.stopPropagation()
        store.delTag(index)
        if (path.value === _path) {
          // 当你移除的标签是当前的视图标签，那么就切换到最后一个标签的视图
          const lastItem = tagsList.value[tagsList.value.length - 1]
          router.push({
            path: lastItem ? lastItem.path : '/',
            replace: true,
          })
        }
      }
      function closeClick(actionType: string, index?: number) {
        switch (actionType) {
          case 'other':
            store.delOtherTag(index!)
            break
          case 'left':
            store.delLeftTag(index!)
            break
          case 'right':
            store.delRightTag(index!)
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
      function jump(_path) {
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
        activeIndex.value = index
      }

      const handleMouseleave = () => {
        activeIndex.value = -1
      }

      return {
        activeIndex,
        tagsList,
        path,
        actionDropDownVisible,
        removeView,
        closeClick,
        jump,
        handleActionDropDownVisibleChange,
        handleMouseenter,
        handleMouseleave,
      }
    },
  })
</script>

<style lang="less" scoped>
  @tagsHeight: var(--app-tags-height);
  .tags-view {
    height: @tagsHeight;
    background-color: #fff;
    display: flex;
    padding: 0 20px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
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

  .scroll-bar-wrap {
    height: @tagsHeight;
    display: flex;
    flex: 1;
     display: flex;
    height: 100%;
    width: 100%;
    overflow-x: auto;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    white-space: nowrap;
    .tags-item {
      cursor: pointer;
      display: inline-block;
      padding: 0 20px;
      height: 34px;
      line-height: 34px;
      border: 1px solid @border-color-base;
      margin-right: 4px;
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
</style>
