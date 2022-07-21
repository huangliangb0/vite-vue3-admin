import router from '@/router'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import { defineStore } from 'pinia'

interface State {
  tagsList: RouteLocationNormalizedLoaded[]
  activeIndex: number
  currentIndex: number
}

export const useTagsViewStore = defineStore('tagsView', {
  state: (): State => ({
    tagsList: [],
    activeIndex: 0,
    currentIndex: -1
  }),
  getters: {
    index(state): number {
      return state.currentIndex > -1 ? state.currentIndex : state.activeIndex
    }
  },
  actions: {
    // 修改索引，该索引是当前路由显示的索引
    setActiveIndex(index: number) {
      this.activeIndex = index ?? 0
    },
    // 修改索引，该索引是当前鼠标所在标签的索引
    setCurrentIndex(index: number) {
      this.currentIndex = index ?? -1
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
      handleAction.call(this, function (list, index, affix_list) {
        if (affix_list.length - 1 >= index) return affix_list

        // 固定标签 + 剩下的右边标签
        return [...affix_list, ...list.slice(index, list.length)]
      })
    },
    // 删除右边标签
    delRightTag() {
      handleAction.call(this, function (list, index, affix_list) {
        if (affix_list.length - 1 >= index) return affix_list

        // 固定标签 + 剩下的右边标签
        return list.slice(0, index + 1)
      })
    },
    // 删除其他
    delOtherTag() {
      handleAction.call(this,  function (list, index, affix_list) {
        if (affix_list.length - 1 >= index) return affix_list

        return [...affix_list, list[index]]
      })
    },

    // 删除全部
    delAllTag() {
      const result = this.tagsList.filter(item => item?.meta?.tags_affix)
      this.tagsList = result
    },
    
  },
})

/**
 * 回调函数
 * @param tagsList 标签栏列表
 * @param index    操作当前标签的索引
 * @param affix_list 固定标签栏列表，不可操作
 * @return 返回新的标签栏列表
 */
type Cb = (
  tagsList: RouteLocationNormalizedLoaded[],
  index: number,
  affix_list: RouteLocationNormalizedLoaded[],
) => RouteLocationNormalizedLoaded[]

function handleAction(this: ReturnType<typeof useTagsViewStore>,  cb: Cb) {
  const index = this.index
  const affix_list = this.tagsList.filter(item => item?.meta?.tags_affix) // 固定标签不可删除
  const result = cb(this.tagsList, index, affix_list)
  this.tagsList = result
}
