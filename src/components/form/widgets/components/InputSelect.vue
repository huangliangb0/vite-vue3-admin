<script lang="tsx">
  import { defineComponent, PropType, reactive } from 'vue'
  export default defineComponent({
    name: 'InputSelect',
    inheritAttrs: false,
    props: {
      options: {
        type: Array as PropType<any[]>,
      },
    },
    setup(_props, { attrs }) {
      return () => (
        <div class="my--input-select">
          <a-input {...attrs} />
          <ul class="select">
            <li>aaaa</li>
            <li>aaaa</li>
            <li>aaaa</li>
            <li>aaaa</li>
            <li>aaaa</li>
          </ul>
        </div>
      )
    },
  })
</script>

<style lang="less" scoped>
  .my--input-select {
    position: relative;

    .select {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: 999;
      background: #fff;
      border: 1px solid #aaa;
    }
  }
</style>
