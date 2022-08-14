l.l<script lang="tsx">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Input',
    setup(_props, { attrs, slots }) {
      return () => <a-input {...attrs} v-slots={slots} />
    },
  })
</script>
