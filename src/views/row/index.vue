<template>
  <page-layout>
    <page-header>
      <p>
        在APP.vue中，我们会监听窗口大小(<strong>windowWidth</strong>)的变化生成触发响应式布局的断点标识符(<strong>breakpoint</strong>)
      </p>
      <p>
        触发响应式布局的断点标识符(<strong>breakpoint</strong>)变量存在@/store/modules/app.ts
      </p>
      <p><strong>breakpoint: xs、sm、md、lg、xl、xxl、xxxl</strong></p>
      <p><strong>windowWidth：默认值是1920</strong></p>
      <p>各个窗口规格对应的窗口宽度如下</p>
      <ul>
        <li><strong>xs: </strong>windowWidth &lt; 576</li>
        <li><strong>sm: </strong>576 =&lt; windowWidth &lt; 768</li>
        <li><strong>md: </strong>768 =&lt; windowWidth &lt; 992</li>
        <li><strong>lg: </strong>992 =&lt; windowWidth &lt; 1200</li>
        <li><strong>xl: </strong>1200 =&lt; windowWidth &lt; 1600</li>
        <li><strong>xxl: </strong>1600 =&lt; windowWidth &lt; 2000</li>
        <li><strong>xxxl: </strong>windowWidth &gt;= 2000</li>
      </ul>

      <p>以下下内容将会根据窗口大小进行分列，默认分列如下</p>
      <pre>{ xs: 24, sm: 12, md: 8, lg: 6, xl: 6, xxl: 4, xxxl: 4 }</pre>
      <p>
        注意，栅格布局中一共分为<strong>24</strong>栏，<strong>xs: 24</strong
        >表示在窗口在小于<strong>576</strong>下，每行占的列数是<strong
          >24/24=1列</strong
        >
      </p>
      <p
        >你可以通过设置<strong>grid属性</strong>进行覆盖每个窗口下对应的栅格栏个数来设置每行的列数，例如grid={xxxl:
        3},则在窗口大于2000的时候每行就是8列</p
      >
    </page-header>
    <page-content>
      <row-wrapper :gutter="[20, 20]" :grid="{ xl: 4.8 }">
        <div class="content-item">{{ breakpoint }}: {{ windowWidth }}</div>
        <div class="content-item">{{ breakpoint }}: {{ windowWidth }}</div>
        <div class="content-item">{{ breakpoint }}: {{ windowWidth }}</div>
        <div class="content-item">{{ breakpoint }}: {{ windowWidth }}</div>
        <div class="content-item">{{ breakpoint }}: {{ windowWidth }}</div>
        <div class="content-item">{{ breakpoint }}: {{ windowWidth }}</div>
        <div class="content-item">{{ breakpoint }}: {{ windowWidth }}</div>
        <div class="content-item">{{ breakpoint }}: {{ windowWidth }}</div>
        <div class="content-item">{{ breakpoint }}: {{ windowWidth }}</div>
        <div class="content-item">{{ breakpoint }}: {{ windowWidth }}</div>
      </row-wrapper>
    </page-content>
  </page-layout>
</template>
<script lang="ts" setup>
  import { RowWrapper } from '@/components/row-layout'
  import useAppStore from '@/store/modules/app'
  import { computed } from 'vue'
  defineOptions({
    components: {
      RowWrapper,
    },
  })
  // 注意结构赋值会失去响应性
  const store = useAppStore()
  const windowWidth = computed(() => store.windowWidth)
  const breakpoint = computed(() => store.breakpoint)
</script>
<style lang="less" scoped>
  ul {
    list-style: none;
    li {
      font-size: 14px;
      line-height: 1.8;
      strong {
        display: inline-block;
        width: 100px;
        color: #000;
        text-align: right;
        padding-right: 12px;
      }
    }
  }
  .content-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    background-color: @primary-color;
    color: #fff;
  }
</style>
