l.l<script lang="tsx">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'DatePicker',
    setup(_props, { attrs, slots }) {
      return () => <a-date-picker {...attrs} v-slots={slots}></a-date-picker>
    },
  })
</script>
