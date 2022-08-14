<script lang="tsx">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Switch',
    props: {
      value: [String, Number, Boolean],
    },
    setup(props, { attrs, slots }) {
      return () => (
        <a-switch
          {...attrs}
          style="width: auto;"
          v-slots={slots}
          checked={props.value}
        />
      )
    },
  })
</script>
