<script lang="ts" setup></script>
<template>
  <a-row :gutter="[20, 20]">
    <a-col :span="24">
      <a-card title="项目背景">
        <p>
          曾经上git去copy别的后台管理系统，项目结构不仅繁杂，而且项目代码复杂，组件封装太深，不易阅读也不易扩展。
        </p>
        <p>
          本项目只封装常用组件（比如Table、form），只提供最基本封装的逻辑，很多东西应该根据开发者根据自己的项目需求自己扩展
        </p>
        <p> 易阅读，易扩展 </p>
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
      <a-card title="常见问题" />
    </a-col>
  </a-row>
</template>
