<script lang="ts" setup></script>
<template>
  <a-row :gutter="[20, 20]">
    <a-col :span="24">
      <a-card title="项目背景">
        <p>相信大部分的人上git去copy一个中后台管理系统，往往会遇到以下问题</p>
        <ul>
          <li>
            项目中的国际化配置、换肤、系统配置通常是很多项目中用不到的。这需要我们进行大量的手动删除
          </li>
          <li>Table组件的封装、form组件的封装太杂，局限性太强、不利于扩展</li>
          <li>
            项目结构复杂，有时候一个组件的封装，引用各种各样的文件，不利于阅读
          </li>
          <li>各种杂七杂八的配置</li>
        </ul>
        <p><strong>本项目只会为你做以下几点</strong></p>
        <ul>
          <li>
            <p>Eslint + prettier 的配置</p>
            <p>最好是把vscode也配置一下，保存自动格式化</p>
          </li>
          <li>Git 提交规范配置</li>
          <li>antd自动化按需引入配置</li>
          <li>权限路由动态生成和溢出</li>
          <li>路由守卫</li>
          <li>响应式布局</li>
          <li>标签栏</li>
          <li>
            <p>基于 antd 的 table 的封装</p>
            <p>这个表格封装很灵巧，开发者可根据自己的项目需求进行扩展</p>
          </li>
          <li>
            <p>基于 antd 的 form 的封装</p>
            <p>这里的form分成了编辑表单和过滤搜索表单</p>
            <p>
              看到很多的项目，往往把过滤搜索表单和编辑表单封装在一个组件上，每隔一段时间就添加一个prop来满足一些额外的需求，这不仅仅造成团队的阅读困难，而且使用特别困难，因为过滤搜索表单和编辑表单本身定位就不一样，布局差异大，因此本项目进行了各自的封装。
            </p>
          </li>
          <li>
            <p>基于 antd 的 row、col封装</p>
            <p>
              栅格布局封装，可满足不同屏宽下每行显示的列数，对响应式带来特别好的便利性
            </p>
          </li>
        </ul>
        <p>
          <em>
            为了保证项目组件易阅读、易扩展，项目中的组件封装出发点总是一个思维提供，不会存在天多花里胡哨的写法
          </em>
        </p>
      </a-card>
    </a-col>
    <a-col :span="24">
      <a-card title="全局组件挂载">
        <p>
          在./src/components下封装的组件，通过g.ts导出的组件都都会自动挂载到全局组件中
        </p>
      </a-card>
    </a-col>
    <a-col :span="24">
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
          <li>git cz</li>
          <li>git push</li>
        </ul>
      </a-card>
    </a-col>
    <a-col :span="24">
      <a-card title="常见问题" />
    </a-col>
  </a-row>
</template>
