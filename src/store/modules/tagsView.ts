import router from '@/router'
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import { defineStore } from 'pinia'

interface State {
  tagsList: RouteLocationNormalizedLoaded[]
  activeIndex: number
}

export const useTagsViewStore = defineStore('tagsView', {
  state: (): State => ({
    tagsList: [],
    activeIndex: 0,
  }),
  getters: {
    affixTagsList(state): RouteLocationNormalizedLoaded[] {
      return state.tagsList.filter(item => item?.meta?.tags_affix) // 固定标签不可删除
    },
  },
  actions: {
    // 修改索引，该索引是当前路由显示的索引
    setActiveIndex(index: number) {
      this.activeIndex = index ?? 0
    },

    /**
     * 添加固定的路由，当登录成功后添加
     * @param {*} accessRoutes 授权路由
     */
    addAffixTags() {
      const routes = router.getRoutes()
      const tags = routes.filter(item => item.meta && item.meta.tags_affix)
      this.tagsList = tags as unknown as RouteLocationNormalizedLoaded[]
    },
    /**
     * 添加标签，当路由切换时，通过路由Path变更判断该标签是否需要添加
     * @param {*} param
     * @param {*} route  useRoute()返回值
     * @returns
     */
    addTag(_route: RouteLocationNormalizedLoaded) {
      const route = Object.assign({}, _route)

      // 如果存在，就不添加
      if (this.tagsList.some(item => item.path === route.path)) return

      this.tagsList = [...this.tagsList, route]
    },
    /**
     * 删除当前标签
     * @param {*} index
     */
    delTag(index: number) {
      this.tagsList.splice(index, 1)
    },

    /**
     * 删除左边标签
     * @param {*} _index 当点击右键的时候，_index才存在
     */
    delLeftTag() {
      const length = this.affixTagsList.length
      const activeIndex = this.activeIndex
      if (activeIndex < length) {
        this.tagsList = [...this.affixTagsList]
      } else {
        const removeLength = activeIndex - length
        this.tagsList.splice(length, removeLength)
        this.setActiveIndex(this.activeIndex - removeLength)
      }
    },
    // 删除右边标签
    delRightTag() {
      if (this.activeIndex < this.affixTagsList.length) {
        this.tagsList = [...this.affixTagsList]
      } else {
        this.tagsList = this.tagsList.slice(0, this.activeIndex + 1)
      }
    },
    // 删除其他
    delOtherTag() {
      const route = this.tagsList[this.activeIndex]
      if (this.activeIndex < this.affixTagsList.length) {
        this.tagsList = [...this.affixTagsList]
      } else {
        this.tagsList = [...this.affixTagsList, route]
        this.setActiveIndex(this.affixTagsList.length)
      }
    },

    // 删除全部
    delAllTag() {
      this.tagsList = [...this.affixTagsList]
    },
  },
})
