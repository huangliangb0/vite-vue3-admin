l.l<script lang="tsx">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'InputNumber',
    setup(_props, { attrs, slots }) {
      return () => <a-input-number {...attrs} v-slots={slots} />
    },
  })
</script>
