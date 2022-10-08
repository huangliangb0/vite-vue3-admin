<!--
 * @Description: 标题
 * @Date: 2022-07-22 11:41:55
 * @LastEditTime: 2022-07-22 17:07:28
 * @FilePath: \vite-vue3-admin\src\layout\basic-layout\components\title\index.vue
-->
<script lang="tsx">
  import { getImageUrl } from '@/assets'
  import { defineComponent } from 'vue'

  const logoImg = getImageUrl('logo.png')

  export default defineComponent({
    name: 'AppTitle',
    props: {
      collapsed: Boolean,
    },
    setup(props) {
      return () => (
        <router-link to="/" class="app-title">
          <a-space>
            <img class="logo" src={logoImg} alt="后台管理系统" />
            {props.collapsed ? null : <h3 class="title">后台管理系统</h3>}
          </a-space>
        </router-link>
      )
    },
  })
</script>

<style lang="less" scoped>
  .app-title {
    display: flex;
    width: 100%;
    height: var(--app-header-height);
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 1px #555;
    position: relative;
    z-index: 111;
    .logo {
      width: 24px;
      height: auto;
    }
    .title {
      font-size: 16px;
      line-height: var(--app-header-height);
      margin: 0;
      text-align: center;
      color: #fff;
    }
  }
</style>
