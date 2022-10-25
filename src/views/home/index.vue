<script lang="ts" setup>
  import { getImageUrl } from '@/assets'

  const ewm = getImageUrl('ewm.jpg')

  const handleAnchorClick = (e: Event, link: Recordable) => {
    // 阻止点击的默认事件修改路由
    e.preventDefault()
    const scroll = document.getElementById(link.href)
    scroll && scroll.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }
</script>
<template>
  <a-layout theme="light">
    <a-layout-content class="home-main">
      <a-row :gutter="[20, 20]">
        <a-col :span="24" id="background">
          <a-card title="项目背景">
            <p
              >在引用这个项目之前，你也许使用过其它的项目，大部分的项目都有一个通病：</p
            >
            <ul>
              <li>
                1. 项目目录结构复杂，目录文件之间引用混乱，完全脱离 vue 3
                的思想(composite api),不易阅读。
              </li>
              <li> 2. 项目功能过多，往往需要大量删除不需要的文件。 </li>
              <li>
                3.
                组件过度封装，很难满足业务的需求，由于封装太杂，更是出现难以修改的情况。
              </li>
              <li> 4. 各种复杂的配置。 </li>
              <li>
                5.
                最重要的一点，你会感觉你的规范被人家限定了，有些东西过分表现作者的技术存储量。
              </li>
            </ul>

            <p>相信这种项目也已经泛滥了，做这个项目主要是为了以下几点：</p>

            <ul>
              <li>1. 简化项目的目录结构。</li>
              <li>
                2. 简化常用通用组件的封装，比如 form
                组件、table组件。当然不仅仅只是简化这些组件的封装，还得保证组件的易用性、扩展性。
              </li>
            </ul>

            <p
              >当然写这个项目也是因为在某些组件的设计上也有自己独特的方法。你不妨试着下载这个项目，试着用几十行的代码完成一个项目的增删改查的操作流程。</p
            >
          </a-card>
        </a-col>

        <a-col :span="24" id="feature">
          <a-card title="项目功能清单">
            <ul>
              <li>1. 路由守卫</li>
              <li>2. 路由菜单权限的添加</li>
              <li>3. form 组件封装</li>
              <li>4. table 组件封装</li>
              <li>
                5. modal 组件 + form 组件 封装一个添加、编辑对话框表单的组件
              </li>
              <li> 6. 响应式布局 </li>
              <li>7. 标签栏</li>
              <li>8. 面包屑</li>
              <li>9. axios 的封装</li>
              <li>10. async hook 异步请求封装</li>
              <li>11. 跨行表格的处理</li>
            </ul>

            <p>上面组件的封装在对应的界面写了相关例子，可自行查看</p>
          </a-card>
        </a-col>

        <a-col :span="24" id="config">
          <a-card title="项目配置">
            <ul>
              <li>
                <p>Eslint + prettier 的配置</p>
                <p>Pre-commit Hook 的配置</p>
                <p>最好是把vscode也配置一下，保存自动格式化</p>
              </li>
              <li>Git 提交规范配置</li>
              <li>antd自动化按需引入配置</li>
            </ul>
          </a-card>
        </a-col>

        <a-col :span="24" id="globalComponentMount">
          <a-card title="全局组件挂载">
            <p>
              在./src/components下封装的组件，通过g.ts导出的组件都都会自动挂载到全局组件中
            </p>
          </a-card>
        </a-col>
        <a-col :span="24" id="adapter">
          <a-card title="项目适配">
            <p>项目会通过监听document.body的宽度进行适配，在APP.vue进行监听</p>
            <p>每个宽度下所对应的表示符</p>
            <p>width = document.body.clientWidth</p>
            <ul>
              <li> width &lt; 576px = xs</li>
              <li>576 &lt; width &lt; 768 = sm</li>
              <li>768 &lt; width &lt; 992 = md</li>
              <li>992 &lt; width &lt; 1200 = lg</li>
              <li>1200 &lt; width &lt; 1600 = xl</li>
              <li>1600 &lt; width &lt; 2000 = xxl</li>
              <li>width &gl; 2000 = xxxl</li>
            </ul>
          </a-card>
        </a-col>
        <a-col :span="24">
          <a-card title="git约定式提交（angular Git 提交规范）">
            <p> 你需要全局安装 commitizen: cnpm i commitizen -g </p>
            <p>你的vscode需要安装Gitlens插件</p>
            <p>代码提交步骤：</p>
            <ul>
              <li>git add .</li>
              <li>
                git cz 或者pnpm
                commit(到这一步会弹出很多有用的提交格式信息，最好是在vscode或者powershell进行操作)
              </li>
              <li>git push</li>
            </ul>
          </a-card>
        </a-col>
        <a-col :span="24" id="question">
          <a-card title="赞助">
            <img :src="ewm" width="400" alt="二维码收款" />
          </a-card>
        </a-col>
        <a-col :span="24" id="contact">
          <a-card title="联系方式"> QQ: 864181495 </a-card>
        </a-col>
      </a-row>
    </a-layout-content>
    <a-layout-sider theme="light" :width="200" class="home-layout-sider">
      <a-anchor
        class="home-anchor-wrapper"
        :affix="true"
        @click="handleAnchorClick"
      >
        <a-anchor-link href="background" title="项目背景" />
        <a-anchor-link href="feature" title="项目功能清单" />
        <a-anchor-link href="config" title="项目配置" />
        <a-anchor-link href="globalComponentMount" title="全局组件挂载" />
        <a-anchor-link href="adapter" title="项目适配" />
        <a-anchor-link href="question" title="赞助" />
        <a-anchor-link href="contact" title="联系方式" />
      </a-anchor>
    </a-layout-sider>
  </a-layout>
</template>

<style lang="less" scoped>
  .home-main {
    .ant-card {
      font-size: 16px;
    }
  }
  .home-layout-sider {
    margin-left: 20px;
  }
  .home-anchor-wrapper {
    position: fixed;
    width: 200px;
    top: 120px;
    bottom: 0;
    right: 20px;
  }
</style>
