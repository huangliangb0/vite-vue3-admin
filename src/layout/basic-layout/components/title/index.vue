<!--
 * @Description: 标题
 * @Date: 2022-07-22 11:41:55
 * @LastEditTime: 2022-07-22 17:07:28
 * @FilePath: \vite-vue3-admin\src\layout\basic-layout\components\title\index.vue
-->
<script lang="tsx">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'AppTitle',
    setup() {
      return () => (
        <router-link to="/" class="app-title">
          <h3 class="title">后台管理系统</h3>
        </router-link>
      )
    },
  })
</script>

<style lang="less" scoped>
  .app-title {
    width: 100%;
    height: var(--app-header-height);
    .title {
      font-size: 16px;
      line-height: var(--app-header-height);
      margin: 0;
      text-align: center;
      color: #fff;
      box-shadow: 0 0 1px #999;
    }
  }
</style>
