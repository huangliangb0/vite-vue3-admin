<script lang="tsx">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Select',
    setup(_props, { attrs, slots }) {
      return () => <a-select {...attrs} v-slots={slots} />
    },
  })
</script>
