<script lang="ts" setup>
  const handleAnchorClick = (e: Event, link: Recordable) => {
    console.log(2222, link)
    // 阻止点击的默认事件修改路由
    e.preventDefault()
    const srcolls = document.getElementById(link.href)
    srcolls && srcolls.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }
  const getCurrentAnchor = () => {
    return 'background'
  }
</script>
<template>
  <a-layout theme="light">
    <a--layout-content>
      <a-row :gutter="[20, 20]">
        <a-col :span="24" id="background">
          <a-card title="项目背景">
            <p>
              相信大部分的人上git去copy一个中后台管理系统，往往会遇到以下问题
            </p>
            <ul>
              <li>
                项目中的国际化配置、换肤、系统配置通常是很多项目中用不到的。这需要我们进行大量的手动删除
              </li>
              <li>
                Table组件的封装、form组件的封装太杂，局限性太强、不利于扩展
              </li>
              <li>
                项目结构复杂，有时候一个组件的封装，引用各种各样的文件，不利于阅读
              </li>
              <li>各种杂七杂八的配置</li>
            </ul>
            <p><strong>为了保证项目的简洁，本项目只会为你做以下几点</strong></p>
            <p>开发一个中后台常用的功能、比如路由权限、路由守卫等</p>
            <p>
              <em>
                为了保证项目组件易阅读、易扩展，项目中的组件封装出发点总是一个思维提供，不会存在太多多花里胡哨的写法
              </em>
            </p>
          </a-card>
        </a-col>

        <a-col :span="24" id="feature">
          <a-card title="功能列表">
            <ul>
              <li>权限路由动态生成和移除</li>
              <li>路由守卫</li>
              <li>响应式布局</li>
              <li>标签栏</li>
              <li>基于 antd 的 table 的封装</li>
              <li>
                <p>基于 antd 的 form 的封装</p>
                <p>这里的form分成了编辑表单和过滤搜索表单</p>
                <p>
                  看到很多的项目，往往把过滤搜索表单和编辑表单封装在一个组件上，每隔一段时间就添加一个prop来满足一些额外的需求，这不仅仅造成团队的阅读困难，而且使用特别困难，因为过滤搜索表单和编辑表单本身定位就不一样，布局差异大，因此本项目进行了各自的封装。
                </p>
              </li>
              <li>
                modal组件 + form组件 封装一个完善的易扩展的添加、编辑对话框表单
              </li>
              <li>
                <p>基于 antd 的 row、col栅格布局的封装</p>
                <p>
                  栅格布局封装，可满足不同屏宽下每行显示的列数，对响应式带来特别好的便利性
                </p>
              </li>
              <li>axios的基本封装以及异步请求hook的封装</li>
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
          <a-card title="常见问题" />
        </a-col>
        <a-col :span="24" id="contact">
          <a-card title="联系方式"> QQ: 864181495 </a-card>
        </a-col>
      </a-row>
    </a--layout-content>
    <a-layout-sider theme="light" :width="200" class="home-layout-sider">
      <a-anchor
        class="home-anchor-wrapper"
        :affix="true"
        :get-current-anchor="getCurrentAnchor"
        @click="handleAnchorClick"
      >
        <a-anchor-link href="background" title="项目背景" />
        <a-anchor-link href="feature" title="功能列表" />
        <a-anchor-link href="config" title="项目配置" />
        <a-anchor-link href="globalComponentMount" title="全局组件挂载" />
        <a-anchor-link href="adapter" title="项目适配" />
        <a-anchor-link href="question" title="常见问题" />
        <a-anchor-link href="contact" title="联系方式" />
      </a-anchor>
    </a-layout-sider>
  </a-layout>
</template>

<style lang="less" scoped>
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
