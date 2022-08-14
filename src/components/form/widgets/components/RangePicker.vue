l.l<script lang="tsx">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'RangePicker',
    setup(_props, { attrs, slots }) {
      return () => <a-range-picker {...attrs} v-slots={slots} />
    },
  })
</script>
